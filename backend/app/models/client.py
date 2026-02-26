from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.database import Base

class Client(Base):
    __tablename__ = "clients"

    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String, nullable=False)
    phone      = Column(String, nullable=False)
    email      = Column(String, nullable=True)
    passport   = Column(String, nullable=True)
    status     = Column(String, default="Faol")
    created_at = Column(DateTime, server_default=func.now())