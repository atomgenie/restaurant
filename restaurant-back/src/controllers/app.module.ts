import { Module } from "@nestjs/common"
import { FirestoreModule } from "services/firestore/firestore.module"
import { AppController } from "./app.controller"

@Module({
    controllers: [AppController],
    imports: [FirestoreModule],
})
export class AppModule {}
