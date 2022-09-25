from typing import Optional
from datetime import datetime, date
from uuid import UUID, uuid4

from fastapi import UploadFile

from pydantic import BaseModel, EmailStr, Field, validator

class Gender(str):
  male = 'male'
  female = 'female'
  other = 'other'
  not_given = 'not_given'

class UserCreate(BaseModel):
  email: EmailStr
  name: Optional[str] 
  dob: Optional[str]
  gender: Optional[str]
  password: str

class UserUpdate(BaseModel):
  name: str
  dob: datetime | str
  gender: str
  password: Optional[str]

  @validator("dob", pre=True)
  def format_dob(cls, dob):
    dob.strptime(
            value,
            "%d/%m/%Y"
        ).date()

class UserAuth(BaseModel):
  email: EmailStr = Field(..., description="user email")
  # username: str = Field(...)
  password: str = Field (..., min_length=4, max_length=24, description="user password")

class UserOut(BaseModel):
  user_id: UUID
  email: EmailStr
  name: Optional[str]
  dob: Optional[str] | date
  gender: Optional[str]
  profile_picture: Optional[str]
