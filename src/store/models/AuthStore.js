import { action, makeObservable, observable } from 'mobx';
import AuthConstants from '../../constants/auth';

class AuthStore {
    name = '';
    surname = '';
    email = '';
    password = '';
    session = null;
    state = AuthConstants.LOADING

    constructor(root) {
        this.root = root
        makeObservable(this, {
            name: observable,
            surname: observable,
            email: observable,
            password: observable,
            session: observable,
            state: observable,
            login: action,
            getUserData: action,
            logout: action,
            setState: action
        })
    }

    getUserData() {
        const userData = {
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            session: this.session
        }
        return userData;
    }

    login(user) {
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.password = user.password;
        this.session = user.session;
        this.state = AuthConstants.AUTHENTICATED;
    }

    logout() {
        this.name = '';
        this.surname = '';
        this.email = '';
        this.password = '';
        this.token = '';
        this.state = AuthConstants.AUTHENTICATION;
    }

    setState(state) {
        this.state = state;
    }
}

export default AuthStore;