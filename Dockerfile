FROM python:alpine3.20 as fastapi

WORKDIR /app/api

RUN python -m venv .venv
RUN source .venv/bin/activate

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

COPY ./api/ ./
COPY ./.env /app/.env
COPY ./run_migration.sh /app/run_migration.sh

CMD ["/app/run_migration.sh"]


FROM node:20-alpine as nextjs

WORKDIR /app

COPY ./package*.json ./

RUN npm ci && npm cache clean --force

COPY ./next.config.js ./
COPY ./.eslintrc.json ./
COPY ./postcss.config.js ./
COPY ./tailwind.config.js ./
COPY ./tsconfig.json ./
COPY ./components.json ./components.json
COPY ./public/ ./public/
COPY ./lib/ ./lib/
COPY ./components/ ./components/
COPY ./app/ ./app/

CMD [ "npm", "run", "next-dev"]
