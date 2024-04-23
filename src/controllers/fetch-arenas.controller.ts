import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Arena } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/arenas')
export class FetchArenasController {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async handle(): Promise<Arena[]> {
    return this.prisma.arena.findMany()
  }
}
