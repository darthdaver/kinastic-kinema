import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import uiConstants from '../../constants/ui';
import inputReducer from '../../reducers/ui/inputReducer';


const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = (text) => {
        const emailRegex = uiConstants.EMAIL_REGEX;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.password && text.trim().length < 6) {
            isValid = false;
        } 
        dispatch({ type: uiConstants.INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: uiConstants.INPUT_BLUR });
    };

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.inputWrapperExt}>
                <View style={styles.inputWrapperInt}>
                    <TextInput
                        {...props}
                        style={styles.input}
                        value={inputState.value}
                        onChangeText={textChangeHandler}
                        onBlur={lostFocusHandler}
                    />
                </View>
            </View>
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '65%',
        alignSelf: 'center',
    },
    inputWrapperExt: {
        backgroundColor: "white",
        paddingHorizontal: 1.5,
        paddingVertical: 1.5,
        borderRadius: 0
    },
    inputWrapperInt: {
        backgroundColor: "black",
        borderRadius: 0

    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
        color: 'white'
    },
    input: {
        color: 'white',
        borderRadius: 0,
        borderColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.12)',
        textAlign: 'center',
    },
    errorContainer: {
        marginVertical: 10,
        backgroundColor:'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
});

export default Input;
