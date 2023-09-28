#!/usr/bin/env yavascript
/// <reference types="yavascript" />

import { buildFiles } from "./lib/build-files";

for (const { inputFile, outputFile, outputFileMinified } of buildFiles()) {
  ensureDir(dirname(outputFile));

  exec([
    "npx",
    "kame",
    "bundle",
    "--loader",
    Path.resolve(__dirname, "kame.config.ts"),
    "--input",
    inputFile,
    "--output",
    outputFile,
  ]);

  ensureDir(dirname(outputFileMinified));

  exec(["npx", "terser", "-o", outputFileMinified, outputFile]);
}
