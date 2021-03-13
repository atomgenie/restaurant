import { Module } from "@nestjs/common"
import { FirebaseModule } from "services/firebase/firebase.module"
import { FirestoreService } from "./firestore.service"

@Module({
    providers: [FirestoreService],
    exports: [FirestoreService],
    imports: [FirebaseModule],
})
export class FirestoreModule {}
