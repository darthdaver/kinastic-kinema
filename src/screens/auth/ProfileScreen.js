import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, ScrollView, View } from 'react-native';
import StorageConstants from '../../constants/storage';
import { observer } from 'mobx-react';
import { useRootStore } from '../../store/contexts/RootContext';
import Storage from '../../storage/storage';
import { showMessage } from 'react-native-flash-message';
import profileLogo from '../../../assets/images/profile_white_small.png';

const ProfileScreen = observer(() => {
    const { authStore } = useRootStore();
    
    const logout = () => {
        Storage.logout().then((response) => {
            console.log(response)
            switch (response) {
                case StorageConstants.SUCCESS_LOGOUT:
                    showMessage({
                        message: "Au revoir!",
                        description: "Looking forward to see you again soon!",
                        type: 'success'
                    })
                    authStore.logout()
                    break;
                case StorageConstants.UNEXPECTED_LOGOUT:
                    showMessage({
                        message: "Ops..",
                        description: "An error occurred. Logout failed. Retry.",
                        type: 'danger'
                    })
                    break;
                default:
                    break;
            }
        });

    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center'
            }}    
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={profileLogo} 
                    resizeMode="contain"
                    styles={styles.profileLogo}
                />
            </View>
            <Text style={styles.text}>Name: {authStore.name}</Text>
            <Text style={styles.text}>Surname: {authStore.surname}</Text>
            <Text style={styles.text}>Email: {authStore.email}</Text>
            <TouchableOpacity
                title="Logout"
                onPress={logout}
                style={styles.button}
            >
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </ScrollView>
    )
})

const styles = StyleSheet.create({
    imageContainer: {
        marginTop: 50,
        marginBottom: 60
    },
    container: {
        width: "100%",
        backgroundColor: 'black'
    },  
    text: {
        color: 'white',
        margin: 5
    },
    button: {
        backgroundColor: 'rgba(221,134,0,1)',
        width: 150,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 30
    }
});

export default ProfileScreen;