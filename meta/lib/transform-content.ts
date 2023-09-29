/// <reference types="yavascript" />

export function transformContent(
  file: string | Path,
  mapper: (currentContent: string) => string
) {
  const currentContent = readFile(file);
  const newContent = mapper(currentContent);
  writeFile(file, newContent);
}
