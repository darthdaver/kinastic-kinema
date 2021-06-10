class Movie {
    constructor(options) {
        this.adult = options.adult || false
        this.backdrop_path = options.backdrop_path
        this.genre_ids = options.genre_ids || []
        this.id = options.id
        this.original_language = options.original_language
        this.original_title = options.title
        this.overview = options.overview
        this.popularity = options.popularity
        this.poster_path = options.poster_path
        this.release_date = options.release_date
        this.title = options.title
        this.video = options.video
        this.vote_average = options.vote_average
        this.vote_count = options.vote_count
    }
}

export default Movie;