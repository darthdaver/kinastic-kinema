import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import MovieTile from './MovieTile';
import TabConstants from '../constants/tab';
import Movie from '../models/Movie';
import { useStore } from '../store/StoreContext';
import api from '../api'

const MovieCollection = ({ label, selectMovie, fetch, options }) => {
    const [page, setPage] = useState(1)
    const [fetchData, setFetchData] = useState(true);
    const [moviesCollection, setMoviesCollection] = useState([]);
    const fetchMore = useCallback(() => setFetchData(true), []);

    const renderItem = (movieItem) => {
        return (
            <MovieTile 
                movie={movieItem.item}
                onSelect={() => {
                    selectMovie(movieItem.item)
                }}
            />
        )
    }

    useEffect(() => {
        if(!fetchData) {
            return;
        } else {
            fetch(options,page).then((movies) => {
                setPage((previousState) => previousState + 1)
                setFetchData(false);
                setMoviesCollection((previousState) => {
                    movies = movies.filter((newMovie) => {
                        includes = false;
                        previousState.forEach((movie) => {
                            if (newMovie.id === movie.id) {
                                includes = true;
                            }
                        });
                        return !includes
                    })
                    return [...previousState,...movies]
                })
            })
        }
    }, [moviesCollection, fetchData]);

    return(
        <View style={styles.grid}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.containerGrid}>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    onEndReachedThreshold={0.2}
                    onEndReached={fetchMore}
                    data={moviesCollection} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
        marginLeft: 10
    },
    grid: {
        marginLeft: 0,
        marginBottom: 20,
        overflow: 'visible'
    },
    gridItem: {
        flex: 1,
        margin: 10,
        height: 150,
        width: 100,
        borderRadius: 10,
        overflow: 'hidden'
    },
    containerGrid: {
        paddingLeft: 10,
        overflow: 'visible'
    },
    title: {
        textAlign: 'right',
        fontSize: 18
    }
})

export default MovieCollection;

