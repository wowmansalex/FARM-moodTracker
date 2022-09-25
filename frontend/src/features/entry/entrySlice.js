import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../../constants/api';

import { ENTRY, MOOD } from '../../constants/endpoints';

const access_token = localStorage.getItem('access token');

const config = {
	headers: {
		Authorization: `Bearer ${access_token}`,
	},
};

export const createEntry = createAsyncThunk(
	'entry/createEntry',
	async (formInput, { rejectWithValue }) => {
		try {
			const response = await api.post(ENTRY + 'create', formInput, config);
			return response.data;
		} catch (error) {
			console.log('Error:' + error.response.data);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getCurrentMood = createAsyncThunk(
	'entry/getCurrentMood',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get(MOOD, config);
			return response.data;
		} catch (error) {
			console.log('Error:' + error.response.data);
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	currentMood: null,
	latestMood: null,
	isFetching: false,
	isSuccess: false,
	errorMessage: null,
	message: null,
};

export const entrySlice = createSlice({
	name: 'entrySlice',
	initialState,
	reducers: {},
	extraReducers: {
		[createEntry.pending]: state => {
			state.isFetching = true;
		},
		[createEntry.fulfilled]: (state, { payload }) => {
			state.isSuccess = true;
			state.latestMood = payload;
			state.message = 'Entry saved successfully';
		},
		[createEntry.rejected]: (state, { payload }) => {
			state.errorMessage = payload;
		},
		[getCurrentMood.pending]: state => {
			state.isFetching = true;
		},
		[getCurrentMood.fulfilled]: (state, { payload }) => {
			state.isFetching = true;
			state.message = 'current mood calculated';
			state.currentMood = payload;
		},
	},
});

export default entrySlice.reducer;
export const {} = entrySlice.actions;
