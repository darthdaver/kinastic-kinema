import React from 'react';
import { Image, StyleSheet } from 'react-native';
import MovieConstants from '../constants/movie';

const Poster = ({ path }) => {
    return (
        <Image
            source={{ uri: path }}
            style={styles.posterImage}
        />
    )
}

const styles = StyleSheet.create({
    posterImage: {
        width: MovieConstants.ITEM_WIDTH - MovieConstants.SPACING,
        height: MovieConstants.ITEM_HEIGHT,
        paddingHorizontal: MovieConstants.SPACING,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    }
})

export default Poster;
