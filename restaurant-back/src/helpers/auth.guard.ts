import {
    applyDecorators,
    CanActivate,
    ExecutionContext,
    Injectable,
    UseGuards,
} from "@nestjs/common"

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as unknown
        console.log(request)
        return true
    }
}

export const Authentificated = () => applyDecorators(UseGuards(AuthGuard))
