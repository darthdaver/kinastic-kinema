import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MovieGenres = ({ genres }) => {
    return (
        <View style={styles.genreList}>
            { genres.map((genre, index) => {
                return (
                    <View key={genre.id} style={styles.genreItem}>
                        <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                )
            }) }
        </View>
    )
}

const styles = StyleSheet.create({
    genreList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 4
    },
    genreItem: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: '#ccc',
        backgroundColor: '#ccc',
        marginRight: 4,
        marginBottom: 4
    },
    genreText: {
        color: 'black',
    }
});

export default MovieGenres;