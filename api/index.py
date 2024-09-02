from fastapi import FastAPI

app = FastAPI()


@app.get("/api/python")
def hello_world():
    return [{"id": 1, "title": "Hello World"},
            {"id": 2, "title": "Hello azeWorld"}]
