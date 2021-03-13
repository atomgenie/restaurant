import { Injectable } from "@nestjs/common"
import { firestore } from "firebase-admin"
import { FirebaseService } from "services/firebase/firebase.service"

@Injectable()
export class FirestoreService {
    public readonly db: firestore.Firestore

    constructor(firebase: FirebaseService) {
        this.db = firebase.firestore
    }
}
