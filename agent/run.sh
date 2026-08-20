#!/bin/sh
cd /app
export PYTHONPATH=/app:$PYTHONPATH
exec python agent_survival.py
