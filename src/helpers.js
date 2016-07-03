import got from 'got';
import Promise from 'pinkie-promise';

export function request(opts) {
  const base = 'http://www.omdbapi.com';
  return got(base, {
    json: true,
    query: opts
  });
}
