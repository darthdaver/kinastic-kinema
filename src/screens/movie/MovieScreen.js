import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Backdrop from '../../components/movie/Backdrop'
import MovieGenres from '../../components/movie/MovieGenres';
import Poster from '../../components/movie/Poster';
import MovieConstants from '../../constants/movie';
import { Rating } from 'react-native-ratings';
import MovieDescription from '../../components/movie/MovieDescription';
import MovieCollection from '../../components/movie/MovieCollection';
import api from '../../api';
import { MovieApiConstants } from '../../constants/api';
import { observer } from 'mobx-react';
import { useRootStore } from '../../store/contexts/RootContext';

const { width, height } = Dimensions.get('window');

const MovieScreen = observer(({ route, navigation }) => {
    const { movieStore } = useRootStore();
    const movie = route.params.movie;
    const [fetchData, setFetchData] = useState(true)
    const [movieGenres, setMovieGenres] = useState([])

    const selectMovie = (movie) => {
        navigation.push('Movie', {
            movie: movie
        })
    }

    useEffect(() => {
        if (!fetchData) {
            return;
        }

        api.genre.getGenres()
            .then((genres) => {
                const filteredGenres = genres.filter((genre) => movie.genre_ids.includes(genre.id));
                setMovieGenres(filteredGenres);
                setFetchData(false);
            })
    }, [movieGenres]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            movieStore.resetSimilarMovies(movie.id);
        });
        return unsubscribe;
    }, [navigation]);

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
                        imageSize={25}
                    />
                    <Text style={{color:'white'}}>{movie.vote_average}</Text>
                </View>
                <MovieDescription overview={movie.overview} releaseDate={movie.release_date} />
                <MovieCollection 
                    label={"Similar Movies"} 
                    selectMovie={selectMovie}
                    options={{ 
                        type: MovieApiConstants.SIMILAR, 
                        movieId: movie.id 
                    }} 
                />
            </ScrollView>
        </View>
    )
});

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