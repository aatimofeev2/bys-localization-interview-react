from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import os

app = FastAPI(title="BYS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-memory state (no DB for interview simplicity) ---

PRODUCTS = [
    {"id": 1, "name": "Wireless Headphones Pro", "price": 89.99, "stock": 142},
    {"id": 2, "name": "Smart Watch Series 5",    "price": 199.99,"stock": 38},
    {"id": 3, "name": "Portable Speaker Mini",   "price": 49.99, "stock": 215},
    {"id": 4, "name": "USB-C Hub 7-in-1",        "price": 39.99, "stock": 89},
]

STORE_SETTINGS = {
    "store_name": "BYS Store",
    "locale": "en",
    "currency": "USD",
    "timezone": "UTC",
}


# --- Models ---

class StoreSettingsUpdate(BaseModel):
    locale: Optional[str] = None
    currency: Optional[str] = None
    timezone: Optional[str] = None


# --- Routes ---

@app.get("/")
def root():
    return {"service": "BYS API", "version": "1.0.0"}


@app.get("/products")
def get_products():
    return {"products": PRODUCTS, "total": len(PRODUCTS)}


@app.get("/products/{product_id}")
def get_product(product_id: int):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.get("/store/settings")
def get_settings():
    return STORE_SETTINGS


@app.patch("/store/settings")
def update_settings(update: StoreSettingsUpdate):
    if update.locale:
        STORE_SETTINGS["locale"] = update.locale
    if update.currency:
        STORE_SETTINGS["currency"] = update.currency
    if update.timezone:
        STORE_SETTINGS["timezone"] = update.timezone
    return STORE_SETTINGS


@app.get("/store/stats")
def get_stats():
    return {
        "total_products": len(PRODUCTS),
        "total_orders": 1247,
        "revenue_today": 3892.50,
        "active_users": 89,
    }
