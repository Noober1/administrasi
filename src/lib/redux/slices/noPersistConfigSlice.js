import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const noPersistConfig = createSlice({
	name: 'noPersistConfig',
	initialState:{
		spinner: {
			showSpinner: false,
			hideOnClick: true,
			methods: {}
		}
	},
	reducers: {
		showSpinner(state,actions) {
			state.spinner.showSpinner = true
			if(actions.payload) {
				state.spinner.hideOnClick = false
			}
		},
		hideSpinner(state,actions) {
			state.spinner.showSpinner = false
			state.spinner.hideOnClick = true
		},
		setSpinnerHideOnClick(state,actions) {
			state.spinner.hideOnClick = actions.payload
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.noPersistConfig,
			};
		},
	},
});

export const {
	showSpinner,
	hideSpinner,
	setSpinnerHideOnClick
} = noPersistConfig.actions

export const selectNoPersistConfig = state => state.noPersistConfig

export default noPersistConfig