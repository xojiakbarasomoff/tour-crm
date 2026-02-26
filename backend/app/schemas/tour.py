from pydantic import BaseModel
from typing import Optional

class TourCreate(BaseModel):
    name: str
    country: str
    days: int = 1
    price: float
    seats: int = 20
    tour_type: str = "Tashqi"

class TourUpdate(BaseModel):
    name: Optional[str] = None
    country: Optional[str] = None
    days: Optional[int] = None
    price: Optional[float] = None
    seats: Optional[int] = None
    status: Optional[str] = None

class TourOut(BaseModel):
    id: int
    name: str
    country: str
    days: int
    price: float
    seats: int
    booked: int
    tour_type: str
    status: str

    class Config:
        from_attributes = True