# test_conn.py
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
print("Using DATABASE_URL:", DATABASE_URL)
engine = create_engine(DATABASE_URL)
try:
    conn = engine.connect()
    print("Connected to Postgres OK")
    conn.close()
except Exception as e:
    print("Connection failed:", e)
