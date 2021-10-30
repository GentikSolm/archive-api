import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class TagsGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        return true
    }
}