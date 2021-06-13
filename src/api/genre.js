import { API_KEY, API_BASE_URL } from '@env';
import Genre from '../models/Genre';
import Movie from '../models/Movie';

const genreApi = {
    getGenres: async () => {
        try {
            const url = `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
            const { genres } = await fetch(url)
                .then((response) => response.json())
                .then((data) => data);
            const mappedGenres = genres.map((genre) => (new Genre(genre.id, genre.name)));
        return mappedGenres;
        } catch (e) {
            console.log("Unexpected error fetching genres - genreApi");
            return [];
        }
    }, 
    getGenreMovies: async ({ genreId }, page = 1) => {
        try {
            const url = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`;
            const { results } = await fetch(url)
                .then((response) => response.json())
                .then((data) => data);
            const movies = results
                .filter((movie) => movie.poster_path !== null || movie.backdrop_path !== null)
                .map((movie) => (new Movie(movie)));
            return movies;
        } catch (e) {
            console.log("Unexpected error fetching genre movies - genreApi");
            return [];
        }
    },
}

export default genreApi;