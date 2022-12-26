import resolve from "@rollup/plugin-node-resolve";
//import commonjs from "@rollup/plugin-commonjs";
import zip from "rollup-plugin-zip";
import WindiCSS from "rollup-plugin-windicss";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import emptyDir from "rollup-plugin-cleanup-dir";
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
const babelOptions = {
  plugins: [
    // windicss + styled-components
    //"babel-plugin-styled-windicss",
  ]
};

//export default withSolid({
export default ({
  // not working: workaround: manifest.write.js
  //input: "manifest.js",
  input: "manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    // TODO? https://github.com/solidjs/solid-refresh
    simpleReloader(),
    // virtual:windi.css -> chunk id /@windicss/windi.css
    WindiCSS({
      //preflight: false, // normalize default styles
      // scan js/ts files to find css class names
      scan: {
        dirs: [
          'src/pages/',
        ],
        fileExtensions: ['html', 'js', 'ts', 'jsx', 'tsx']
      },
    }),
    // solidjs: jsx to js
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
    // inject css chunks into html
    postcss({
      //inject: { insertAt: 'top' },
    }),
    // import "./file" -> import "./file.jsx"
    resolve({
      extensions,
      dedupe: [
        //"svelte"
      ],
    }),
    // cjs to esm
    //commonjs(),
    // Empty the output dir before a new build
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
