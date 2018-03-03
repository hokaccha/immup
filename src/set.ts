import { State, Path } from "./types";
import dig from "./utils/dig";
import map from "./utils/map";

export default function set<T extends State>(
  state: T,
  path: Path,
  value: any
): T {
  if (!path) {
    return typeof value === "function" ? value(state) : state;
  }

  return dig(state, path, (o: State, key: any) => {
    if (!(key in o)) {
      return Object.assign({ [key]: value }, o);
    }

    return map(o, (v: any, k: any) => {
      if (key === k) {
        return typeof value === "function" ? value(v) : value;
      } else {
        return v;
      }
    });
  });
}
