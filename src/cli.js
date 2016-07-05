#!/usr/bin/env node

import chalk from 'chalk';
import leftpad from 'left-pad';
import minimist from 'minimist';
import ora from 'ora';

import { getMovie } from './';
import { version } from '../package.json';

const spinner = ora('Loading...');

const defaults = {
  alias: {
    h: 'help',
    v: 'version',
    i: 'id',
  },
  boolean: [
    'help',
    'version',
  ],
  default: {
    i: null,
  },
};

const help = `
  Usage
    $ movieman <title> [--id <imdb_id>] [--help] [--version]

  Options
    -h --help      Display this help dialog.
    -v --version   Display the current version.
    -i --id        Use IMDb ID instead of movie title.

  Example
    $ movieman the dark knight
    $ movieman --id tt0468569
`;

const options = minimist(process.argv.slice(2), defaults);

if (options.help || options.version) {
  console.log(options.help ? help : 'v' + version);
  process.exit(0);
}

let param, get;

if (options.id) {
  param = options.id ? options._.length > 0 ? options._[0] : options.id : options._.join(' ');
  get = getMovie().by.ID;
} else {
  param = options._.join(' ');
  get = getMovie().by.title;
}


if (!param || !param.length || param.trim() === '') {
  console.error(`${options.id ? 'Expected IMDb ID' : 'Expected movie title'}. Run 'movieman -h' for help.`);
  process.exit(1);
}

spinner.start();

get(param, (err, resp) => {
  spinner.stop();

  if (err) throw err;

  for (let key in resp) {
    console.log(`${key} ${chalk.yellow(leftpad('-›  ', 18 - key.length))} ${resp[key]}`);
  }
});
