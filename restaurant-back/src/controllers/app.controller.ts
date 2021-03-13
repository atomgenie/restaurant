import { Controller, Get } from "@nestjs/common"
import { Authentificated } from "helpers/auth.guard"
import { FirestoreService } from "services/firestore/firestore.service"

@Controller("app")
@Authentificated()
export class AppController {
    constructor(private firestore: FirestoreService) {}

    @Get("healthcheck")
    public healthcheck(): string {
        return "OK"
    }
}
