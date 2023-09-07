import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin_dto';
import { AuthGuard } from './auth.guard';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authSerive: AuthService){}

    @Public()
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
       return this.authSerive.signIn(signInDto)
    }

    // @UseGuards(AuthGuard)
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
