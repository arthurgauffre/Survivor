#!/usr/bin/env bash

# Load environment variables from .env file
if [ -f .env ]; then
  source .env
else
  echo ".env file not found!"
  exit 1
fi

# Load environment variables from .env file
if [ -f .venv/bin/activate ]; then
  source .venv/bin/activate
else
  python3 -m venv .venv
fi
pip install -r requirements.txt


# Set PYTHONPATH
export PYTHONPATH=$PYTHONPATH:./api

# Run the tests
python3 -m pytest -vv tests
