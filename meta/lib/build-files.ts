/// <reference types="yavascript" />

import { rootDir } from "./root-dir";

const srcDir = rootDir.concat("src");
const distDir = rootDir.concat("dist");

export function buildFiles() {
  return ls(srcDir)
    .filter(isFile)
    .map((inputFile) => {
      const outputFile = inputFile
        .replace(srcDir.toString(), distDir.toString())
        .replace(/\.tsx?$/, ".js");

      const outputFileMinified = outputFile.replace(/\.js$/, ".min.js");

      return {
        inputFile,
        outputFile,
        outputFileMinified,
      };
    });
}
