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
    v: 'version'
  },
  boolean: ['help', 'version']
};

var help = `
  Usage
    $ movieman [OPTIONS] title

  Options
    -h --help      Display this help dialog.
    -v --version   Display the current version.

  Example
    $ movieman batman
`;

var options = minimist(process.argv.slice(2), defaults);

if (options.help) {
  console.log(help);
  process.exit(0);
} else if (options.version) {
  console.log('v' + version);
  process.exit(0);
}

var title = options._.join(' ');
if (!title) {
  console.error('Expected movie title. Run `movieman -h` for help.')
  process.exit(1);
}

spinner.start();

movieman.getMovie().by.title(title, function(err, res) {
  if (err) throw err;

  spinner.stop();

  Object.keys(res).forEach(function(key) {
    console.log(key + chalk.yellow(leftpad('-›  ', 18 - key.length)) + res[key]);
  });
});
