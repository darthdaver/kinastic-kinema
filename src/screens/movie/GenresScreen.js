import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import GenreTile from '../../components/movie/GenreTile';
import MarginBottom from '../../components/ui/MarginBottom';
import { useRootStore } from '../../store/contexts/RootContext';

const GenresScreen = observer(({ navigation }) => {
    const { movieStore } = useRootStore();
    const [genres, setGenres] = useState([...movieStore.getGenresList(true)]);

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
});


const styles = StyleSheet.create({
    genresScreen: {
        flex: 1,
        backgroundColor: 'black'
    }
})

export default GenresScreen;