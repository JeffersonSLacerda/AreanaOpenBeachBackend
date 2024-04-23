import { CreateAthleteDTO } from '@/DTOs/create-athlete.dto'
import { CreateSessionDTO } from '@/DTOs/create-session.dto'
import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql'
import { execSync } from 'child_process'
import { Client } from 'pg'
import request from 'supertest'

let app: INestApplication
let container: StartedPostgreSqlContainer
let prisma: PrismaClient
let urlConnection: string
let client: Client

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    container = await new PostgreSqlContainer().start()

    client = new Client({
      host: container.getHost(),
      port: container.getPort(),
      user: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
    })
    await client.connect()
    process.env.DATABASE_URL = container.getConnectionUri()
    urlConnection = container.getConnectionUri()

    // create a new instance of PrismaClient with the connection string
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: urlConnection,
        },
      },
    })
    // start the nestjs application
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    execSync(`npx prisma migrate reset --force`, {
      env: {
        ...process.env,
        DATABASE_URL: urlConnection,
      },
    })
    execSync(`npx prisma migrate deploy`, {
      env: {
        ...process.env,
        DATABASE_URL: urlConnection,
      },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await client.end()
    await container.stop()
  })

  test('[POST] /sessions', async () => {
    const atheleteData: CreateAthleteDTO = {
      name: 'Jonh Doe',
      email: 'jonh.doe@test.com',
      password: '123456',
    }

    const userResponse = await request(app.getHttpServer())
      .post('/accounts')
      .send(atheleteData)

    expect(userResponse.statusCode).toEqual(201)

    const loginData: CreateSessionDTO = {
      email: userResponse.body.email,
      password: '123456',
    }

    const authenticateReponse = await request(app.getHttpServer())
      .post('/sessions')
      .send(loginData)

    expect(authenticateReponse.statusCode).toEqual(201)
  })
})
