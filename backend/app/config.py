import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Application configuration
    """
    app_name: str = "Moodify API"
    debug: bool = True
    frontend_url: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"

settings = Settings()