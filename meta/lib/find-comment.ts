/// <reference types="yavascript" />

import { lineAndColumnToIndex } from "./line-col-to-index";

const START_TOKEN = "==UserScript==";
const END_TOKEN = "==/UserScript==";

export function findUserScriptMetaDataComment(content: string) {
  const lines = content.split("\n");
  const startLineIndex = lines.findIndex(
    (line) => line.trim().replace(/^\/\//, "").trim() === START_TOKEN
  );
  if (startLineIndex === -1) {
    throw new Error("Couldn't find starting line");
  }
  const endLineIndex = lines.findIndex(
    (line) => line.trim().replace(/^\/\//, "").trim() === END_TOKEN
  );
  if (endLineIndex === -1) {
    throw new Error("Couldn't find ending line");
  }

  const start = lineAndColumnToIndex(content, startLineIndex, 0);
  const end = lineAndColumnToIndex(
    content,
    endLineIndex,
    lines[endLineIndex].length
  );

  return { start, end };
}
