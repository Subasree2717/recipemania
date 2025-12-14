from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any

class RecipeBase(BaseModel):
    cuisine: Optional[str]
    title: Optional[str]
    rating: Optional[float]
    prep_time: Optional[int]
    cook_time: Optional[int]
    total_time: Optional[int]
    description: Optional[str]
    nutrients: Optional[Dict[str, Any]]
    serves: Optional[str]

class RecipeOut(RecipeBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
