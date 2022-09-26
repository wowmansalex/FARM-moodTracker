from typing import List
from uuid import UUID

import httpx
import asyncio

from models.user_model import User
from models.entry_model import Entry, Mood

from schemas.user_schema import UserAuth, UserOut
from schemas.entry_schema import EntryCreate, EntryUpdate, EntryOut, MoodOut

class EntryService:
  @staticmethod
  async def get_current_mood(user: User):
    pass

  @staticmethod
  async def list_entries(user: User) -> List[EntryOut]:
    entries = await Entry.find(Entry.user.id == user.id).sort('date_created').to_list()
    return entries

  @staticmethod
  async def create_entry(user:User, data: EntryCreate) -> EntryOut:
    entry = Entry(**data.dict(), user=user)
    return await entry.insert()

  @staticmethod
  async def get_entry(entry_id: UUID, user: User):
    entry = await Entry.find_one(Entry.entry_id == entry_id, Entry.user_id == user.user_id)
    return entry

  @staticmethod 
  async def update_entry(entry_id: UUID, user: User):
    entry = await AssetService.get_entry(entry_id, user)
    await entry.update({"$set": data.dict(exclude_unset=True)})

    await entry.save()

    return entry

  @staticmethod
  async def delete_entry(asset_id: UUID, user: User) -> None:
    entry = await AssetService.get_asset(user, entry_id)
    print(entry)
    if entry:
      await entry.delete()

    return None 