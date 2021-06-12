import movieApi from './movie';
import genreApi from './genre';
import authApi from './auth';

const api = {
    movie: movieApi,
    genre: genreApi,
    auth: authApi
}

export default api;