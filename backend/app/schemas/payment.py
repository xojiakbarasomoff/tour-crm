from pydantic import BaseModel
from typing import Optional

class PaymentCreate(BaseModel):
    order_id: int
    amount: float
    paid: float = 0
    method: str = "Naqd"
    date: Optional[str] = None

class PaymentUpdate(BaseModel):
    paid: Optional[float] = None
    method: Optional[str] = None

class PaymentOut(BaseModel):
    id: int
    order_id: int
    amount: float
    paid: float
    method: str
    status: str
    date: Optional[str]

    class Config:
        from_attributes = True