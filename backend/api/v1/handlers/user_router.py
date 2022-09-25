from uuid import UUID

from fastapi import APIRouter, HTTPException, status, Depends, File, UploadFile
import pymongo

from models.user_model import User

from schemas.user_schema import UserAuth, UserUpdate, UserOut, UserCreate

from services.user_service import UserService

from api.dependencies.user_dependencies import get_current_user

user_router = APIRouter()

@user_router.post('/create', summary="Create new user", response_model=UserOut)
async def create_user(data: UserCreate):
  try:
    return await UserService.create_user(data)
  except pymongo.errors.DuplicateKeyError:
    HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="User already exists")

@user_router.get('/me', summary="Get user details", response_model=UserOut)
async def get_user_details(user: User = Depends(get_current_user)):
  return await UserService.get_user_by_id(user.user_id)

@user_router.put('/me', summary="Update user details", response_model=UserOut)
async def update_userdetails(data: UserUpdate, user: User = Depends(get_current_user)):
  return await UserService.update_userdetails(data, user)

@user_router.post('/upload', summary="Upload profile picture")
async def upload_profilepicture(file: UploadFile = File(...), user: User = Depends(get_current_user)):
  
  return await UserService.upload_profilepicture(user, file);