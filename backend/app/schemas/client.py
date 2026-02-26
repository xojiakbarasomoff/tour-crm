from pydantic import BaseModel
from typing import Optional

class ClientCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    passport: Optional[str] = None

class ClientUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    passport: Optional[str] = None
    status: Optional[str] = None

class ClientOut(BaseModel):
    id: int
    name: str
    phone: str
    email: Optional[str]
    passport: Optional[str]
    status: str

    class Config:
        from_attributes = True