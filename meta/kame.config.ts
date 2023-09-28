import { defaultLoader } from "kame";

export const load = (filename: string) => {
  return defaultLoader.load(filename, { target: "es2020" });
};
