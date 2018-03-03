import { State, Path } from "./types";
import set from "./set";

export default function prepend<T extends State>(
  state: T,
  path: Path,
  ...value: Array<any>
): T {
  return set(state, path, (arr: Array<any>) => {
    if (!Array.isArray(arr)) {
      throw new Error("target is not an array");
    }

    return value.concat(arr);
  });
}
