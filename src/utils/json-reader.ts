import { parse, stringify } from "comment-json"
import { readFileSync, writeFileSync, existsSync } from "fs"


// Function for reading jsonc files
export function readJson(filepath: string) {
    if (!existsSync(filepath)) {
        return null;
    }
    return parse(readFileSync(filepath, "utf-8"));
}

// Function for writing to json files
export function writeJson(filepath: string, data: {}) {
    // console.log(data);
    writeFileSync(filepath, stringify(data));
}
