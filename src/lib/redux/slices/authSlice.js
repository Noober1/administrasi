import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const authSlice = createSlice({
	name: 'auth',
	initialState:{
		authToken: null
	},
	reducers: {
		setAuthToken(state, action) {
			state.authToken = action.payload
		},
		clearAuthToken(state,action) {
			state.authToken = null
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.auth,
			};
		},
	},
});

export const { setAuthToken, clearAuthToken } = authSlice.actions

export const selectAuth = state => state.auth

export default authSlice