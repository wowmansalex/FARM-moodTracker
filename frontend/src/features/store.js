import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import entryReducer from './entry/entrySlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		entries: entryReducer,
	},
});
