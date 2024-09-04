FROM python:alpine as fastapi

WORKDIR /app

RUN python -m venv .venv
RUN source .venv/bin/activate

COPY ./requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY ./api/ ./api/

CMD ["python3", "-m", "uvicorn", "api.index:app", "--reload", "--host", "0.0.0.0" ]



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
