#!/usr/bin/env node

import { program } from "commander"
import chalk from "chalk";
import { getPath } from "./commands/path";
import { addSnippet } from "./commands/add";
import { loadSnippetFile } from "./commands/get";
import { deleteSnippet } from "./commands/delete";
import { existsSync, statSync } from "fs";

program
    .version("2.1.1")
    .description("snepet is a cli tool for creating custom vscode snippets for all supported languages");

// The add command is for adding snippets
program
    .command("add")
    .option("-d, --directory <directory>", "Adds the snippet for only the directory", false)
    .alias("a")
    .description("adds a new snippet")
    .action(({ directory }) => {
        if (directory) {
            if (!existsSync(directory)) {
                console.log(chalk.red(`Error : The path ${directory} does not exist`));
            }
            if (!statSync(directory).isDirectory()) {
                console.log(chalk.red(`Error : The path ${directory} is not a directory`));
                return;
            }
            addSnippet(directory);
            return;
        }
        addSnippet(null);
    });

// The get command is used for getting the snippets of a given file
program
    .command("get")
    .alias("g")
    .description("lists the available snippets for the given type")
    .requiredOption("-t, --type <type-of-snippet>", "the type of the snippet", (value, _) => value.trim().toLocaleLowerCase())
    .action(({ type }) => { loadSnippetFile(type) })

// The delete command is used for deleting a snippets using the snippet id
program
    .command("delete")
    .alias("d")
    .description("delete a snippet")
    .requiredOption("-t, --type <type>", "the type of the snippet", (v, _) => v.trim().toLocaleLowerCase())
    .requiredOption("-id, --snippet-id <snippet-id>", "the snippet-id ", (v, _) => v.trim().toLocaleLowerCase())
    .action(({ type, snippetId }) => { deleteSnippet(snippetId, type) })

program.parse(process.argv);
