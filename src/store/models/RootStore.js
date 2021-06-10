import AuthStore from "./AuthStore";
import MovieStore from "./MovieStore";

class RootStore {
    constructor() {
        this.authStore = new AuthStore(this);
        this.movieStore = new MovieStore(this);
    }
}

export default RootStore;