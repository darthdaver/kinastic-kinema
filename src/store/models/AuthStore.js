import { makeObservable, observable } from 'mobx';

class AuthStore {
    name = '';
    surname = '';
    token = '';

    constructor(root) {
        this.root = root
        makeObservable(this, {
            name: observable,
            surname: observable,
            token: observable
        })
    }
}

export default AuthStore;