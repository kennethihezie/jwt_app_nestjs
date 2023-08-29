import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin_dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}

    async signIn(signInDto: SignInDto): Promise<any> {
        const {username, pass} = signInDto

        const user = await this.userService.findOne(username)
        console.log(user);
        console.log(pass);
        
        
        if(user?.password !== pass){
            throw new UnauthorizedException()
        }

        // Generate a JWT and return it here
        // Note: we choose a property name of sub to 
        // hold our userId value to be consistent with JWT standards. 
        const payload = { sub: user.userId, username: username }
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
    }
}
