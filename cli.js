#!/usr/bin/env node

var chalk = require('chalk');
var leftpad = require('left-pad');
var minimist = require('minimist');
var spinner = require('ora')('Loading...');

var movieman = require('./dist');
var version = require('./package.json').version;

var defaults = {
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

var help = `
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

var options = minimist(process.argv.slice(2), defaults);

if (options.help || options.version) {
  console.log(options.help ? help : 'v' + version);
  process.exit(0);
}

var param, getMovie; 

if (options.id) {
  param = options._.length > 0 ? options._[0] : options.id;
  getMovie = movieman.getMovie.by.id;
} else {
  param = options._.join(' ');
  getMovie = movieman.getMovie.by.title;
}

if (!param || !param.length || param.trim() === '') {
  console.error((options.id ? 'Expected IMDb ID.' : 'Expected movie title.') + ' Run `movieman --help` for help.');
  process.exit(1);
}

spinner.start();

getMovie(param, function(err, res) {
  if (err) throw err;

  spinner.stop();

  Object.keys(res).forEach(function(key) {
    console.log(key + chalk.yellow(leftpad('-›  ', 18 - key.length)) + res[key]);
  });
});
