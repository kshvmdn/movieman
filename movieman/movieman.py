import requests
import tabulate
import os

from pprint import pprint

OMDB_URL = 'http://www.omdbapi.com/?type=movie&plot=long&tomatoes=true&t={}&y={}'


def main(dir_='/Users/kashavmadan/Downloads/movies'):
    for movie in get_movie_titles(dir_):
        data = get_imdb_data(movie['title'][0], movie['title'][1])


def get_movie_titles(dir_):
    movies = []
    for root, dirs, files in os.walk(dir_):
        for file_ in files:
            movies.append({
                'title': os.path.splitext(file_)[0].rsplit(' ', 1),
                'fpath': os.path.join(root, file_)
            })
    return movies


def get_imdb_data(title, year):
    return requests.get(OMDB_URL.format(title, year)).json()

main()
