import { API_KEY, API_BASE_URL } from '@env';
import Movie from '../models/Movie';

const movieApi = {
    getMovieCollection: async ({ type }, page=1) => {
        const url = `${API_BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`;
        const { results } = await fetch(url)
            .then((response) => response.json())
            .then((data) => data)
        const movies = results
            .filter((movie) => movie.poster_path !== null || movie.backdrop_path !== null)
            .map((movie) => (new Movie(movie)));
        return movies;
    }, 
    getSimilar: async ({ movieId }, page=1) => {
        const url = `${API_BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&page=${page}`;
        const { results } = await fetch(url)
            .then((response) => response.json())
            .then((data) => data);
        const movies = results
            .filter((movie) => movie.poster_path !== null || movie.backdrop_path !== null)
            .map((movie) => (new Movie(movie)));
        return movies;
    }
}

export default movieApi;