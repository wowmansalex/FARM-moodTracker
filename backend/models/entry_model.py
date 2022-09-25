from datetime import datetime
from typing import Optional, List

from beanie import Document, Indexed, Link
from pydantic import Field, EmailStr
from uuid import UUID, uuid4

from models.user_model import User

class Entry(Document):
  date_created: datetime = Field(default_factory=datetime.now)
  entry_id: UUID = Field(default_factory=uuid4)
  user: Link[User]
  emotion: List[dict] | List[str]
  activity: List[dict] | List[str]
  foodDrinks: List[dict] | List[str]
  emoji: str

  def __refr__(self) -> str:
      return f"<User {self.emoji}>"

  def __str__(self) -> str:
    return self.emoji

  def __hash__(self) -> int:
    return hash(self.emoji)

  def __eq__(self, other: object) -> bool:
    if isinstance(other, Entry):
      return self.emoji == other.emoji
    return False

  @property
  def create(self) -> datetime:
    return self.id.generation_time

class Mood(Document):
  angry_count: int
  confused_count: int
  neutral_count: int
  smiling_count: int
  excited_count: int

  def __refr__(self) -> str:
      return f"<User {self.emoji}>"

  def __str__(self) -> str:
    return self.emoji

  def __hash__(self) -> int:
    return hash(self.emoji)

  def __eq__(self, other: object) -> bool:
    if isinstance(other, Entry):
      return self.emoji == other.emoji
    return False

  @property
  def create(self) -> datetime:
    return self.id.generation_time
