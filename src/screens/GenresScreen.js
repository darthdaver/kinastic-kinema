import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import api from '../api';
import GenreTile from '../components/GenreTile';

const GenresScreen = ({ navigation }) => {
    const [genres, setGenres] = useState([]);
    const [fetchData, setFetchData] = useState(true);

    const selectGenre = (genre) => {
        navigation.navigate('Genre', {
            genre: genre
        })
    }

    const renderItem = (genreItem) => {
        return (
            <GenreTile genre={genreItem.item} onSelect={selectGenre}/>
        )
    }

    useEffect(() => {
        if (!fetchData) {
            return;
        }

        api.genre.getGenres()
            .then((genres) => {
                setGenres(genres);
                setFetchData(false);
            })
    }, [genres]);  

    return (
        <View style={styles.genresScreen}>
            <FlatList 
                keyExtractor={(item, index) => item.id}
                data={genres} 
                renderItem={renderItem} 
                numColumns={2}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    genresScreen: {
        backgroundColor: 'black'
    }
})

export default GenresScreen;