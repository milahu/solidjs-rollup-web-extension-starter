import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import zip from "rollup-plugin-zip";
import WindiCSS from "rollup-plugin-windicss";
import terser from "@rollup/plugin-terser";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import { emptyDir } from "rollup-plugin-empty-dir";
//import withSolid from "rollup-preset-solid";
import { babel } from "@rollup/plugin-babel";

// ExperimentalWarning: Importing JSON modules is an experimental feature.
//import pkg from "./package.json" assert { type: "json" };
import fs from "fs";
import path from "path";
const pkg = JSON.parse(fs.readFileSync(path.resolve("./package.json"), "utf8"));

const production = !process.env.ROLLUP_WATCH;

// https://github.com/solidjs-community/rollup-preset-solid
const extensions = [".js", ".ts", ".jsx", ".tsx"];
const solidOptions = {};
const babelTargets = pkg.browserslist || "last 2 years";
const babelOptions = {};

//export default withSolid({
export default ({
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    // TODO? https://github.com/solidjs/solid-refresh
    simpleReloader(),
    // solidjs
    babel({
      extensions,
      babelHelpers: "bundled",
      presets: [
        ["babel-preset-solid", solidOptions || {}],
        // typescript
        //"@babel/preset-typescript",
        ["@babel/preset-env", { bugfixes: true, targets: babelTargets }],
      ],
      ...babelOptions,
    }),
    /*
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    */
    WindiCSS({
      preflight: false,
    }),
    // the plugins below are optional
    resolve({
      extensions,
      dedupe: [
        //"svelte"
      ],
    }),
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    commonjs(),
    // Empties the output dir before a new build
    emptyDir(),
    // If we're building for production, minify
    production && terser(),
    // Outputs a zip file in ./releases
    production && zip({ dir: "releases" }),
  ],
  watch: {
    clearScreen: false,
  }
});
