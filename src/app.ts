#!/usr/bin/env node

import { program } from "commander"
import chalk from "chalk";
import { getPath } from "./commands/path";
import { addSnippet } from "./commands/add";
import { loadSnippetFile } from "./commands/get";
import { deleteSnippet } from "./commands/delete";

program
    .version("2.0.4")
    .description("snepet is a cli tool for creating custom vscode snippets for all supported languages");

// The path command is for setting the path to the snippets folder
// program
//     .command("path")
//     .alias("p")
//     .option("-s, --set <path-to-folder>", "sets the path to the snippets folder", (v, _) => v.trim().toLocaleLowerCase())
//     .option("-g, --get", "gets the path for the snippets folder if set")
//     .description("set and get the path to the vscode snippets folder")
//     .action(({ set, get }) => {
//         if (!set && !get) {
//             console.log(chalk.red("Error : No option --get or --set is used"))
//         } else if (set && get) {
//             console.log(chalk.red("Error : Too many options --set and --get,only use one"));
//         } else if (set) {
//             setPath(set);
//         } else {
//             getPath();
//         }
//     });

// The add command is for adding snippets
program
    .command("add")
    .alias("a")
    .description("adds a new snippet")
    .action((_, b) => {
        if (b) {
            console.log(chalk.red(`Error : The options ${b} are not allowed`));
            return;
        }
        addSnippet();
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
