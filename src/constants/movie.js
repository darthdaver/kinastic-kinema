import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_WIDTH = width * 0.5 + SPACING;
const EMPTY_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

const MovieConstants = {
    SPACING: SPACING,
    ITEM_WIDTH: ITEM_WIDTH,
    ITEM_HEIGHT: width * 0.75,
    EMPTY_ITEM_SIZE: EMPTY_ITEM_SIZE,
    BACKDROP_HEIGHT: height * 0.5,
    POSTER_BASE_URL: 'https://image.tmdb.org/t/p/original'
}

export default MovieConstants;