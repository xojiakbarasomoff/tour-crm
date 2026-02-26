from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base

class Order(Base):
    __tablename__ = "orders"

    id         = Column(Integer, primary_key=True, index=True)
    client_id  = Column(Integer, ForeignKey("clients.id"), nullable=False)
    tour_id    = Column(Integer, ForeignKey("tours.id"), nullable=False)
    people     = Column(Integer, default=1)
    total      = Column(Float, nullable=False)
    status     = Column(String, default="Kutilmoqda")
    date       = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())