import requests
import tabulate
import os

from pprint import pprint

OMDB_URL = 'http://www.omdbapi.com/?t={}'


def get_movie_names(dir_):
    import os
    dir_ = '/Users/kashavmadan/Downloads/movies'  # temporary

    for subdir, dirs, files in os.walk(dir_):
        for file in files:
            print(os.path.join(subdir, file))


def get_imdb_data(movie):
    return requests.get(OMDB_URL.format(movie)).json
