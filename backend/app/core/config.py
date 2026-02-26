from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Tour CRM"
    SECRET_KEY: str = "tour-crm-secret-key-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    DATABASE_URL: str = "sqlite:///./tour_crm.db"

    class Config:
        env_file = ".env"

settings = Settings()