import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GenreMoviesMock from '../mock/genre-mock.json';
import PopularMovies from '../mock/main-popular-mock.json';
import MovieCollection from '../components/MoviesCollection';

const GenreScreen = ({ navigation }) => {
    const [movies, setMovies] = useState(PopularMovies.results)

    const selectMovie = (movie) => {
        navigation.navigate('Movie', {
            movie: movie
        })
    }

    useEffect(() => {
        // API Call
    },[])

    return (
        <View style={styles.genreScreen}>
            <ScrollView style={styles.genreScreen}>
                <View style={styles.collectionsContainer}>
                    <MovieCollection label={'Current Movie'} collection={movies} selectMovie={selectMovie} />
                    <MovieCollection label={'Coming Soon'} collection={movies} selectMovie={selectMovie} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    genreScreen: {
        backgroundColor: 'black',
        flex: 1
    },
    collectionsContainer: {
    },
    cover: {
        backgroundColor: 'yellow',
        height: 300
    }
})

export default GenreScreen;