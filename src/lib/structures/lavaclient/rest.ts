import { LoadTrackResponse } from "@kyflx-dev/lavalink-types";
import fetch from "node-fetch";

export class Rest {
  public static async resolve(track: string): Promise<LoadTrackResponse> {
    if (
      /(?:https?:\/\/|)?(?:www\.)?open\.spotify\.com\/track\/([a-z0-9\d-_]+)/gi.test(
        track
      )
    ) {
      const arr = track.split(
        /https?:\/\/(www\.)?open\.spotify\.com\/track\//gi
      );

      const result = arr[arr.length - 1].match(/([a-z0-9\d-_]+)/gi)![0];

      if (!result)
        return {
          tracks: [],
          loadType: "NO_MATCHES",
        };

      const token = await getSpotifyToken();

      const song = await (
        await fetch(`https://api.spotify.com/v1/tracks/${result}`, {
          headers: {
            authorization: `${token.tokenType} ${token.accessToken}`,
            "User-Agent": "Blazify Discord Bot (NodeJS, v1.0.0)",
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (!song)
        return {
          tracks: [],
          loadType: "NO_MATCHES",
        };

      const { tracks, loadType } = await Rest.resolve(
        encodeURIComponent(`ytsearch:${song.artists[0].name} - ${song.name}`)
      );

      if (["NO_MATCHES", "LOAD_FAILED"].includes(loadType))
        return { tracks: [], loadType: "NO_MATCHES" };

      return { loadType: "TRACK_LOADED", tracks };
    }

    return await (
      await fetch(
        `http://${process.env.LAVALINK_HOST}:${process.env.LAVALINK_PORT}/loadtracks?identifier=${track}`,
        {
          headers: {
            authorization: process.env.LAVALINK_PASSWORD,
          },
        }
      )
    ).json();
  }
}

const getSpotifyToken = () => {
  return fetch(
    `https://accounts.spotify.com/api/token?grant_type=client_credentials`,
    {
      method: "POST",
      headers: {
        authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then((r) => r.json())
    .then((data) => {
      const { access_token, expires_in, token_type } = data;

      return {
        accessToken: access_token,
        expiresIn: expires_in,
        tokenType: token_type,
        expiresAt: new Date(new Date().getTime() + (expires_in - 2000) * 1000),
      };
    });
};
