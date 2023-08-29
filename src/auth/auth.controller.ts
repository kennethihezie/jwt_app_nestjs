import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin_dto';

@Controller('auth')
export class AuthController {
    constructor(private authSerive: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
       return this.authSerive.signIn(signInDto)
    }
}
