FROM node:20-slim

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

USER node 

WORKDIR /home/node/api

COPY package.json ./
COPY pnpm-lock.yaml ./


EXPOSE 3000

CMD [ "/home/node/api/.docker/start.sh" ]