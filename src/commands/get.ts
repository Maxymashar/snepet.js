import { readJson } from "../utils/json-reader";
import files from "../utils/files";
import chalk from "chalk";
import { join } from "path";
import { logJson } from "../utils/json-logger";
import { getPath } from "./path";
import { existsSync } from "fs";

export function loadSnippetFile(type: string) {
    for (let i = 0; i < files.length; i++) {
        if (files[i].file === type) {
            getSnippetFile(type);
            return;
        }
    }
    console.log(chalk.red(`Error : The type ${type} is not supported`));
}

function getSnippetFile(type: string) {
    const _path = getPath();
    if (!existsSync(_path)) {
        console.log(chalk.red(`Error : VisualStudioCode is not installed`));
        return;
    }

    const snippetFilePath = join(_path, `${type}.json`);
    if (!existsSync(snippetFilePath)) {
        console.log(chalk.red(`No Snippets Found`));
        return;
    }
    const snippets = readJson(snippetFilePath);
    if (!snippets) {
        logJson({});
    } else {
        logJson(snippets);
    }

}