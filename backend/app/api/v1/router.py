from fastapi import APIRouter
from app.api.v1.endpoints import auth, clients, tours, orders, payments, dashboard

api_router = APIRouter()

api_router.include_router(auth.router,      prefix="/auth",      tags=["Auth"])
api_router.include_router(clients.router,   prefix="/clients",   tags=["Clients"])
api_router.include_router(tours.router,     prefix="/tours",     tags=["Tours"])
api_router.include_router(orders.router,    prefix="/orders",    tags=["Orders"])
api_router.include_router(payments.router,  prefix="/payments",  tags=["Payments"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])