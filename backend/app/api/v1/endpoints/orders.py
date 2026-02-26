from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate, OrderOut

router = APIRouter()

@router.get("/", response_model=List[OrderOut])
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

@router.post("/", response_model=OrderOut)
def create_order(data: OrderCreate, db: Session = Depends(get_db)):
    order = Order(**data.model_dump())
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.put("/{order_id}", response_model=OrderOut)
def update_order(order_id: int, data: OrderUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Buyurtma topilmadi")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return order

@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Buyurtma topilmadi")
    db.delete(order)
    db.commit()
    return {"message": "O'chirildi"}