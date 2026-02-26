from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.tour import Tour
from app.schemas.tour import TourCreate, TourUpdate, TourOut

router = APIRouter()

@router.get("/", response_model=List[TourOut])
def get_tours(db: Session = Depends(get_db)):
    return db.query(Tour).all()

@router.post("/", response_model=TourOut)
def create_tour(data: TourCreate, db: Session = Depends(get_db)):
    tour = Tour(**data.model_dump())
    db.add(tour)
    db.commit()
    db.refresh(tour)
    return tour

@router.put("/{tour_id}", response_model=TourOut)
def update_tour(tour_id: int, data: TourUpdate, db: Session = Depends(get_db)):
    tour = db.query(Tour).filter(Tour.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tur topilmadi")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(tour, key, value)
    db.commit()
    db.refresh(tour)
    return tour

@router.delete("/{tour_id}")
def delete_tour(tour_id: int, db: Session = Depends(get_db)):
    tour = db.query(Tour).filter(Tour.id == tour_id).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tur topilmadi")
    db.delete(tour)
    db.commit()
    return {"message": "O'chirildi"}