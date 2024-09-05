#!/usr/bin/env sh
rm -rf api/alembic/version/*
alembic revision --autogenerate -m "migration of the db"
alembic upgrade head

python3 -m uvicorn index:app --reload --host 0.0.0.0
