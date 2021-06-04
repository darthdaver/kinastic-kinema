import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import MovieTile from '../components/MovieTile';
import Movie from '../models/Movie';

const MovieCollection = ({ label, collection, selectMovie }) => {

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

    return(
        <View style={styles.grid}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.containerGrid}>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={collection.map(movie => new Movie(movie))} 
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
        fontWeight: "bold",
        marginBottom: 5,
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

