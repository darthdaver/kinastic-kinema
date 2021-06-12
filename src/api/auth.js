import { API_KEY, API_BASE_URL } from '@env';
import Genre from '../models/Genre';
import Movie from '../models/Movie';

const authApi = {
    requestSession: async () => {
        const url = `${API_BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`;
        console.log(url);
        const session = await fetch(url)
            .then((response) => response.json())
            .then((data) => data);
        return session;
    }
}

export default authApi;