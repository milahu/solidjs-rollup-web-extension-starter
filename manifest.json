/*
breaks as ESM module
[!] Error: require() of ES Module manifest.js from node_modules/cosmiconfig/dist/loaders.js not supported.
Instead change the require of manifest.js in node_modules/cosmiconfig/dist/loaders.js to a dynamic import() which is available in all CommonJS modules.

//import { defineManifest } from "@crxjs/vite-plugin";
import { defineManifest } from "rollup-plugin-chrome-extension";
import pkg from "./package.json";
*/

/*
// [!] Error: No loader specified for extension ".cjs"
// -> set "type": "commonjs" in package.json
// and move rollup.config.js to *.mjs
*/
//const { defineManifest } = require("rollup-plugin-chrome-extension")
// [!] TypeError: defineManifest is not a function

//const { defineManifest } = require("@crxjs/vite-plugin")
// [!] Error: Cannot find module 'vite'
// [!] (plugin chrome-extension) Error: The Chrome extension must have at least one asset (html or css) or script file.

//const defineManifest = (x) => x;
// [!] (plugin chrome-extension) Error: The Chrome extension must have at least one asset (html or css) or script file.

const pkg = require("./package.json")

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = pkg.version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

//const manifest = defineManifest(async () => ({
// [!] (plugin chrome-extension) Error: The Chrome extension must have at least one asset (html or css) or script file.
const manifest = (({
  manifest_version: 3,
  name: pkg.displayName ?? pkg.name,
  version: `${major}.${minor}.${patch}.${label}`,
  description: pkg.description,
  //options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    scripts: [
      "src/pages/content/index.js",
    ],
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    //default_icon: "icons/34x34.png",
  },
  chrome_url_overrides: {
    //newtab: "src/pages/newtab/index.html",
  },
  icons: {
    //"128": "icons/128x128.png",
  },
  content_scripts: [
    //{
    //  matches: ["http://*/*", "https://*/*", "<all_urls>"],
    //  js: ["src/pages/content/index.js"],
    //},
  ],
  //devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
      matches: ["*://*/*"],
    },
  ],
}));

//export default manifest;
exports.default = manifest;
