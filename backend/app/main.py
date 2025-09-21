from fastapi import FastAPI
from .api import router
from .db import init_db


app = FastAPI(title='Personalized Study Assistant API')
app.include_router(router, prefix='/api')


@app.on_event('startup')
def on_startup():
 init_db()