import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableNativeFeedback, View } from 'react-native'
import api from '../../api';
import { MovieApiConstants } from '../../constants/api';

const GenreTile = ({ genre, onSelect }) => {
    //console.log(backdropPath)
    const [fetchData, setFetchData] = useState(true)
    const [backdropPath, setBackdropPath] = useState('');

    useEffect(() => {
        if (!fetchData) {
            return;
        }

        api.genre.getGenreMovies({ genreId: genre.id }, 1).then((movies) => {
            if (movies.length > 0) {
                setBackdropPath(movies[0].backdrop_path || movies[0].poster_path || '')
            }
        })
    }, [])

    return(
        <View style={styles.gridItem}>
            <TouchableNativeFeedback onPress={() => onSelect(genre)}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: MovieApiConstants.POSTER_BASE_URL.concat(backdropPath) }}
                        style={styles.poster}
                    />
                    <View style={styles.labelContainer}>
                        <Text style={styles.title} >{genre.name}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    labelContainer: {
        width: '100%',
        height: '100%',
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gridItem: {
        flex: 0.5,
        justifyContent: 'center',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'
    },
    container: {
        backgroundColor: 'red',
        margin: 15,
        flex: 1,
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2
        },
        overflow: 'hidden',
        elevation: 3,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 18,
        color: 'white',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    poster: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
})

export default GenreTile;

