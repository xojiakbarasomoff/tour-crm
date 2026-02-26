from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id         = Column(Integer, primary_key=True, index=True)
    order_id   = Column(Integer, ForeignKey("orders.id"), nullable=False)
    amount     = Column(Float, nullable=False)
    paid       = Column(Float, default=0)
    method     = Column(String, default="Naqd")
    status     = Column(String, default="Qarzdor")
    date       = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())