export const ROOT_DIR = new Path(__dirname, "..", "..").normalize();

export const META_DIR = ROOT_DIR.concat("meta");
export const SRC_DIR = ROOT_DIR.concat("src");
export const DIST_DIR = ROOT_DIR.concat("dist");

export const ROLLUP_CONFIG = META_DIR.concat("rollup.config.mjs");

export function rootRel(path: Path) {
  return path.relativeTo(ROOT_DIR);
}
