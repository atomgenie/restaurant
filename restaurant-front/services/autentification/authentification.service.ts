import firebase from "firebase"

import { Laxios } from "services/laxios"
import { Subject } from "rxjs"

enum LOGGED_STATE {
    UNKNOW,
    UNLOGGED,
    LOGGED,
}

class authentificationService {
    private auth: firebase.auth.Auth
    private loggedState: LOGGED_STATE = LOGGED_STATE.UNKNOW
    private loggedRx = new Subject<null | firebase.User>()

    constructor() {
        const auth = firebase.auth()

        if (process.env.NODE_ENV === "development") {
            auth.useEmulator("http://localhost:9099")
        }

        this.auth = auth
        this.handleChangeLogState()

        this.loggedRx.subscribe(user => {
            if (user !== null) {
                this.loggedState = LOGGED_STATE.LOGGED
            } else {
                this.loggedState = LOGGED_STATE.UNLOGGED
            }
        })
    }

    private handleChangeLogState() {
        this.auth.onAuthStateChanged(user => {
            this.loggedRx.next(user)
        })
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

    public async logged(): Promise<boolean> {
        switch (this.loggedState) {
            case LOGGED_STATE.LOGGED:
                return true
            case LOGGED_STATE.UNLOGGED:
                return false
            case LOGGED_STATE.UNKNOW:
                return new Promise<boolean>(res => {
                    const sub = this.loggedRx.subscribe(user => {
                        sub.unsubscribe()
                        res(user !== null)
                    })
                })
        }
    }
}

export const AuthentificationService = new authentificationService()
