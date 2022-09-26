import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../constants/api';
import jwt_decode from 'jwt-decode';

import { REGISTER, LOGIN, UPLOAD, ME } from '../../constants/endpoints';

const access_token = localStorage.getItem('access token');

const config = {
	headers: {
		Authorization: `Bearer ${access_token}`,
	},
};

export const registerUser = createAsyncThunk(
	'users/signupUser',
	async ({ username, email, password }, thunkAPI) => {
		try {
			let user = {
				username: username,
				email: email,
				password: password,
			};

			console.log(user);

			const response = await api.post(REGISTER, user);

			let data = await response.json();

			console.log(data);

			if (response.status_code === 200) {
				localStorage.setItem('access token', data.access_token);
				return { ...data, username: email, password: password };
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.log('Error:' + e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const loginUser = createAsyncThunk(
	'users/loginUser',
	async ({ username, password }, thunkAPI) => {
		try {
			const user = new FormData();
			user.append('username', username);
			user.append('password', password);
			const response = await api.post(LOGIN, user);

			if (response.status == 200) {
				localStorage.setItem('access token', response.data.access_token);
				return response.data;
			} else {
				return thunkAPI.rejectWithValue(response.data);
			}
		} catch (e) {
			console.log('Error:' + e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const getUserDetails = createAsyncThunk(
	'users/getUserDetails',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get(ME, config);
			localStorage.setItem('user_details', JSON.stringify(response.data));
			return response.data;
		} catch (e) {
			console.log('Error:' + e.response.data);
			rejectWithValue(e.response.data);
		}
	}
);

export const updateUserDetails = createAsyncThunk(
	'users/updateUserDetails',
	async (formInput, { rejectWithValue }) => {
		try {
			const response = await api.put(ME, formInput, config);
			return response.data;
		} catch (e) {
			console.log('Error:' + e.response.data);
			return rejectWithValue(e.response.data);
		}
	}
);

export const uploadProfilePicture = createAsyncThunk(
	'users/uploadProfilePicture',
	async (fileSelected, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'multipart/form-data',
				},
			};

			const form = new FormData();

			form.append('file', fileSelected);

			const response = await api.post(UPLOAD, form, config);
			return response.data;
		} catch (error) {
			console.log('Error:' + error.response.data);
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	isAuthenticated: false,
	tokenIsValid: false,
	isSuccess: false,
	isError: false,
	isFetching: false,
	user_id: '',
	username: '',
	profile_picture: '',
	message: null,
	errorMessage: null,
};

export const authSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		logout: state => {
			localStorage.removeItem('access token');
			localStorage.removeItem('user_details');
			localStorage.removeItem('entries');
			state.message = null;
			state.isFetching = false;
			state.isAuthenticated = false;
			state.user_id = null;
			state.username = null;
			state.errorMessage = null;
		},
		clearState: state => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;

			return state;
		},
	},
	extraReducers: {
		[registerUser.pending]: state => {
			state.isFetching = true;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			console.log('payload', payload);
			state.isFetching = false;
			state.isSuccess = true;
			state.user_id = payload;
			state.username = payload;
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload;
		},
		[loginUser.pending]: state => {
			state.message = null;
			state.isFetching = true;
			state.error = null;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.isSuccess = true;
			state.message = 'Logged in successfully';
			state.isAuthenticated = true;
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.errorMessage = payload;
		},
		[getUserDetails.pending]: state => {
			state.isFetching = true;
		},
		[getUserDetails.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.isSuccess = true;
			state.userDetails = payload;
			if (state.userDetails.name == null) {
				state.errorMessage = 'We need extra info to get started.';
			}
		},
		[getUserDetails.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.errorMessage = payload;
		},
		[updateUserDetails.pending]: state => {
			state.isFetching = true;
		},
		[updateUserDetails.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.isSuccess = true;
			state.message = 'User details updated successfully';
		},
		[updateUserDetails.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.errorMessage = payload;
		},
		[uploadProfilePicture.pending]: (state, { payload }) => {
			state.isFetching = true;
		},
		[uploadProfilePicture.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.isSuccess = true;
			console.log('Profile picture uploaded successfully');
		},
		[uploadProfilePicture.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.error = payload;
		},
	},
});

export default authSlice.reducer;
export const { clearState, logout, checkToken } = authSlice.actions;
