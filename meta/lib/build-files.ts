/// <reference types="yavascript" />

import { SRC_DIR, DIST_DIR } from "./paths";

export function buildFiles() {
  return ls(SRC_DIR)
    .filter(isFile)
    .map((inputFile) => {
      const outputFile = inputFile
        .replace(SRC_DIR, DIST_DIR)
        .replaceLast(inputFile.basename().replace(/\.tsx?$/, ".js"));
      return {
        inputFile: new Path(inputFile),
        outputFile: new Path(outputFile),
      };
    });
}
