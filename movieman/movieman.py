import requests
import os
import sys

from pprint import pprint
from tabulate import tabulate

OMDB_URL = 'http://www.omdbapi.com/?type=movie&tomatoes=true&t={}&y={}'

try:
    MOVIEDIR = sys.argv[1]
except IndexError as err:
    print('Expected movie path')
    sys.exit(1)

VALID_EXT = ('.avi', '.m4v', '.mkv', '.mov', '.mp4', '.mpeg', '.wmv')


def request_data(title, year):
    return requests.get(OMDB_URL.format(title, year)).json()


def get_titles(dir_):
    movies = list()
    for root, dirs, files in os.walk(dir_):
        for file_ in [f for f in files if f.endswith(VALID_EXT)]:
            title, year = os.path.splitext(file_)[0].rsplit(' ', 1)
            movies.append({
                'title': title,
                'year': year,
                'fpath': os.path.join(root, file_),
                'fname': file_
            })
    return movies


def main(dir_=MOVIEDIR):
    f = open(dir_ + '/movies.txt', 'w')

    for t in get_titles(dir_):
        movie = request_data(t['title'], t['year'])

        f.write('{}\n{}\n\n{} | {}\n{} | {} | {} | {} on IMDb\n{}\n\n\n'.format(
            movie['Title'],
            movie['Plot'],
            movie['Director'],
            movie['Actors'],
            movie['Released'],
            movie['Runtime'],
            movie['Rated'],
            movie['imdbRating'],
            'http://www.imdb.com/title/' + movie['imdbID'] + '/',
        ))

    f.close()


if __name__ == '__main__':
    main()
