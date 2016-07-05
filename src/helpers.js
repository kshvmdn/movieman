import got from 'got';

export function request(opts) {
  return got('http://www.omdbapi.com', { 
    json: true, 
    query: opts,
  });
}
