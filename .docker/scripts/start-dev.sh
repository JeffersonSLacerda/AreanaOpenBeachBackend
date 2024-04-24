#!/bin/bash

npm install
npx prisma migrate dev > ./logs/logs-prisma.txt 2>&1

cp ~/app/areanaopenbeach-zshhistory/.zsh_history ~/

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

tail -f /dev/null