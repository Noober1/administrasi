import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const configSlice = createSlice({
	name: 'config',
	initialState:{
		language: 'id',
		theme: 'light',
		panelOpen: true
	},
	reducers: {
		setLanguage(state, action) {
			state.language = action.payload
		},
		toggleIDENLang(state) {
			state.language = state.language == 'en' ? 'id' : 'en'
		},
		toggleDarkMode(state) {
			state.theme = state.theme === 'light' ? 'dark' : 'light'
		},
		togglePanelOpen(state) {
			state.panelOpen = !state.panelOpen
		}
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			// console.log('HYDRATE', state, action.payload);
			return {
				...state,
				...action.payload.config,
			};
		},
	},
});

export const { setLanguage, toggleDarkMode, toggleIDENLang, togglePanelOpen } = configSlice.actions

export const selectConfig = state => state.config

export default configSlice