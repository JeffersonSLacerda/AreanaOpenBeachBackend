#!/bin/bash

npm install
npx prisma migrate dev > ./logs/logs-prisma.txt 2>&1

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

tail -f /dev/null