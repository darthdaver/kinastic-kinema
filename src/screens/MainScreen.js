import React, { useEffect, useRef, useState, useContext } from 'react';
import { Animated, Dimensions, ScrollView, View, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopularMovies from '../mock/main-popular-mock.json';
import MovieCollection from '../components/MovieCollection';
import MovieConstants from '../constants/movie';
import Backdrop from '../components/Backdrop';
import Poster from '../components/Poster';
import { StoreContext, useStore } from '../store/StoreContext';
import { MovieApiConstants } from '../constants/api';
import api from '../api';
import TabConstants from '../constants/tab';

const { width, height } = Dimensions.get('window');

const MainScreen = ({ navigation }) => {
    const [popularMovies, setPopularMovies] = useState([{ id: 'empty-left' }, { id: 'empty-right' }]);
    const [fetchData, setFetchData] = useState(true)
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentMovie, setCurrentMovie] = useState(1);

    const selectMovie = (movie) => {
        navigation.navigate('Movie', {
            movie: movie
        })
    }

    const renderItem = ({ item, index }) => {
        if (!item.poster_path) {
            return <View style={styles.empty} />;
        }

        const inputRange = [
            (index - 2) * (MovieConstants.ITEM_WIDTH),
            (index - 1) * (MovieConstants.ITEM_WIDTH),
            index * (MovieConstants.ITEM_WIDTH)
        ];

        const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.carouselItem}>
                <Animated.View style={{ transform: [{ translateY }]}}>
                    <TouchableOpacity onPress={() => selectMovie(item)}>
                        <Poster path={MovieConstants.POSTER_BASE_URL.concat(item.poster_path) } />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
    
    useEffect(() => {
        if(!fetchData) {
            return;
        } else {
            const options = {
                type: MovieApiConstants.POPULAR
            }
            api.movie.getMovieCollection(options,1)
                .then((movies) => {
                    setFetchData(false)
                    setPopularMovies((previousState) => {
                        previousState.splice(-1,0,...movies)
                        return [...previousState]
                    })
                })    
        }
    }, [popularMovies]);
  
    return (
        <SafeAreaView style={styles.main}>
            <ScrollView>
                <Backdrop path={popularMovies[currentMovie].backdrop_path} />
                <Animated.FlatList
                    style={styles.carousel}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    keyExtractor={(item) => item.id}
                    horizontal
                    bounces={false}
                    decelerationRate={0}
                    renderToHardwareTextureAndroid
                    snapToInterval={MovieConstants.ITEM_WIDTH}
                    snapToAlignment='start'
                    onScroll={Animated.event(
                        [{ 
                            nativeEvent: { 
                                contentOffset: { 
                                    x: scrollX 
                                }
                            }
                        }],
                        { 
                            useNativeDriver: true,
                            listener: (event) => {
                                const xScrollOffset = event.nativeEvent.contentOffset.x;
                                const idx = 1 + Math.ceil(xScrollOffset / MovieConstants.ITEM_WIDTH);
                                if (currentMovie !== idx){
                                    setCurrentMovie(idx);
                                }
                            }
                        }
                    )}
                    scrollEventThrottle={16}
                    renderItem={renderItem}
                />
                <View style={styles.gridsContainer}>
                    <MovieCollection 
                        label={'Current Movie'}
                        selectMovie={selectMovie}  
                        fetch={api.movie.getMovieCollection}
                        options={{ type: MovieApiConstants.NOW_PLAYING }} 
                    />
                    <MovieCollection 
                        label={'Coming Soon'}
                        selectMovie={selectMovie}
                        fetch={api.movie.getMovieCollection}
                        options={{ type: MovieApiConstants.UPCOMING }}
                    />
                    <MovieCollection 
                        label={'Top Rated'}
                        selectMovie={selectMovie}
                        fetch={api.movie.getMovieCollection}
                        options={{ type: MovieApiConstants.TOP_RATED }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
  
    const styles = StyleSheet.create({
        carousel: {
            height: MovieConstants.ITEM_HEIGHT + 150,
            position: 'absolute',
            marginTop: height * 0.15
        },
        carouselItem: { 
            width: MovieConstants.ITEM_WIDTH, 
            alignItems: 'center'
        },
        empty: {
            width: MovieConstants.EMPTY_ITEM_SIZE
        },
        containerGrid: {
            marginLeft: 0
        },
        main: {
            flex: 1,
            backgroundColor: 'black'
        }
    });

export default MainScreen;