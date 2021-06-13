import { API_KEY, API_BASE_URL } from '@env';
import { MovieApiConstants } from '../constants/api';
import Movie from '../models/Movie';

const movieApi = {
    getMovieCollection: async ({ type }, page=1) => {
        try {
            const url = `${API_BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`;
            const { results } = await fetch(url)
                .then((response) => response.json())
                .then((data) => data)
            const movies = results
                .filter((movie) => movie.poster_path !== null || movie.backdrop_path !== null)
                .map((movie) => (new Movie(movie)));
            return movies;
        } catch (e) {
            console.log("Unexpected error in request movie collection - movieApi");
            return []
        }
    },
    getTrailer : async (movieId) => {
        try {
            const url = `${API_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;
            const { results } = await fetch(url)
                .then((response) => response.json())
                .then((data) => data)
            const trailers = results.filter((trailer) => trailer.type === MovieApiConstants.TRAILER);
            return trailers;
        } catch (e) {
            console.log("Unexpected error in request movie trailer - movieApi");
            return []
        }
    },
    getSimilar: async ({ movieId }, page=1) => {
        try {
            const url = `${API_BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&page=${page}`;
            const { results } = await fetch(url)
                .then((response) => response.json())
                .then((data) => data);
            const movies = results
                .filter((movie) => movie.poster_path !== null || movie.backdrop_path !== null)
                .map((movie) => (new Movie(movie)));
            return movies;
        } catch (error) {
            console.log("Unexpected error in request similar movies - movieApi");
            return []
        }
    }
}

export default movieApi;