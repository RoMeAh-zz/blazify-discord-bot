declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN: string;
    OWNER_ID: string;
    USER_ID: string;
    SPOTIFY_ID: string;
    SPOTIFY_SECRET: string;
    LAVALINK_HOST: string;
    LAVALINK_ID: string;
    LAVALINK_PORT: string;
    LAVALINK_PASSWORD: string;
    MONGODB_URL: string;
  }
}