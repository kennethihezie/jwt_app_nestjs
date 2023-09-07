import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { jwtConstants } from "./utils/constants";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./decorator/public.decorator";

//we need the AuthGuard to return true when the
//"isPublic" metadata is found. For this, we'll use the Reflector class. 

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if(isPublic){
            // 💡 See this condition
            return true
        }


        const request = context.switchToHttp().getRequest()
        const token  = this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token)            
             // 💡 We're assigning the payload to the request object here
             // so that we can access it in our route handlers
            request['user'] = payload
        } catch {
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {        
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}

/*
If the vast majority of your endpoints should be protected by default, 
you can register the authentication guard as a global guard and instead
of using @UseGuards() decorator on top of each controller, 
you could simply flag which routes should be public.

First, register the AuthGuard as a global guard using the 
following construction (in any module, for example, in the AuthModule):
*/