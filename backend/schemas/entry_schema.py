from typing import Optional, List
from datetime import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel, Field

class EntryCreate(BaseModel):
  date_created: datetime = Field(default_factory=datetime.now)
  emoji: str
  activity: List[str]
  thought: List[str]
  physical: List[str]

class EntryUpdate(BaseModel):
  emotion: Optional[str]
  thought: Optional[str]
  observation: Optional[str]
  emoji: Optional[str]

class EntryOut(BaseModel):
  entry_id: UUID
  date_created: datetime
  emoji: str
  activity: List[str]
  thought: List[str]
  physical: List[str]

class MoodOut(BaseModel):
  time_of_day: str
  day_of_the_week: str
  timestamp: datetime
  mood_number: float
  entries_count: int
