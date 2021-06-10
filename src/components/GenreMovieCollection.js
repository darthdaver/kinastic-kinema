import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import MovieTile from './MovieTile';
import Backdrop from './Backdrop';
import MovieConstants from '../constants/movie';

const GenreMovieCollection = ({ label, selectMovie, fetch, options }) => {
    const [page, setPage] = useState(1)
    const [fetchData, setFetchData] = useState(true);
    const [moviesCollection, setMoviesCollection] = useState([]);
    const [backdropPath, setBackdropPath] = useState('');
    const fetchMore = useCallback(() => setFetchData(true), []);

    const renderItem = (movieItem) => {
        return (
            <View style={styles.tileContainer}>
                <MovieTile 
                    movie={movieItem.item}
                    onSelect={() => {
                        selectMovie(movieItem.item)
                    }}
                />
            </View>
        )
    }

    const flatListHeader = () => {
        return (
            <View style={styles.header}>
                <Backdrop path={MovieConstants.POSTER_BASE_URL.concat(backdropPath)} />
                <Text style={styles.label}>{label}</Text>
            </View>
        )
    }

    useEffect(() => {
        if(!fetchData) {
            return;
        } else {
            fetch(options,page).then((movies) => {
                console.log("entro")
                setPage((previousState) => previousState + 1);
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
                    });
                    if (backdropPath === ''){
                        setBackdropPath(movies[0] ? movies[0].poster_path || movies[0].backdrop_path : '')
                    }
                    return [...previousState,...movies]
                });
            })
        }
    }, [moviesCollection, fetchData]);

    return(
        <View style={styles.grid}>
            <View style={styles.containerGrid}>
                <FlatList
                    ListHeaderComponent={flatListHeader}
                    keyExtractor={(item, index) => item.id}
                    onEndReachedThreshold={0.2}
                    onEndReached={fetchMore}
                    data={moviesCollection}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    columnWrapperStyle={styles.collection}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 200
    },
    label: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        marginLeft: 10
    },
    grid: {
        width: '100%',
        height: '100%',
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
        flex: 1,
        paddingLeft: 10,
        overflow: 'visible'
    },
    collection: {
        justifyContent: 'space-evenly'
    },
    tileContainer: {
        marginVertical: 10,
    }
})

export default GenreMovieCollection;

