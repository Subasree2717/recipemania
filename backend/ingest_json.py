# ingest_json.py
import json, math, os
from database import engine, SessionLocal
from models import Base, Recipe
from sqlalchemy.exc import IntegrityError

# create tables
Base.metadata.create_all(bind=engine)

DATA_PATH = os.path.join(os.path.dirname(__file__), "sample_data", "recipes.json")
# If your file is somewhere else, change the path.

def to_number_or_none(x):
    try:
        if x is None: return None
        # handle strings that are "NaN" or numeric strings
        if isinstance(x, str):
            s = x.strip()
            if s.lower() == "nan":
                return None
            # try to parse integers
            if s.isdigit():
                return int(s)
            try:
                f = float(s)
                if math.isnan(f): return None
                return int(f) if f.is_integer() else f
            except:
                return None
        if isinstance(x, (int, float)):
            if isinstance(x, float) and math.isnan(x):
                return None
            return int(x) if isinstance(x, (int, float)) and float(x).is_integer() else x
    except Exception:
        return None

def parse_nutrients(n):
    if not n: return None
    # keep the nutrients map, but strip units if you want numeric calories separately
    return n

def ingest():
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    db = SessionLocal()
    added = 0
    for key, entry in data.items() if isinstance(data, dict) else enumerate(data):
        rec = entry if isinstance(entry, dict) else entry
        try:
            r = Recipe(
                cuisine = rec.get("cuisine") or rec.get("Contient"),
                title = rec.get("title"),
                rating = to_float_or_none(rec.get("rating")),
                prep_time = to_number_or_none(rec.get("prep_time")),
                cook_time = to_number_or_none(rec.get("cook_time")),
                total_time = to_number_or_none(rec.get("total_time")),
                description = rec.get("description"),
                nutrients = parse_nutrients(rec.get("nutrients")),
                serves = rec.get("serves")
            )
            db.add(r)
            db.commit()
            added += 1
        except IntegrityError:
            db.rollback()
        except Exception as e:
            db.rollback()
            print("Failed to add", rec.get("title"), "err:", e)
    db.close()
    print(f"Done. Added {added} recipes.")

def to_float_or_none(x):
    try:
        if x is None:
            return None
        if isinstance(x, str):
            if x.strip().lower() == "nan":
                return None
            return float(x)
        if isinstance(x, (int, float)):
            import math
            if isinstance(x, float) and math.isnan(x):
                return None
            return float(x)
    except:
        return None

if __name__ == "__main__":
    ingest()
