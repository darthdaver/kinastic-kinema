import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import Colors from '../constants/colors'

const GenreTile = ({ genre, onSelect }) => {
    return(
        <View
            style={styles.gridItem}
        >
            <TouchableNativeFeedback
            onPress={() => onSelect(genre)}
        >
            <View style={styles.container}>
                <Text style={styles.title} >{genre.name}</Text>
            </View>
        </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 0.5,
        justifyContent: 'center',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'
    },
    container: {
        margin: 15,
        backgroundColor: 'red',
        flex: 1,
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 2
        },
        padding: 15,
        elevation: 3,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        textAlign: 'right',
        fontSize: 18
    }
})

export default GenreTile;

