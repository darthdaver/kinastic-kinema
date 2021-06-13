import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import AuthConstants from '../../constants/auth';
import StorageConstants from '../../constants/storage';
import Storage from '../../storage/storage';
import { useRootStore } from '../../store/contexts/RootContext';
import logo from '../../../assets/images/kinema_logo.png';

const SplashScreen = observer(() => {
    const { authStore } = useRootStore();

    useEffect(() => {
        Storage.getUser().then(([response,user]) => {
            switch (response) {
                case StorageConstants.SUCCESS_GET_USER:
                    setTimeout(() => {
                        authStore.login(user);
                    }, 3000)
                    break;
                case StorageConstants.FAILED_GET_USER:
                    setTimeout(() => {
                        authStore.setState(AuthConstants.AUTHENTICATION)
                    }, 3000)
                    break;
                case StorageConstants.UNEXPECTED_GET_USER:
                    showMessage({
                        message: "Unexpected Error",
                        description: "Ops... an unexpected problem occurs. Try to close and open the application again",
                        type: "danger"
                    })
                    break;
                default:
                    break;
            }
        })
    }, [])

    return (
        <View style={styles.screen}>
            <Image 
                source={logo}
                resizeMode="contain"
                style={{height: 150, width: "100%"}}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SplashScreen;