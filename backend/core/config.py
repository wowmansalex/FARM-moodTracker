from typing import List
from pydantic import BaseSettings, AnyHttpUrl
from decouple import config

class Settings(BaseSettings): 
    API_V1_STR: str = "/api/v1"
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str)
    JWT_REFRESH_SECRET_KEY: str = config("JWT_REFRESH_SECRET_KEY", cast=str)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRATION: int = 15
    REFRESH_TOKEN_EXPIRATION: int = 60 * 24 * 7
    BACKEND_CORS_ORIGINS: str = 'http://localhost:3000'
    MONGODB_URI: str = config("MONGODB_URI", cast=str)
    PROJECT_NAME: str = 'The Colored Brain'
    # AWS_ACCESS_KEY: str = config("AWS_ACCESS_KEY", cast=str)
    # AWS_SECRET_ACCESS_KEY: str = (config("AWS_SECRET_ACCESS_KEY", cast=str))
    BUCKET_NAME: str = config("BUCKET_NAME", cast=str)

    class Config:
        case_sensitive = True
    
settings = Settings()