import fs from "fs"
import path from "path"

import manifest from "./manifest.js"

const json = JSON.stringify(manifest, null, 2)
const file = path.resolve("./manifest.json")

fs.writeFileSync(file, json, "utf8")
