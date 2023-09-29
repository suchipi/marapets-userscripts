import rollupPluginTypeScript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  output: {
    format: "iife",
  },
  plugins: [rollupPluginTypeScript(), nodeResolve()],
  treeshake: true,
};
