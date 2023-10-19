#!/usr/bin/env yavascript
/// <reference types="yavascript" />

import { ROLLUP_CONFIG, rootRel } from "./lib/paths";
import { buildFiles } from "./lib/build-files";
import { transformContent } from "./lib/transform-content";
import { findUserScriptMetaDataComment } from "./lib/find-comment";

for (const build of buildFiles()) {
  console.log("BUILDING:", build);
  const { inputFile, outputFile } = build;

  console.log(`Getting metadata comment from ${rootRel(inputFile)}...`);
  const inputContent = readFile(inputFile);
  const commentLoc = findUserScriptMetaDataComment(inputContent);
  const comment = inputContent.slice(commentLoc.start, commentLoc.end);

  ensureDir(dirname(outputFile));

  console.log(`ROLLUP ${rootRel(inputFile)} -> ${rootRel(outputFile)}`);
  exec([
    "npx",
    "rollup",
    "--config",
    ROLLUP_CONFIG.toString(),
    "--file",
    outputFile.toString(),
    inputFile.toString(),
  ]);

  console.log(`Removing comment from ${rootRel(outputFile)}...`);
  // remove comment from within the iife so we can put it outside the iife.
  transformContent(outputFile, (content) => {
    const commentLoc = findUserScriptMetaDataComment(content);
    return content.slice(0, commentLoc.start) + content.slice(commentLoc.end);
  });

  console.log(`Re-adding comment to ${rootRel(outputFile)}...`);
  transformContent(outputFile, (content) => {
    return comment + "\n" + content;
  });

  console.log(`Running prettier on ${rootRel(outputFile)}...`);
  exec(["npx", "prettier", "--write", outputFile.toString()]);
}
