# movieman [![npm version](https://badge.fury.io/js/movieman.svg)](https://badge.fury.io/js/movieman)

Retrieve movie information via IMDb. Features [module](#module) component as well as [CLI](#cli).

## Usage

### Module

- Install via [npm](https://www.npmjs.com/package/movieman).
  
  ```sh
  $ npm i -S movieman
  ```

- Movieman supports both Promises and error-first callbacks. Use whichever you prefer.

  ```js
  const movieman = require('movieman');

  movieman.getMovie().by.title('the social network', (err, res) => {
    if (err) throw err;
    console.log(res); //=> http://www.omdbapi.com/?t=the%20social%20network&i=tt0096895&plot=short&r=json
  });

  movieman.getMovie().by.id('tt0468569')
    .then((resp) => {
      console.log(resp) //=> http://www.omdbapi.com/?i=tt0468569&plot=short&r=json
    })
    .catch((e) => {
      throw e;
    });
  ```

### CLI

- Install globally via [npm](https://www.npmjs.com/package/movieman).

```sh
$ npm i -g movieman
$ movieman --help
  
  Usage
    $ movieman <title> [--help] [--version]

  Options
    -h --help      Display this help dialog.
    -v --version   Display the current version.

  Example
    $ movieman the social network
```

## Contribute

Feel free to open an [issue](https://github.com/kshvmdn/movieman/issues) or make a [PR](https://github.com/kshvmdn/movieman/pulls).
