import { IconButton, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import Tooltip from './tooltip'
import useLocalization from '../../lib/useLocalization'
import { useDispatch } from 'react-redux'
import { setDialog } from '../../lib/redux/slices/noPersistConfigSlice'

const ButtonFindInvoiceDialog = () => {
	const dispatch = useDispatch()
	const handleOpenInvoiceDialog = () => {
		dispatch(setDialog({
			name:'findInvoiceDialog',
			open:true
		}))
	}
	const { findInvoiceButtonText } = useLocalization()
	return (
		<Tooltip title={<Typography>{findInvoiceButtonText}</Typography>}>
			<IconButton color="inherit" onClick={handleOpenInvoiceDialog}>
				<SearchIcon/>
			</IconButton>
		</Tooltip>
	)
}

export default ButtonFindInvoiceDialog