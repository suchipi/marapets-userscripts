#!/usr/bin/env yavascript
/// <reference types="yavascript" />

import { buildFiles } from "./lib/build-files";
import { pullComment } from "./lib/pull-comment";
import { prependContent } from "./lib/prepend-content";

for (const { inputFile, outputFile, outputFileMinified } of buildFiles()) {
  const comment = pullComment(inputFile);

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

  prependContent(comment, outputFile);

  ensureDir(dirname(outputFileMinified));

  exec(["npx", "terser", "-o", outputFileMinified, outputFile]);

  prependContent(comment, outputFileMinified);
}
