from pydantic import BaseModel
from typing import Optional

class OrderCreate(BaseModel):
    client_id: int
    tour_id: int
    people: int = 1
    total: float
    date: Optional[str] = None

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    people: Optional[int] = None
    total: Optional[float] = None

class OrderOut(BaseModel):
    id: int
    client_id: int
    tour_id: int
    people: int
    total: float
    status: str
    date: Optional[str]

    class Config:
        from_attributes = True