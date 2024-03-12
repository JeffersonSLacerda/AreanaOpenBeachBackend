FROM node:21.7

RUN apt update && apt install -y openssl procps

#non root user
USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

#COPY .docker/scripts/start-dev.sh .docker/scripts

#COPY package.json package-lock.json /home/node/app/

CMD [ "tail", "-f", "/dev/null" ]