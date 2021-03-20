import { Module } from "@nestjs/common"
import { FirestoreModule } from "services/firestore/firestore.module"
import { PlatRepository } from "./plats.repository"
import { PlatService } from "./plats.service"

@Module({
    providers: [PlatRepository, PlatService],
    exports: [PlatService],
    imports: [FirestoreModule],
})
export class PlatsModule {}
