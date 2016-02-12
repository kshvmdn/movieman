import requests
import os

from pprint import pprint
from tabulate import tabulate

OMDB_URL = 'http://www.omdbapi.com/?type=movie&plot=short&tomatoes=true&t={}&y={}'


def request_data(title, year):
    return requests.get(OMDB_URL.format(title, year)).json()


def get_titles(dir_):
    movies = list()
    for root, dirs, files in os.walk(dir_):
        for file_ in files:
            movies.append({
                'title': os.path.splitext(file_)[0].rsplit(' ', 1),
                'fpath': os.path.join(root, file_)
            })
    return movies


def main(dir_='/Users/kashavmadan/Downloads/movies'):
    table = list()
    table.append(['Title', 'Plot', 'Genre', 'Actors', 'Rating', 'Runtime', 'Released', 'Score'])
    for t in get_titles(dir_):
        movie = request_data(t['title'][0], t['title'][1])
        table.append([
            movie['Title'],
            movie['Plot'],
            movie['Genre'],
            movie['Actors'],
            movie['Rated'],
            movie['Runtime'],
            movie['Released'],
            movie['imdbRating']])
    f = open('movies.txt', 'w')
    f.write(tabulate(table, headers='firstrow', tablefmt='fancy_grid'))
    f.close()


if __name__ == '__main__':
    main()
