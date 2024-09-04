FROM python:alpine as fastapi

WORKDIR /app/api

RUN python -m venv .venv
RUN source .venv/bin/activate

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

COPY ./api/ ./
COPY ./.env /app/.env

CMD ["python3", "-m", "uvicorn", "index:app", "--reload", "--host", "0.0.0.0" ]


FROM node:alpine as nextjs

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./next.config.js ./
COPY ./.eslintrc.json ./
COPY ./postcss.config.js ./
COPY ./tailwind.config.js ./
COPY ./tsconfig.json ./
COPY ./public/ ./public/
COPY ./app/ ./app/

CMD [ "npm", "run", "next-dev"]
