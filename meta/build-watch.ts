#!/usr/bin/env yavascript
/// <reference types="yavascript" />

import { buildFiles } from "./lib/build-files";
import { ROLLUP_CONFIG } from "./lib/paths";

const tasks = buildFiles().map(({ inputFile, outputFile }) => {
  const cmd = [
    "npx",
    "rollup",
    "--config",
    quote(ROLLUP_CONFIG),
    "--file",
    quote(outputFile),
    quote(inputFile),
    "--watch",
  ].join(" ");

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
