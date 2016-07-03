# MovieMan [![npm version](https://badge.fury.io/js/movieman.svg)](https://badge.fury.io/js/movieman)

A package and CLI for retrieving movie information. Available via [npm](https://www.npmjs.com/package/movieman).

## Usage

#### Module

```sh
$ npm i -S movieman
```

```js
const movieman = require('movieman');

movieman.getMovie().by.title('the social network', (err, res) => {
  if (err) throw err;
  console.log(res); //=> http://www.omdbapi.com/?t=the%20social%20network&i=tt0096895&plot=short&r=json
});

movieman.getMovie().by.id('tt1628841')
  .then((resp) => {
    console.log(resp) //=> http://www.omdbapi.com/?i=tt1628841&plot=short&r=json
    })
  .catch((e) => {
    throw e;
  });
```

---

#### CLI

```sh
$ npm i -g movieman
$ movieman the social network
```

## Contribute

Feel free to open an [issue](https://github.com/kshvmdn/movieman/issues) or make a [PR](https://github.com/kshvmdn/movieman/pulls).
