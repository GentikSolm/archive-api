import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class GamesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        return true
    }
}