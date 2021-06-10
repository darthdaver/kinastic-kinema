import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import api from '../../api';
import GenreMovieCollection from '../../components/movie/GenreMovieCollection';

const GenreScreen = ({ route, navigation }) => {
    const genre = route.params.genre;
    const selectMovie = (movie) => {
        navigation.navigate('Movie', {
            movie: movie
        })
    }

    return (
        <View style={styles.genreScreen}>
            <View style={styles.collectionsContainer}>
                <GenreMovieCollection 
                    label={'Current Movies'}
                    selectMovie={selectMovie} 
                    options={{ genreId: genre.id }} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    genreScreen: {
        backgroundColor: 'black',
        flex: 1
    },
    cover: {
        backgroundColor: 'yellow',
        height: 300
    }
})

export default GenreScreen;