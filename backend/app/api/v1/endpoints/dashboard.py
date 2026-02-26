from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.client import Client
from app.models.tour import Tour
from app.models.order import Order
from app.models.payment import Payment

router = APIRouter()

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_clients  = db.query(Client).count()
    total_tours    = db.query(Tour).count()
    total_orders   = db.query(Order).count()
    total_paid     = db.query(Payment).with_entities(
        __import__('sqlalchemy').func.sum(Payment.paid)
    ).scalar() or 0

    return {
        "clients": total_clients,
        "tours":   total_tours,
        "orders":  total_orders,
        "revenue": total_paid,
    }