import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { UserPayload } from 'src/auth/jwt.strategy';

@Controller('/athletes')
@UseGuards(AuthGuard('jwt'))
export class CreateAthleteController {
  constructor() { }

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user)

    return 'ok'
  }
}
