from fastapi import APIRouter

from api.v1.handlers.user_router import user_router
from api.auth.jwt import auth_router
from api.v1.handlers.entry_router import entry_router

router = APIRouter()

router.include_router(auth_router, prefix='/auth', tags=['Authentication'])
router.include_router(user_router, prefix='/user', tags=['User'])
router.include_router(entry_router, prefix='/entry', tags=['Entries'])
