import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageConstants from '../constants/storage';
import api from '../api';

class Storage {
    static signUp = async (user) => {
        try {
            const usersJSON = await AsyncStorage.getItem(StorageConstants.USERS)
            let users = usersJSON != null ? JSON.parse(usersJSON) : {};
            const filteredUser = users[user.email];
            if (filteredUser !== undefined) {
                return StorageConstants.FAILED_SIGNUP_EMAIL_EXIST;
            } else {
                users[user.email] = user;
                const usersJSON = JSON.stringify(users)
                await AsyncStorage.setItem(StorageConstants.USERS, usersJSON)
                return StorageConstants.SUCCESS_SIGNUP;
            }
        } catch (e) {
            return StorageConstants.UNEXPECTED_SIGNUP_ERROR;
        }
    }
    
    static login = async (user) => {
        try {
            const usersJSON = await AsyncStorage.getItem(StorageConstants.USERS)
            const users = usersJSON != null ? JSON.parse(usersJSON) : {};
            
            const filteredUser = users[user.email];

            if (filteredUser === undefined) {
                return [StorageConstants.FAILED_LOGIN_EMAIL_NOT_FOUND, {}];
            } else {
                registeredUser = users[user.email];
                if (user.password === registeredUser.password) {
                    const session = await this.requestSession();
                    if (session.success) {
                        const [response, userUpdated] = await this.setSession(registeredUser, session);
                        if (response === StorageConstants.SUCCESS_SET_SESSION) {
                            return [StorageConstants.SUCCESS_LOGIN, userUpdated];
                        } else {
                            throw new Error('Unexpected error on set session');
                        }
                    } else {
                        throw new Error('Unexpected error on new session request');
                    }
                } else {
                    return [StorageConstants.FAILED_LOGIN_PASSWORD, {}];
                }
            }
        } catch (e) {
            return [StorageConstants.UNEXPECTED_LOGIN_ERROR, {}];
        }
    }

    static logout = async () => {
        try {
            await AsyncStorage.removeItem(StorageConstants.USER_AUTH);
            return StorageConstants.SUCCESS_LOGOUT
        } catch (e) {
            return StorageConstants.UNEXPECTED_LOGOUT
        }
    }
    
    static requestSession = async () => {
        const session = await api.auth.requestSession();
        return session;
    }
    
    static storeUser = async (user) => {
        try {
            const userJSON = JSON.stringify(user)
            await AsyncStorage.setItem(StorageConstants.USER_AUTH, userJSON)
            return StorageConstants.SUCCESS_STORE_USER;
        } catch (e) {
            return StorageConstants.UNEXPECTED_STORE_USER;
        }
    }

    static getUser = async () => {
        try{
            //await AsyncStorage.removeItem(StorageConstants.USER_AUTH)
            const userJSON = await AsyncStorage.getItem(StorageConstants.USER_AUTH)
            if (userJSON == null) {
                return [StorageConstants.FAILED_GET_USER,{}]
            } else {
                user = JSON.parse(userJSON);
                if (!(user.session) || !this.isValidToken(user.session.expiration)) {
                    session = await this.requestSession();
                    const [response, userUpdated] = await this.setSession(user, session);

                    if (response === StorageConstants.SUCCESS_SET_SESSION) {
                        return [StorageConstants.SUCCESS_GET_USER, userUpdated]
                    } else {
                        throw new Error("Unexpected error on request new session.")
                    }
                } else {
                    return [StorageConstants.SUCCESS_GET_USER, user]
                }
            }
        } catch (e) {
            return [StorageConstants.UNEXPECTED_GET_USER,{}]
        }
    }

    static expirationDate = (tokenExpiration) => {
        return new Date(new Date().getTime() + parseInt(tokenExpiration) * 1000)
    }

    static isValidToken = (tokenExpiration) => {
        const currentTime = new Date();
        const tokenExpirationDate = this.expirationDate(tokenExpiration);
        return tokenExpirationDate > currentTime
    }

    static setSession = async (userData,session) => {
        let user = {
            ...userData,
            session: {
                token: session.guest_session_id,
                expiration: session.expires_at
            }
        }

        const response = await this.storeUser(userData);

        console.log(response)

        if (response === StorageConstants.SUCCESS_STORE_USER) {
            return [StorageConstants.SUCCESS_SET_SESSION, user];
        } else {
            return [StorageConstants.UNEXPECTED_SET_SESSION, {}]
        }
        
    }
}

export default Storage;