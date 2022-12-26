
// ExperimentalWarning: Importing JSON modules is an experimental feature.
//import pkg from "./package.json" assert { type: "json" };
import fs from "fs"
import path from "path"
const pkg = JSON.parse(fs.readFileSync(path.resolve("./package.json"), "utf8"))

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
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    "default_icon": {
      // must be png
      //"16": "src/icons/biggrin.16.png",
    },
  },
  chrome_url_overrides: {
    //newtab: "src/pages/newtab/index.html",
  },
  icons: {
    // must be png
    "16": "src/icons/biggrin.16.png",
    "128": "src/icons/biggrin.128.png",
  },
  content_scripts: [
    // 1 or more is required
    {
      //matches: ["http://*/*", "https://*/*", "<all_urls>"],
      matches: ["https://fooooooooooobaaaaaaaaaaaaar.com/*"],
      js: ["src/pages/content/index.js"],
    },
    //{
    //  "matches": ["chrome-extension:todo-id/index.html"],
    //  "js": ["src/pages/content/index.js"]
    //}
  ],
  //devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
      matches: ["*://*/*"],
    },
  ],
}));

export default manifest;
