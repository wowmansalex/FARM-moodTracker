from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from api.v1 import general_router

from core.config import settings

from models.entry_model import Entry
from models.user_model import User

app = FastAPI(
  title=settings.PROJECT_NAME,
  swagger_ui_parameters={"defaultModelsExpandDepth": -1},
  openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def app_init():

  db_client = AsyncIOMotorClient(settings.MONGODB_URI).coloredbrain

  await init_beanie(
    database=db_client,
    document_models=[
      User,
      Entry
    ]
  )

app.include_router(general_router.router, prefix=settings.API_V1_STR)