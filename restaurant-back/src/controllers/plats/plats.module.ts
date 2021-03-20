import { Module } from "@nestjs/common"
import { PlatsController } from "./plats.controller"
import { PlatsModule as PlatsModuleService } from "services/plats/plats.module"

@Module({
    controllers: [PlatsController],
    imports: [PlatsModuleService],
})
export class PlatsModule {}
