import { Injectable } from "@nestjs/common"
import { DBModel } from "models/helpers"
import { PlatModel } from "models/plat/plat"
import { Updatable } from "models/updatable"
import { PlatRepository } from "./plats.repository"

@Injectable()
export class PlatService {
    constructor(private repo: PlatRepository) {}

    public async add(plat: DBModel<PlatModel>): Promise<string> {
        return this.repo.add(plat)
    }

    public async get(id: string): Promise<PlatModel | undefined> {
        return this.repo.getId(id)
    }

    public async list(): Promise<PlatModel[]> {
        return this.repo.list()
    }

    public async update(plat: Updatable<PlatModel>): Promise<boolean> {
        return this.repo.update(plat)
    }
}
