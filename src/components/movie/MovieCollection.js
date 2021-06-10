import { observer } from 'mobx-react';
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useRootStore } from '../../store/contexts/RootContext';
import MovieTile from './MovieTile';

const MovieCollection = observer(({ label, selectMovie, options }) => {
    const { movieStore } = useRootStore();
    const movieCollection = [...movieStore.getCategory(options.type).collection];
    const [fetchData, setFetchData] = useState(false);
    const [resetSimilar, setResetSimilar] = useState(true);
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
            if (options.movieId && resetSimilar) {
                movieStore.resetSimilarMovies(options.movieId);
                setResetSimilar(false);
            }
            return;
        } else {
            setFetchData(false);
            const page = movieStore.getCategory(options.type).page;
            movieStore.getMovieCollection(options, page);
        }
    }, [fetchData]);

    return(
        <View style={styles.grid}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.containerGrid}>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    onMomentumScrollBegin = {fetchMore}
                    onEndReachedThreshold = {0.1}
                    onEndReached={endList}
                    data={movieCollection} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
})

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

