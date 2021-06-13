import React from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import MovieConstants from '../../constants/movie';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window')

const Backdrop = ({ path }) => {
    return (
        <View style={ styles.container }>
            <Animated.View removeClippedSubviews={false} style={{ height }}>
                    <Image
                        source={{ uri: MovieConstants.POSTER_BASE_URL.concat(path) }}
                        style={styles.backdropImage}
                    />
                    <LinearGradient
                        colors={['transparent','black' ]}
                        locations={[0.2, 0.8]}
                        style={styles.linearGradient}
                    ></LinearGradient>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        height: MovieConstants.BACKDROP_HEIGHT,
        marginBottom: height * 0.25,
        width: width 
    },
    backdropImage: {
        position: 'absolute',
        width: width,
        height: MovieConstants.BACKDROP_HEIGHT,
        zIndex: 1
    },
    linearGradient: {
        opacity: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex:2,
        width: width,
        height: MovieConstants.BACKDROP_HEIGHT
    }
});

export default Backdrop;

