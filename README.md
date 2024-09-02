
# Install Front

```sh
npm install
```

# Install Back

```sh
python -m venv .venv
```

# Run Front App

```sh
npm run next-dev
```

# Run Back App

```sh
php artisan migrate
```

## for development

```sh
php artisan serve
```

## for production

```sh
APP_DEBUG=false
```

## docker

```sh
docker compose up --build -d

source .venv/bin/activate
npm run fastapi-dev
```
