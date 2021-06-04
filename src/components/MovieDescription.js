import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MovieDescription = ({ overview, releaseDate }) => {
    return (
        <View style={styles.description}>
            <Text style={styles.titleText}>{"Overview"}</Text>
            <Text style={styles.descriptionText}>{overview}</Text>
            <View >
                <Text style={styles.paragraphText}>{"Release Date"}</Text>
                <Text style={styles.descriptionText}>{releaseDate}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    description: {
        marginHorizontal: 10,
    },
    descriptionText: {
        color: "white",
        lineHeight: 22,
        textAlign: 'justify',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    paragraphContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline'
    },  
    paragraphText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5
    }
});

export default MovieDescription;