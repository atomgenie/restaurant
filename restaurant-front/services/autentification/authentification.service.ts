import firebase from "firebase"

import { Laxios } from "services/laxios"

export class AuthentificationService {
    private auth: firebase.auth.Auth

    constructor() {
        const auth = firebase.auth()

        if (process.env.NODE_ENV === "development") {
            auth.useEmulator("http://localhost:9099")
        }

        this.auth = auth
    }

    public async register(mail: string, password: string) {
        const user = await this.auth.createUserWithEmailAndPassword(mail, password)
        if (!user.user) {
            throw Error("Can't register")
        }

        Laxios.setToken(await user.user.getIdToken())
    }

    public async login(mail: string, password: string) {
        const user = await this.auth.signInWithEmailAndPassword(mail, password)
        if (!user.user) {
            throw Error("Can't register")
        }

        Laxios.setToken(await user.user.getIdToken())
    }
}
