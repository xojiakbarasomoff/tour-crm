from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.database import Base

class Tour(Base):
    __tablename__ = "tours"

    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String, nullable=False)
    country    = Column(String, nullable=False)
    days       = Column(Integer, default=1)
    price      = Column(Float, nullable=False)
    seats      = Column(Integer, default=20)
    booked     = Column(Integer, default=0)
    tour_type  = Column(String, default="Tashqi")
    status     = Column(String, default="Faol")
    created_at = Column(DateTime, server_default=func.now())