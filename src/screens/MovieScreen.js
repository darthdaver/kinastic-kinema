import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Backdrop from '../components/Backdrop';
import MovieGenres from '../components/MovieGenres';
import Poster from '../components/Poster';
import MovieConstants from '../constants/movie';
import GenresMock from '../mock/genres-mock.json';
import Genre from '../models/Genre';
import { Rating } from 'react-native-ratings';
import MovieDescription from '../components/MovieDescription';
import MovieCollection from '../components/MoviesCollection';
import RecommendedMovies from '../mock/recommended-movies.json';

const { width, height } = Dimensions.get('window');

const MovieScreen = ({ route, navigation }) => {
    const movie = route.params.movie;
    const recommended = RecommendedMovies.results;
    const movieGenres = GenresMock.genres
        .filter((genre) => movie.genre_ids.includes(genre.id))
        .map((genre) => new Genre(genre.id, genre.name));

    const selectMovie = (movie) => {
        navigation.push('Movie', {
            movie: movie
        })
    }

    console.log(movie.backdrop_path || movie.poster_path)

    return (
        <View style={styles.screen}>
            <ScrollView>
                <Backdrop path={MovieConstants.POSTER_BASE_URL.concat(movie.backdrop_path || movie.poster_path)} />
                <View style={styles.posterContainer} >
                    <Poster path={MovieConstants.POSTER_BASE_URL.concat(movie.poster_path)} />
                    <MovieGenres genres={movieGenres} />
                    <Rating
                        type='custom'
                        readonly
                        ratingCount={5}
                        startingValue={(movie.vote_average * 5)/10}
                        ratingBackgroundColor={"black"}
                        tintColor={"black"}
                        imageSize={30}
                    />
                    <Text style={{color:'white'}}>{movie.vote_average}</Text>
                </View>
                <MovieDescription overview={movie.overview} releaseDate={movie.release_date} />
                <MovieCollection label={"Similar Movies"} collection={recommended} selectMovie={selectMovie} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    posterContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: MovieConstants.ITEM_HEIGHT + 150,
        position: 'absolute',
        marginTop: height * 0.15
    },
    screen: {
        flex: 1,
        backgroundColor: 'black',
    }
})

export default MovieScreen;