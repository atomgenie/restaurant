import { Injectable } from "@nestjs/common"
import { initializeApp, firestore } from "firebase-admin"

@Injectable()
export class FirebaseService {
    constructor() {
        initializeApp()
    }

    private _firestore: firestore.Firestore | undefined = undefined

    public get firestore(): firestore.Firestore {
        if (!this._firestore) {
            this._firestore = firestore()
        }
        return this._firestore
    }
}
