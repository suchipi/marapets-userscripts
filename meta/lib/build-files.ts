/// <reference types="yavascript" />

import { SRC_DIR, DIST_DIR } from "./paths";

export function buildFiles() {
  return ls(SRC_DIR)
    .filter(isFile)
    .map((inputFile) => {
      const outputFile = inputFile
        .replace(SRC_DIR.toString(), DIST_DIR.toString())
        .replace(/\.tsx?$/, ".js");

      const outputFileMinified = outputFile.replace(/\.js$/, ".min.js");

      return {
        inputFile: new Path(inputFile),
        outputFile: new Path(outputFile),
        outputFileMinified: new Path(outputFileMinified),
      };
    });
}
