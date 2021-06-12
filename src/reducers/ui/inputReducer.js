import uiConstants from "../../constants/ui";

const inputReducer = (state, action) => {
    switch (action.type) {
        case uiConstants.INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case uiConstants.INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
        return state;
    }
};

export default inputReducer;