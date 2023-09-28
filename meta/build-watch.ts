#!/usr/bin/env yavascript
/// <reference types="yavascript" />

import { buildFiles } from "./lib/build-files";
import { rootDir } from "./lib/root-dir";

const pkgJson = rootDir.concat("package.json");
const kameConfig = Path.resolve(__dirname, "kame.config.ts");

const tasks = buildFiles().map(({ inputFile, outputFile }) => {
  const cmd = `npx nodemon -w ${quote(inputFile)} -w ${pkgJson} --exec ${quote(
    `npx kame bundle --loader ${quote(kameConfig)} --input ${quote(
      inputFile
    )} --output ${quote(outputFile)}`
  )}`;

  return {
    name: basename(inputFile),
    cmd,
  };
});

exec([
  "npx",
  "concurrently",
  "--names",
  tasks.map(({ name }) => name).join(","),
  ...tasks.map(({ cmd }) => cmd),
]);
