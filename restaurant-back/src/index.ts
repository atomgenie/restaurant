import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"
import { ServerModule } from "./server.module"

const bootstrap = async () => {
    const server = await NestFactory.create<NestFastifyApplication>(
        ServerModule,
        new FastifyAdapter(),
    )

    server.enableCors()
    await server.listen(8000, "0.0.0.0")
}

bootstrap()
