# Survivor

## Docker Automatic Install

```sh
cp .env.example .env
docker compose up --build
```

## Manual Install

```sh
cp .env.example .env
```

1. Install Front

    ```sh
    npm install
    ```

1. Install Back

    ```sh
    python -m venv .venv
    ```

1. Setup Environment

    ```sh
    cp .env.example .env
    ```

1. Run Front App

    ```sh
    npm run next-dev
    ```

1. Run Back App

    ```sh
    source .venv/bin/activate
    npm run fastapi-dev
    ```

## Preview

### Login

![login](./image/login.png)

### Dashboard

![dashboard](./image/dashboard.png)

### Tips

![tips](./image/tips.png)

### Events

Events
![events](./image/events.png)
Maps
![events-map](./image/events-map.png)

### Coach

List
![coaches-list](./image/coaches-list.png)
Profile
![coach-profile](./image/coach-profile.png)

### Customer

List
![customers-list](./image/customers-list.png)
Profile
![customer-profile](./image/customer-profile.png)

### Clothes

![clothes](./image/clothes.png)

### Compatibility

![compatibility](./image/compatibility.png)

### Chat

Selection
![chat](./image/chat.png)

Conversation
![chat-conversation](./image/chat-conversation.png)

### note

Selection
![note](./image/note.png)

Conversation
![note-selection](./image/note-selection.png)
