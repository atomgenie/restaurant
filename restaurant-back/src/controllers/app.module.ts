import { Module } from "@nestjs/common"
import { FirestoreModule } from "services/firestore/firestore.module"
import { AppController } from "./app.controller"
import { PlatsModule } from "./plats/plats.module"

@Module({
    controllers: [AppController],
    imports: [FirestoreModule, PlatsModule],
})
export class AppModule {}
