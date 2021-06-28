import { Structures, Level, Repeat, Filter } from "lavaclient";
import { Queue } from "./queue";

export default Structures.extend(
  "player",
  (Player) =>
    class BlazifyPlayer extends Player {
      public bass: Level = "none";
      public repeating: Repeat = "nothing";
      public playerFilter: Filter = "default";

      public queue: Queue = new Queue(this);
    }
);
