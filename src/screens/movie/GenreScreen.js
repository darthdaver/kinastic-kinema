import React from 'react';
import { View, StyleSheet } from 'react-native';
import GenreMovieCollection from '../../components/movie/GenreMovieCollection';
import MarginBottom from '../../components/ui/MarginBottom';

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
            <MarginBottom />
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