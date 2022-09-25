from typing import List
from uuid import UUID

from fastapi import APIRouter, HTTPException, status, Depends
import pymongo

from models.user_model import User
from models.entry_model import Entry, Mood

from schemas.entry_schema import EntryCreate, EntryUpdate, EntryOut

from services.entry_service import EntryService

from api.dependencies.user_dependencies import get_current_user

entry_router = APIRouter()

@entry_router.get('/current_mood', summary='Calcualted mood')
async def get_current_mood(user: User = Depends(get_current_user)):
  return await EntryService.get_current_mood(user)

@entry_router.get('/list', summary="list of entires", response_model=List[EntryOut])
async def list_entries(user: User = Depends(get_current_user)):
  return await EntryService.list_entries(user)

@entry_router.post('/create', summary="create a new entry", response_model=EntryOut)
async def create_entry(data: EntryCreate, user: User = Depends(get_current_user)):
  return await EntryService.create_entry(user, data)

@entry_router.get('/{entry_id}', summary="get entry by entry_id", response_model=EntryOut)
async def get_entry(entry_id: UUID, user: User = Depends(get_current_user)):
  return await EntryService.get_entry(entry_id, user)

@entry_router.put('/update/{entry_id}', summary="update entry by entry_id", response_model=EntryUpdate)
async def update_entry(entry_id: UUID, data: EntryUpdate, user: User = Depends(get_current_user)):
  return await EntryService.update_entry(entry_id, data, user)

@entry_router.delete('/delete/{entry_id}', summary="delete entry by entry_id")
async def delete_entry(entry_id: UUID, user: User = Depends(get_current_user)):
  return await EntryService.delete_entry(entry_id, user)