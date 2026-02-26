from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.payment import Payment
from app.schemas.payment import PaymentCreate, PaymentUpdate, PaymentOut

router = APIRouter()

@router.get("/", response_model=List[PaymentOut])
def get_payments(db: Session = Depends(get_db)):
    return db.query(Payment).all()

@router.post("/", response_model=PaymentOut)
def create_payment(data: PaymentCreate, db: Session = Depends(get_db)):
    d = data.model_dump()
    paid = d.get("paid", 0)
    amount = d.get("amount", 0)
    d["status"] = "To'liq" if paid >= amount else "Qisman" if paid > 0 else "Qarzdor"
    payment = Payment(**d)
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment

@router.put("/{payment_id}", response_model=PaymentOut)
def update_payment(payment_id: int, data: PaymentUpdate, db: Session = Depends(get_db)):
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="To'lov topilmadi")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(payment, key, value)
    payment.status = "To'liq" if payment.paid >= payment.amount else "Qisman" if payment.paid > 0 else "Qarzdor"
    db.commit()
    db.refresh(payment)
    return payment