from typing import Optional
from uuid import UUID

import boto3

from fastapi import UploadFile, File

from schemas.user_schema import UserCreate, UserUpdate, UserAuth, UserOut
from models.user_model import User

from core.config import settings
from core.security import get_password, verify_password

class UserService():
  @staticmethod
  async def create_user(user:UserCreate):
    user_in = User(
      email=user.email,
      hashed_password=get_password(user.password),
      name=user.name,
      dob=user.dob,
      gender=user.gender
    )
    await user_in.save()
    return user_in

  @staticmethod
  async def authenticate(email: str, password: str) -> Optional[User]:
    user = await UserService.get_user_by_email(email=email)
    if not user:
      return None
    if not verify_password(password=password, hashed_pass=user.hashed_password):
      return None

    return user

  @staticmethod
  async def get_user_by_email(email: str) -> Optional[User]:
    user = await User.find_one(User.email==email)
    return user

  @staticmethod
  async def get_user_by_id(id: UUID) -> Optional[UserOut]:
    user = await User.find_one(User.user_id==id)
    return user

  @staticmethod
  async def update_userdetails(data: UserUpdate, user: User) -> UserOut:
    user = await UserService.get_user_by_id(user.user_id)
    print(data.dob)
    await user.update({"$set": data.dict(exclude_unset=True)})
    user.save()
    return user

  @staticmethod
  async def upload_profilepicture(user: User, file: UploadFile = File(...)):

    s3_client = boto3.client('s3')
    s3 = boto3.resource('s3')

    bucket = s3.Bucket(settings.BUCKET_NAME)
    bucket.upload_fileobj(file.file, file.filename)


    uploaded_file_url = f"https://{settings.BUCKET_NAME}.s3.amazonaws.com/{file.filename}"

    print(uploaded_file_url)

    user = await UserService.get_user_by_id(user.user_id)
    await user.update({"$set": {'profile_picture': uploaded_file_url}})
    await user.save()
    return user