//@ts-ignore
import { newTrack, newPlaylist } from "./utils/Utils";
import { LavaClient } from "./managers/LavaClient"
import { Player } from "./managers/Player"
import { LavaNode } from "./managers/LavaNode";
import { Queue } from "./managers/Queue";
export = {
  LavaClient: LavaClient,
  Player: Player,
  LavaNode: LavaNode,
  Queue: Queue,
  newTrack,
  newPlaylist,
};
