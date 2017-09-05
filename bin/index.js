#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const PKG = require("../package.json");
const index_1 = require("../src/doskey-cli/index");
program
    .version(PKG.version);
program
    .command('ls')
    .description('List all the doskeys')
    .action(index_1.default.onList);
program
    .command('add <key> <value> [disable]')
    .description('Add custom doskey')
    .action((index_1.default.onAdd));
program
    .command('edit')
    .description('Edit doskeys')
    .action(index_1.default.onEdit);
program
    .command('del <key>')
    .description('Delete doskeys by key')
    .action(index_1.default.onDel);
program
    .command('activate')
    .description('Activate the changes')
    .action(index_1.default.onActivate);
program
    .command('open')
    .description('Open configs file directly for batch edit. Experiment feature')
    .action(index_1.default.onOpen);
program
    .parse(process.argv);
if (process.argv.length === 2) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map