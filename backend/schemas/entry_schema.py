from typing import Optional, List
from datetime import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel, Field

class EntryCreate(BaseModel):
  date_created: datetime = Field(default_factory=datetime.now)
  emotion: List[dict] | List[str]
  activity: List[dict] | List[str]
  foodDrinks: List[dict] | List[str]
  emoji: str

class EntryUpdate(BaseModel):
  emotion: Optional[str]
  thought: Optional[str]
  observation: Optional[str]
  enmoji: Optional[str]

class EntryOut(BaseModel):
  entry_id: UUID
  date_created: datetime
  emotion: List[dict] | List[str]
  activity: List[dict] | List[str]
  foodDrinks: List[dict] | List[str]
  emoji: str

class MoodOut(BaseModel):
  time_of_day: str
  day_of_the_week: str
  timestamp: datetime
  mood_number: float
  entries_count: int
