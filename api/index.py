from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from routes.routes import router

app = FastAPI(docs_url="/swagger-ui.html")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def docs_redirect():
    response = RedirectResponse(url="/swagger-ui.html")
    return response

app.mount("/static/employees", StaticFiles(
    directory="/app/api/images/employees"), name="employees")
app.mount("/static/clothes", StaticFiles(
    directory="/app/api/images/clothes"), name="clothes")


app.include_router(router)
