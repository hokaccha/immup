import { State, Path } from "./types";
import dig from "./utils/dig";
import filter from "./utils/filter";

export default function del<T extends State>(state: T, path: Path): T {
  return dig(state, path, (o: State, key: any) => {
    return filter(o, (_: any, k: any) => key !== k);
  });
}
