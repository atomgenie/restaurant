import { Injectable } from "@nestjs/common"
import { FirestoreService } from "services/firestore/firestore.service"
import { DBModel } from "models/helpers"
import { PlatModel } from "models/plat/plat"
import { firestore } from "firebase-admin"
import { Updatable } from "models/updatable"

const collection = "plats"

@Injectable()
export class PlatRepository {
    private db: firestore.Firestore

    constructor(db: FirestoreService) {
        this.db = db.db
    }

    private getCollection(): firestore.CollectionReference<DBModel<PlatModel>> {
        return this.db.collection(collection) as any
    }

    public async add(plat: DBModel<PlatModel>): Promise<string> {
        const ref = await this.getCollection().add(plat)
        return ref.id
    }

    public async getId(id: string): Promise<PlatModel | undefined> {
        const ref = await this.getCollection().doc(id).get()
        const data = await ref.data()

        if (!ref.exists || !data) {
            return undefined
        }

        return {
            ...data,
            id,
        }
    }

    public async list(): Promise<PlatModel[]> {
        const ref = await this.getCollection().get()
        return ref.docs.map(plat => ({ ...plat.data(), id: plat.id }))
    }

    public async delete(id: string): Promise<void> {
        await this.getCollection().doc(id).delete()
    }

    public async update(plat: Updatable<PlatModel>): Promise<boolean> {
        const doc = this.getCollection().doc(plat.id)
        const ref = await doc.get()

        if (!ref.exists) {
            return false
        }

        const updatedFields = plat.changes()
        await doc.update(updatedFields)
        return true
    }
}
