#!/usr/bin/env node
import * as program from 'commander';
import * as PKG from '../package.json';
import doskeyCli from '../src/doskey-cli/index';

export interface IDoskeyCli {
  onList: () => Promise<void> | void;
  onAdd: (key: string, value: string, disable: boolean) => Promise<void> | void;
  onEdit: () => Promise<void> | void;
  onDel: (key: string) => Promise<void> | void;
  onActivate: () => Promise<void> | void;
  displayCurrentStatus: () => Promise<void> | void;
}

program
  .version(PKG.version);

program
  .command('ls')
  .description('List all the doskeys')
  .action(doskeyCli.onList);

program
  .command('add <key> <value> [disable]')
  .description('Add custom doskey')
  .action((doskeyCli.onAdd));

program
  .command('edit')
  .description('Edit doskeys')
  .action(doskeyCli.onEdit);

program
  .command('del <key>')
  .description('Delete doskeys by key')
  .action(doskeyCli.onDel);

program
  .command('activate')
  .description('Activate the changes')
  .action(doskeyCli.onActivate);

program
  .command('open')
  .description('Open configs file directly for batch edit. Experiment feature')
  .action(doskeyCli.onOpen);

program
  .parse(process.argv);

if (process.argv.length === 2) {
  program.outputHelp();
}
