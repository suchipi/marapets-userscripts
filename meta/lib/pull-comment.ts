/// <reference types="yavascript" />

const START_TOKEN = "==UserScript==";
const END_TOKEN = "==/UserScript==";

export function pullComment(fromFile: string) {
  const content = readFile(fromFile);
  const lines = content.split("\n");
  const startLineIndex = lines.findIndex(
    (line) => line.replace(/^\/\//, "").trim() === START_TOKEN
  );
  if (startLineIndex === -1) {
    throw new Error("Couldn't find starting line");
  }
  const endLineIndex = lines.findIndex(
    (line) => line.replace(/^\/\//, "").trim() === END_TOKEN
  );
  if (endLineIndex === -1) {
    throw new Error("Couldn't find ending line");
  }

  const section = lines.slice(startLineIndex, endLineIndex + 1);

  return section.join("\n");
}
