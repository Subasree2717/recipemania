# main.py
from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import crud, models, schemas
from fastapi.middleware.cors import CORSMiddleware
from schemas import RecipeOut



models.Base.metadata.create_all(bind=engine)
app = FastAPI(title="Recipes API")

# allow CORS (for local frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/recipes")
def list_recipes(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    total, rows = crud.get_recipes(db, page=page, limit=limit)

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": [RecipeOut.model_validate(r) for r in rows]
    }


@app.get("/api/recipes/search", response_model=dict)
def search_recipes(
    calories: str = Query(None, description="e.g. <=400"),
    title: str = Query(None),
    cuisine: str = Query(None),
    total_time: str = Query(None, description="e.g. >=60"),
    rating: str = Query(None, description="e.g. >=4.5"),
    db: Session = Depends(get_db)
):
    # crud.search_recipes returns list of Recipe objects
    rows = crud.search_recipes(db, title=title, cuisine=cuisine,
                               rating_filter=rating,
                               calories_filter=calories,
                               total_time_filter=total_time)
    return {
    "data": [RecipeOut.model_validate(r) for r in rows]
}

