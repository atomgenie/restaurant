import { Module } from "@nestjs/common"
import { AppModule } from "./controllers/app.module"

@Module({
    imports: [AppModule],
})
export class ServerModule {}
