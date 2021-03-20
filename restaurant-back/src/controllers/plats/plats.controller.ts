import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from "@nestjs/common"
import { Authentificated } from "helpers/auth.guard"
import Jsen from "jsen"
import { DBModel } from "models/helpers"
import { PlatModel } from "models/plat/plat"
import { makeUpdateable } from "models/updatable"
import { PlatService } from "services/plats/plats.service"

const jsenPlat = Jsen({
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            required: true,
        },
        tags: {
            type: "array",
            required: true,
            items: {
                type: "string",
            },
        },
    },
    required: ["name", "tags"],
})

@Controller("plats")
export class PlatsController {
    constructor(private platsService: PlatService) {}

    @Authentificated()
    @Post("add")
    public async add(@Body() plat: DBModel<PlatModel>): Promise<string> {
        if (!jsenPlat(plat)) {
            throw new BadRequestException()
        }

        return this.platsService.add(plat)
    }

    @Get("list")
    public async list(): Promise<PlatModel[]> {
        return this.platsService.list()
    }

    @Get("id/:id")
    public async getId(@Param("id") id: unknown): Promise<PlatModel | undefined> {
        if (typeof id !== "string") {
            throw new BadRequestException()
        }

        return this.platsService.get(id)
    }

    // @Authentificated()
    @Post("update-name/:id")
    public async changeName(@Body("name") name: unknown, @Param("id") id: unknown) {
        if (typeof name !== "string" || typeof id !== "string" || id === "") {
            throw new BadRequestException()
        }

        const plat = await this.platsService.get(id)

        if (!plat) {
            throw new NotFoundException()
        }

        const updateablePlat = makeUpdateable(plat)
        updateablePlat.name = name
        await this.platsService.update(updateablePlat)
    }
}
