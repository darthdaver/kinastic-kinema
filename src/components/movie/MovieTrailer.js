import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

const MovieTrailer = ({ trailerId }) => {

    return (
        <View style={styles.trailerExternal}>
            <Text style={styles.titleText}>Trailer</Text>
            <View style={styles.trailerContainer}>
                <YoutubePlayer height={250} videoId={trailerId} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    trailerContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    }
})

export default MovieTrailer;