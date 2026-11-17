"""Secure-by-default API foundation. No database credentials or live financial routes yet."""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="OneLedger API", version="1.0.0-alpha.1", docs_url=None, redoc_url=None)
allowed = os.environ.get("ONELEDGER_ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed if origin.strip()],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["Content-Type"],
)

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "oneledger-api", "mode": "scaffold-only"}

@app.get("/api/v1/status")
def status() -> dict[str, str | bool]:
    return {"version": "1.0.0-alpha.1", "database_connected": False, "posting_enabled": False}
