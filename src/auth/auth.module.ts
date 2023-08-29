import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  //Used to import exported modules
  imports: [UsersModule, JwtModule.register({
    // We're registering the JwtModule as global to make things 
    // easier for us. This means that we don't need to import
    // the JwtModule anywhere else in our application.
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' }
  })]
})
export class AuthModule {}
