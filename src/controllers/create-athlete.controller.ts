import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/athletes')
@UseGuards(AuthGuard('jwt'))
export class CreateAthleteController {
  constructor() { }

  @Post()
  async handle() {
    return 'ok'
  }
}
