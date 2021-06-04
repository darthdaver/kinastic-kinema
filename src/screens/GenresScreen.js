import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import GenresMock from "../mock/genres-mock.json";
import GenreTile from '../components/GenreTile'
import Genre from '../models/Genre';

const GenresScreen = ({ navigation }) => {
    const [genres, setGenres] = useState(GenresMock.genres);

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
        // API Call
    },[])

    
    return (
        <View style={styles.genresScreen}>
            <FlatList 
                keyExtractor={(item, index) => item.id}
                data={genres.map(genre => new Genre(genre.id,genre.name))} 
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