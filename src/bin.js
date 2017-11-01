#!/usr/bin/env node
const program = require('commander');
const ora = require('ora');
const chalk = require('chalk');
const merge = require('./index.js').toFile;

const spinner = ora('Parsing options').start();

function collect(val, collection) {
  collection.push(val);
  return collection;
}

program
  .option('-b, --base <baseFile>', 'Path to the base YAML file where other files will be merged into')
  .option('-o, --out <outFile>', 'Path to the YAML file that will be exported to. It will override any existing files')
  .option('-s, --search <searchDir>', 'A directory that will be searched for', collect, [])
  .parse(process.argv);

if (program.base && program.out && program.search && program.search.length > 0) {
  merge(program.base, program.out, program.search);
  spinner.succeed(chalk.green(`Output file written to ${program.out}`));
} else {
  spinner.fail(chalk.red('Please ensure all required parameters are provided'));
  process.exit(1);
}
