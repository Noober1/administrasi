import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
// import AuthService from '../../auth/authService';

// const auth = new AuthService()

const authSlice = createSlice({
	name: 'auth',
	initialState:{
		authToken: null
	},
	reducers: {
		setAuthToken(state, action) {
			state.authToken = action.payload
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

export const { setAuthToken, login } = authSlice.actions

export const selectAuth = state => state.auth

export default authSlice