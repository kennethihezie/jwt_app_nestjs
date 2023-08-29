import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  // makes UserService visible outside this module
  exports: [UsersService]
})
export class UsersModule {}
