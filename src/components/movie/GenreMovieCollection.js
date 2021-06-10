import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import MovieTile from './MovieTile';
import Backdrop from './Backdrop';
import MovieConstants from '../../constants/movie';
import { useRootStore } from '../../store/contexts/RootContext';

const GenreMovieCollection = ({ label, selectMovie, options }) => {
    const { movieStore } = useRootStore();
    const genre = movieStore.genres[options.genreId]
    const genreMovieCollection = [...genre.collection];
    const backdropPath = genreMovieCollection.length > 0 ? genreMovieCollection[0].backdropPath || genreMovieCollection[0].poster_path || '' : '';
    const [fetchData, setFetchData] = useState(false);
    const [endList, setEndList] = useState(false);
    const endReached = useCallback(() => setEndList(true), []);
    const fetchMore = useCallback(() => {
        if (endReached) {
            setFetchData(true);
            setEndList(false);
        }
    }, []);

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
            setFetchData(false);
            movieStore.getGenreMovies(genre);
        }
    }, [fetchData]);

    return(
        <View style={styles.grid}>
            <View style={styles.containerGrid}>
                <FlatList
                    ListHeaderComponent={flatListHeader}
                    keyExtractor={(item, index) => item.id}
                    onMomentumScrollBegin = {fetchMore}
                    onEndReachedThreshold = {0.1}
                    onEndReached={endList}
                    data={genreMovieCollection}
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

