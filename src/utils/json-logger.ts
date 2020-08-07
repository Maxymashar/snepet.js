import chalk from "chalk"


export function logJson(jsonFile: {}) {
    const keys = Object.keys(jsonFile);
    console.log(chalk.yellow(`Found ${keys.length} snippets`));
    console.log(chalk.yellow("+++++++++++++++++++++++++++++++++++++++++++\n"));
    for (let i = 0; i < keys.length; i++) {
        const currentSnippet = jsonFile[keys[i]];
        console.log(chalk.green(" # name        : ") + chalk.yellow(keys[i]));
        console.log(chalk.green(" # prefix      : ") + chalk.yellow(currentSnippet["prefix"]));
        console.log(chalk.green(" # description : ") + chalk.yellow(currentSnippet["description"]));
        console.log(chalk.green(" # id          : ") + chalk.magenta(currentSnippet["id"]))
        console.log("");
    }
    console.log(chalk.yellow("+++++++++++++++++++++++++++++++++++++++++++\n"));
}