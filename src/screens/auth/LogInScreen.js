import React, { useCallback, useState, useEffect, useReducer } from 'react';
import { KeyboardAvoidingView, StyleSheet, Button, Image, Text } from 'react-native';
import SignForm from '../../components/auth/SignForm';
import Input from '../../components/ui/Input';
import uiConstants from '../../constants/ui';
import formReducer from '../../reducers/ui/formReducer';
import logInForm from './forms/logInForm';
import logo from '../../../assets/images/kinema_logo.png';
import StorageConstants from '../../constants/storage';
import { observer } from 'mobx-react';
import { useRootStore } from '../../store/contexts/RootContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Storage from '../../storage/storage';
import { showMessage } from 'react-native-flash-message';

const LogInScreen = observer(({ navigation }) => {
    const { authStore } = useRootStore();
    const [enable, setEnable] = useState(false);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
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


    const signUp = () => {
        navigation.navigate('SignUp',{
           email: formState.inputValues.email,
           password: formState.inputValues.password
        })
    }
    
    const submit = () => {
        const inputData = formState.inputValues;
        Storage.login(inputData).then(([response,user]) => {
            switch (response) {
                case StorageConstants.SUCCESS_LOGIN:
                    showMessage({
                        message: "Hey!",
                        description: `Welcome back ${user.name}`,
                        type: "success",
                    });
                    authStore.login(user);
                    break;
                case StorageConstants.FAILED_LOGIN_EMAIL_NOT_FOUND:
                    showMessage({
                        message: "Ops...",
                        description: "This email is not associated to an active account.",
                        type: "danger",
                    });
                    break;
                case StorageConstants.FAILED_LOGIN_PASSWORD:
                    showMessage({
                        message: "Ops...",
                        description: "The password provided is not correct.",
                        type: "danger",
                    });
                    break;
                case StorageConstants.UNEXPECTED_LOGIN_ERROR:
                    showMessage({
                        message: "Ops...",
                        description: "An unexpected error occurs during login. Retry.",
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
        setEnable(validation.email && validation.password);
    }, [formState])

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior="height"
        >
            <Image 
                source={logo}
                resizeMode="contain"
                style={styles.logo}
            />
            <SignForm 
                inputs={
                    logInForm.fields.map((field) => {
                        return {
                            ...field,
                            onInputChange: inputChangeHandler
                        }
                    })
                } 
                submit={{
                    ...logInForm.submit,
                    onPress: submit
                }}
            />
            <TouchableOpacity 
                disabled={ !(enable) }
                onPress={submit}
                style={styles.login}
            >
                <Text>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.description}>Don't have an account yet?</Text>
            <TouchableOpacity 
                style={styles.signup}
                onPress={signUp}
            >
                <Text>SIGN UP</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        
    )
})

const styles = StyleSheet.create({
    scrollViewContainer: {
        width: '100%',
        height: '100%',
    },  
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    login: {
        backgroundColor: 'rgba(221,134,0,1)',
        width: 150,
        paddingVertical: 15,
        alignItems: 'center',
    },
    signup: {
        backgroundColor: 'white',
        width: 150,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 40
    },
    logo: {
        height: 100, 
        width: "100%", 
        marginTop: 20
    },
    description: {
        marginTop: 40,
        color: 'white',
        marginBottom: 20,
    }
});

export default LogInScreen;