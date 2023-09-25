import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin_dto';
import { AuthGuard } from './auth.guard';
import { Public } from './decorator/public.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(private authSerive: AuthService, private configService: ConfigService){}

    @Public()
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        console.log(process.env.JWT_SECRET_KEY);
        
        return this.authSerive.signIn(signInDto)
    }

    @Get('profile')
    getProfile(@Request() req: any){
       return req.user
    }

    @Public()
    @Get()
    findAll() {
        return [];
    }
}
