# crud.py
from sqlalchemy.orm import Session
from sqlalchemy import func, text
from models import Recipe
from typing import List, Optional, Dict, Any
import re

def get_recipes(db: Session, page: int = 1, limit: int = 10, sort_desc: bool = True):
    offset = (page - 1) * limit
    q = db.query(Recipe)
    if sort_desc:
        q = q.order_by(Recipe.rating.desc().nulls_last())
    else:
        q = q.order_by(Recipe.rating.asc().nulls_last())
    total = q.count()
    rows = q.offset(offset).limit(limit).all()
    return total, rows

def search_recipes(db: Session,
                   title: Optional[str] = None,
                   cuisine: Optional[str] = None,
                   rating_filter: Optional[str] = None,
                   calories_filter: Optional[str] = None,
                   total_time_filter: Optional[str] = None):
    q = db.query(Recipe)
    # title partial match
    if title:
        q = q.filter(Recipe.title.ilike(f"%{title}%"))
    if cuisine:
        q = q.filter(Recipe.cuisine == cuisine)
    # rating_filter example: ">=4.5" or "<=3.0" or "=4"
    if rating_filter:
        op, val = _parse_op_value(rating_filter)
        if op and val is not None:
            q = q.filter(text(f"rating {op} :val")).params(val=val)
    # total_time_filter same parsing
    if total_time_filter:
        op, val = _parse_op_value(total_time_filter)
        if op and val is not None:
            q = q.filter(text(f"total_time {op} :val")).params(val=val)
    # calories stored inside JSONB nutrients -> calories like "389 kcal"
    if calories_filter:
        # user might pass "<=400" etc
        op, val = _parse_op_value(calories_filter)
        if op and val is not None:
            # extract digits from nutrients->>'calories' and cast to integer
            q = q.filter(text(f"(substring((nutrients->>'calories') from '([0-9]+)')::int) {op} :val")).params(val=int(val))
    rows = q.all()
    return rows

def _parse_op_value(s: str):
    # accept forms like ">=4.5", "<=400", "=5", ">3"
    m = re.match(r'^\s*(>=|<=|=|>|<)\s*([0-9]+(?:\.[0-9]+)?)\s*$', s)
    if m:
        return m.group(1), float(m.group(2))
    return None, None
