import {
    applyDecorators,
    CanActivate,
    ExecutionContext,
    Injectable,
    UseGuards,
} from "@nestjs/common"

import { auth } from "firebase-admin"

const checkObject = (element: unknown): element is Record<string, unknown> => {
    return typeof element === "object" && element !== null
}

const checkProperty = <O extends Record<string, unknown>, P extends string>(
    element: O,
    property: P,
): element is O & Record<P, unknown> => {
    return property in element
}

const checkObjectProperty = <P extends string>(
    element: unknown,
    property: P,
): element is Record<P, unknown> => {
    return checkObject(element) && checkProperty(element, property)
}

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as unknown
        if (
            !(
                checkObjectProperty(request, "headers") &&
                checkObjectProperty(request.headers, "authorization") &&
                typeof request.headers.authorization === "string" &&
                request.headers.authorization.length > "Bearer ".length
            )
        ) {
            return false
        }

        const token = request.headers.authorization.slice("Bearer ".length)

        let tokenData: unknown
        try {
            tokenData = await auth().verifyIdToken(token)
        } catch {
            return false
        }

        return (
            checkObjectProperty(tokenData, "role") &&
            typeof tokenData.role === "string" &&
            tokenData.role === "admin"
        )
    }
}

export const Authentificated = () => applyDecorators(UseGuards(AuthGuard))
