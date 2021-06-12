import React, { useCallback, useState, useEffect, useReducer } from 'react';
import { ScrollView, Image, KeyboardAvoidingView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SignForm from '../../components/auth/SignForm';
import uiConstants from '../../constants/ui';
import formReducer from '../../reducers/ui/formReducer';
import signUpForm from './forms/signUpForm';
import logo from '../../../assets/images/kinema_logo.png';
import Storage from '../../storage/storage';
import StorageConstants from '../../constants/storage';
import { showMessage } from 'react-native-flash-message';

const SignUpScreen = ({ navigation, route }) => {
    const [enable, setEnable] = useState(false);
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
        },
        inputValidities: {
            name: false,
            surname: false,
            email: false,
            password: false
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: uiConstants.FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
    );

    const logIn = () => {
        navigation.navigate('LogIn',{
            email: formState.inputValues.email,
            password: formState.inputValues.password
        })
    }

    const submit = () => {
        const inputData = formState.inputValues;
        Storage.signUp(inputData).then((response) => {
            console.log(response);
            switch (response) {
                case StorageConstants.SUCCESS_SIGNUP:
                    showMessage({
                        message: "Congratulation!",
                        description: "Your account has been created!",
                        type: "success",
                    });
                    navigation.navigate('LogIn')
                    break;
                case StorageConstants.FAILED_SIGNUP_EMAIL_EXIST:
                    showMessage({
                        message: "Ops...",
                        description: "An account with this email already exist.",
                        type: "danger",
                    });
                    break;
                case StorageConstants.UNEXPECTED_SIGNUP_ERROR:
                    showMessage({
                        message: "Ops...",
                        description: "An unexpected error occurs during sign up. Retry.",
                        type: "danger",
                    });
                    break;
                default:
                    break;
            }
        });
    }

    useEffect(() => {
        const validation = formState.inputValidities
        setEnable(validation.email && validation.password && validation.name && validation.surname);
    }, [formState])


    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior="height"
            keyboardVerticalOffset={20}
        >
            <ScrollView 
                style={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{alignItems: 'center'}}
            >
                <Image 
                    source={logo}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <SignForm 
                    inputs={
                        signUpForm.fields.map((field) => {
                            return {
                                ...field,
                                "onInputChange": inputChangeHandler
                            }
                        })
                    } 
                    submit={{
                        ...signUpForm.submit,
                        onPress: submit
                    }}
                />
                <TouchableOpacity 
                    disabled={ !(enable) }
                    onPress={submit}
                    style={styles.signup}
                >
                    <Text>SIGN UP</Text>
                </TouchableOpacity>
                <Text style={styles.description}>Do you have an account?</Text>
                <TouchableOpacity 
                    style={styles.login}
                    onPress={logIn}
                >
                    <Text>LOGIN</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
        
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        width: '100%',
        height: '100%'
    },  
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    signup: {
        backgroundColor: 'rgba(221,134,0,1)',
        width: 150,
        paddingVertical: 15,
        alignItems: 'center'
    },
    login: {
        backgroundColor: 'white',
        width: 150,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 40
    },
    logo: {
        height: 150, 
        width: "100%", 
        marginTop: 20
    },
    description: {
        marginTop: 40,
        color: 'white',
        marginBottom: 20,
    }
});

export default SignUpScreen;