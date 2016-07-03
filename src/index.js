import { request } from './helpers';

function getResponse(options, cb) {
  return new Promise((resolve, reject) => {
    request(options)
      .then((response) => {
        if (!response || !response.body) {
          throw new Error('Failed to fetch data.');
        }

        if (cb) return cb(null, response.body);
        resolve(response.body)
      })
      .catch((err) => {
        if (cb) return cb(err, null);
        reject(err);
      });
  });
}

export function getMovie(options={}) {
  if (options.constructor !== Object) {
    options = {};
  }

  options.plot = options.plot || 'short';
  options.r = options.r || 'json';
  options.type = 'movie';

  return {
    by: {
      ID: (imdbID, cb=null) => {
        options.i = imdbID;
        return getResponse(options, cb);
      },
      title: (title, cb=null) => {
        options.t = title;
        return getResponse(options, cb);
      }
    }
  }
}
