import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { MovieApiConstants } from '../../constants/api';

const MovieTile = ({ movie, onSelect }) => {
    return(
        <View>
            <TouchableNativeFeedback onPress={() => onSelect(movie)}>
                <Image
                    source={{ uri: MovieApiConstants.POSTER_BASE_URL.concat(movie.poster_path) }}
                    style={styles.poster}
                />
            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    poster: {
        height: 150,
        width: 100,
        marginHorizontal: 5,
        borderRadius: 5
    }
})

export default MovieTile;

