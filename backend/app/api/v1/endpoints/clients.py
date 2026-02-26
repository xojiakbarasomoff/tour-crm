from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.client import Client
from app.schemas.client import ClientCreate, ClientUpdate, ClientOut

router = APIRouter()

@router.get("/", response_model=List[ClientOut])
def get_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Client).offset(skip).limit(limit).all()

@router.post("/", response_model=ClientOut)
def create_client(data: ClientCreate, db: Session = Depends(get_db)):
    client = Client(**data.model_dump())
    db.add(client)
    db.commit()
    db.refresh(client)
    return client

@router.put("/{client_id}", response_model=ClientOut)
def update_client(client_id: int, data: ClientUpdate, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Mijoz topilmadi")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(client, key, value)
    db.commit()
    db.refresh(client)
    return client

@router.delete("/{client_id}")
def delete_client(client_id: int, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Mijoz topilmadi")
    db.delete(client)
    db.commit()
    return {"message": "O'chirildi"}