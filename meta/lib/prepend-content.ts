/// <reference types="yavascript" />

export function prependContent(contentToPrepend: string, toFile: string) {
  const fileContent = readFile(toFile);
  const newContent = contentToPrepend + "\n" + fileContent;
  writeFile(toFile, newContent);
}
