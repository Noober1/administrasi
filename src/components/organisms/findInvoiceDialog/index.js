import React, { forwardRef, useImperativeHandle, useState, use } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, useMediaQuery, DialogTitle, FormControl, FormHelperText, IconButton, InputBase, Paper } from '@mui/material'
import { DraggablePaperComponent, Link, useFocus } from '../../atoms'
import SearchIcon from '@mui/icons-material/Search'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDebounce } from 'react-use'
import { useEffect } from 'react'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import useLocalization from '../../../lib/useLocalization'
import { tableLocalization } from '../../../constants'
import clsx from 'clsx'
import { selectNoPersistConfig, setDialogOpen } from '../../../lib/redux/slices/noPersistConfigSlice'

const FindInvoiceDialog = forwardRef((props, ref) => {
	const {default: defautText, languange, table: {columns: {invoice: invoiceTableText}}, components: {findInvoiceDialog: findInvoiceDialogText}} = useLocalization()
	const [searchInputRef, setFocusToSearchInput] = useFocus()
	const { authToken } = useSelector(selectAuth)
	const { dialogsOpen: { findInvoiceDialog: open } } = useSelector(selectNoPersistConfig)
	const [tempSearchText, settempSearchText] = useState('')
	const [searchText, setsearchText] = useState('')
	const [errorMessage, seterrorMessage] = useState('')
	const localeText = tableLocalization(languange.initial)
	const [isLoading, setisLoading] = useState(false)
	const [searchResult, setsearchResult] = useState([])
	const dispatch = useDispatch()
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
	const toggleDialogOpen = open => dispatch(setDialogOpen({dialogName: 'findInvoiceDialog', open}))
	const closeDialog = () => toggleDialogOpen(false)
	const openDialog = () => {
		toggleDialogOpen(true)
		setFocusToSearchInput()
	}

	const isError = (errorMessage.length > 0)

	useDebounce(() => {
		if (tempSearchText.length > 2) {
			setsearchText(tempSearchText)
		}
	}, 1000,[tempSearchText])

	useEffect(() => {
		if (searchText.length < 3) return
		setisLoading(true)
		let url = new URLSearchParams()
		url.append('searchInvoice', searchText)
		fetchAPI(fetchWithToken({
			url: `/administrasi/invoice?${url}`,
			token: authToken
		}))
		.then(result => {
			setsearchResult(result.data)
			setisLoading(false)
			setFocusToSearchInput()
		})
		.catch(error=> {
			setisLoading(false)
		})
	}, [searchText])
	
	

	useImperativeHandle(ref, () => ({
        openDialog,
		closeDialog
    }))

	const handleChangeInput = event => {
		let { value } = event.target
		if (value.length < 3) {
			seterrorMessage('TOO_SHORT')
		} else {
			seterrorMessage('')
		}
		settempSearchText(event.target.value)
	}

	return (
		<Dialog
			open={open}
			maxWidth="md"
			scroll="paper"
			fullWidth={true}
			fullScreen={isSmallScreen}
			PaperComponent={DraggablePaperComponent}
			onClose={closeDialog}
			
		>
			<DialogTitle className='cursor-move'>
				{findInvoiceDialogText.dialogTitle}
			</DialogTitle>
			<div className="mx-6">
				<DialogContentText gutterBottom>{findInvoiceDialogText.dialogContentText}</DialogContentText>
				<Paper className={clsx('flex px-1 py-2', isError ? 'border border-red-500' : '')}>
					<FormControl className="flex-1" error={isError}>
						<InputBase
							sx={{color:theme => isError ? theme.palette.error.main : theme.palette.text.primary}}
							type='text'
							className='flex-1 ml-3'
							inputProps={{maxLength:'50',ref:searchInputRef}}
							value={tempSearchText}
							placeholder={findInvoiceDialogText.searchInputPlaceholder}
							onChange={handleChangeInput}
							disabled={isLoading}
						/>
						{isError &&
							<FormHelperText>
								{
									errorMessage == 'TOO_SHORT' ? findInvoiceDialogText.errorTooShort : ''
								}
							</FormHelperText>
						}
					</FormControl>
					<div className="h-full flex justify-start">
						<IconButton>
							{isLoading ? <AutorenewIcon className='animate-spin'/> : <SearchIcon/>}
						</IconButton>
					</div>
				</Paper>
			</div>
			<DialogContent className='mt-3'>
				{searchText.length > 0 &&
					<DataGrid
						loading={isLoading}
						disableColumnFilter
						disableColumnMenu
						disableColumnSelector
						disableDensitySelector
						disableExtendRowFullWidth
						disableSelectionOnClick
						disableVirtualization
						hideFooter
						hideFooterPagination
						hideFooterSelectedRowCount
						autoHeight
						localeText={localeText}
						columns={[
							{
								field:'code',
								headerName: findInvoiceDialogText.invoiceTable.code,
								width:230
							},
							{
								field:'student',
								headerName: findInvoiceDialogText.invoiceTable.student,
								valueGetter: params => params.row.student.fullName,
								width:230
							},
							{
								field: 'status',
								headerName: findInvoiceDialogText.invoiceTable.status,
								width: 150,
								renderCell: params => (
									<div className="capitalize">
										{
											params.value == 'paid' ? invoiceTableText.statusPaid :
											params.value == 'unpaid' ? invoiceTableText.statusUnpaid : 
											params.value == 'confirming' ? invoiceTableText.statusConfirming : 
											params.value == 'invalid' ? invoiceTableText.statusInvalid : 
											params.value == 'pending' ? invoiceTableText.statusPending :
											invoiceTableText.statusUnknown
										}
									</div>
								)
							},
							{
								field:'id',
								headerName: findInvoiceDialogText.invoiceTable.action,
								renderCell: params => (
									<Link href={`/invoice?code=${params.row.code}`} className="no-underline flex-1">
										<Button variant="contained" className="w-full">{findInvoiceDialogText.invoiceTable.detailButton}</Button>
									</Link>
								),
								flex:1
							},
						]}
						rows={searchResult}
					/>
				}
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>{defautText.closeText}</Button>
			</DialogActions>
		</Dialog>
	)
})

FindInvoiceDialog.propTypes = {}

export default FindInvoiceDialog