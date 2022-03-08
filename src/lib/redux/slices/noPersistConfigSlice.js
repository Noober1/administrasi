import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';

const noPersistConfig = createSlice({
	name: 'noPersistConfig',
	initialState:{
		spinner: {
			showSpinner: false,
			hideOnClick: true,
			methods: {}
		},
		mainSnackbar: {
			open:false,
			message:'No Message',
			severity: 'success',
			position: {
				horizontal: 'left',
				vertical:'top'
			}
		},
		dialogsOpen: {
			findInvoiceDialog: false,
		},
		profile:{}
	},
	reducers: {
		showSpinner(state,actions) {
			state.spinner.showSpinner = true
			if(actions.payload) {
				state.spinner.hideOnClick = false
			}
		},
		setDialogOpen(state,actions) {
			state.dialogsOpen[actions.payload.dialogName] = actions.payload.open
		},
		hideSpinner(state) {
			state.spinner.showSpinner = false
			state.spinner.hideOnClick = true
		},
		setSpinnerHideOnClick(state,actions) {
			state.spinner.hideOnClick = actions.payload
		},
		setProfile(state,actions) {
			state.profile = actions.payload
		},
		setSnackbarOpen(state,actions) {
			state.mainSnackbar.open = actions.payload
		},
		setSnackbarMessage(state,actions) {
			state.mainSnackbar.message = actions.payload
		},
		setSnackbarSeverity(state,actions) {
			state.mainSnackbar.severity = actions.payload
		},
		openSnackbar(state, actions) {
			const { message, severity, position } = actions.payload
			const getPosition = position || 'top-center'
			const splitPosition = getPosition.split('-')
			if (splitPosition.length == 2) {
				let verticals = ['top','bottom']
				let horizontals = ['left','right','center']
				let newVertical = verticals.includes(splitPosition[0]) ? splitPosition[0] : 'top'
				let newHorizontal = horizontals.includes(splitPosition[1]) ? splitPosition[1] : 'center'
				state.mainSnackbar.position = {
					vertical: newVertical,
					horizontal: newHorizontal
				}
			}
			state.mainSnackbar.message = message || 'No Message'
			state.mainSnackbar.severity = severity || 'info'
			state.mainSnackbar.open = true
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
	setSpinnerHideOnClick,
	setSnackbarOpen,
	setSnackbarSeverity,
	setSnackbarMessage,
	openSnackbar,
	setProfile,
	setDialogOpen
} = noPersistConfig.actions

export const selectNoPersistConfig = state => state.noPersistConfig

export default noPersistConfig