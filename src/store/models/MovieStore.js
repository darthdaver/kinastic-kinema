import { action, makeObservable, observable, runInAction, when } from 'mobx';
import api from '../../api';
import { MovieApiConstants } from '../../constants/api';

class MovieStore {
    popularMovies = {
        collection: [],
        page: 1
    };
    topRatedMovies = {
        collection: [],
        page: 1
    };
    nowPlayingMovies = {
        collection: [],
        page: 1
    };
    upcomingMovies = {
        collection: [],
        page: 1
    };
    similarMovies = {
        collection: [],
        page: 1
    };
    genres = {};
    fetchMovies = true;
    fetchGenres = true;

    constructor(root) {
        this.root = root
        makeObservable(this, {
            popularMovies: observable,
            topRatedMovies: observable,
            nowPlayingMovies: observable,
            upcomingMovies: observable,
            similarMovies: observable,
            genres: observable,
            fetchMovies: observable,
            fetchGenres: observable,
            getGenres: action,
            getGenreMovies: action,
            getMovieCollection: action,
            resetSimilarMovies: action,
            toggleFetchMovies: action,
            toggleFetchGenres: action
        })
        when(
            () => this.fetchMovies,
            () => {
                this.getMovieCollection({ type: MovieApiConstants.POPULAR },1)
                this.getMovieCollection({ type: MovieApiConstants.NOW_PLAYING },1)
                this.getMovieCollection({ type: MovieApiConstants.TOP_RATED },1)
                this.getMovieCollection({ type: MovieApiConstants.UPCOMING },1)
                this.toggleFetchMovies()
            }
        )
        when(
            () => this.fetchGenres,
            () => {
                this.getGenres()
                this.toggleFetchGenres()
            }
        )
    }

    getCategory(type) {
        switch (type) {
            case MovieApiConstants.POPULAR:
                return this.popularMovies;
            case MovieApiConstants.NOW_PLAYING:
                return this.nowPlayingMovies;
            case MovieApiConstants.TOP_RATED:
                return this.topRatedMovies;
            case MovieApiConstants.UPCOMING:
                return this.upcomingMovies;
            case MovieApiConstants.SIMILAR:
                return this.similarMovies;
            default:
                return {
                    collection: [],
                    page: 1
                }
        }
    }

    getGenres() {
        this.toggleFetchGenres();
        api.genre.getGenres()
            .then((genres) => {
                genres.map((genre) => {
                    this.genres = {
                        ...this.genres,
                        [genre.id]: {
                            id: genre.id,
                            name: genre.name,
                            collection: [],
                            page: 1
                        }
                    }
                })

                this.getGenresList().forEach((genre) => {
                    this.getGenreMovies(genre)
                })
            })
    }

    getGenreMovies(genre) {
        api.genre.getGenreMovies({ genreId: genre.id }, genre.page)
            .then((movies) => {
                movies = this.filterMovies(genre, movies)
                genre.collection = [...genre.collection, ...movies]
                if (movies.length > 0) {
                    genre.page += 1
                }
            })
    }

    getGenresList(sortList=false) {
        let genresList = Object.values(this.genres);

        if (sortList) {
            genresList = genresList.sort((el1, el2) => {
                const keyA = el1.name;
                const keyB = el2.name;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
        }
        return genresList;
    }

    getMovieCollection(options, page) {
        if (!options.movieId) {
            api.movie.getMovieCollection(options, page)
                .then((movies) => {
                    this.parseResponse(movies, options.type)
                })
        } else {
            api.movie.getSimilar(options, page)
                .then((movies) => {
                    this.parseResponse(movies, options.type)
                })
        }
    }

    filterMovies(category, movies) {
        const filteredMovies = movies.filter((newMovie) => {
            includes = false;
            category.collection.forEach((movie) => {
                if (newMovie.id === movie.id) {
                    includes = true;
                }
            });
            return !includes
        })
        return filteredMovies;
    }

    parseResponse(movies, type) {
        runInAction(() => {
            const category = this.getCategory(type);
            movies = this.filterMovies(category, movies)
            category.collection = [...category.collection,...movies]
            if (movies.length > 0) {
                category.page += 1;
            }
        });
    }

    resetSimilarMovies (movieId) {
        this.similarMovies.collection = []
        this.similarMovies.page = 1
        this.getMovieCollection({ 
            type: MovieApiConstants.SIMILAR, 
            movieId: movieId 
        }, 1)
    }

    toggleFetchMovies(){
        this.fetchMovies = !this.fetchMovies;
    }

    toggleFetchGenres(){
        this.fetchGenres = !this.fetchGenres;
    }
}

export default MovieStore;