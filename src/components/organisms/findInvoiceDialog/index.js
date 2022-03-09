import React, { forwardRef, useImperativeHandle, useState, use } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, useMediaQuery, DialogTitle, FormControl, FormHelperText, IconButton, InputBase, Paper, Pagination } from '@mui/material'
import { DraggablePaperComponent, Link, useFocus } from '../../atoms'
import SearchIcon from '@mui/icons-material/Search'
import { useDebounce, useUpdateEffect } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import useLocalization from '../../../lib/useLocalization'
import clsx from 'clsx'
import { selectNoPersistConfig, setDialog } from '../../../lib/redux/slices/noPersistConfigSlice'
import { ServerSideTable } from '../../templates'

const FindInvoiceDialog = forwardRef((props, ref) => {
	const {default: defautText, table: {columns: {invoice: invoiceTableText}}, components: {findInvoiceDialog: findInvoiceDialogText}} = useLocalization()
	const [searchInputRef, setFocusToSearchInput] = useFocus()
	const { dialogs: { findInvoiceDialog: {open, searchValue: searchText} } } = useSelector(selectNoPersistConfig)
	const [tempSearchText, settempSearchText] = useState('')
	const [inputErrorMessage, setinputErrorMessage] = useState('')
	const dispatch = useDispatch()
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
	const toggleDialogOpen = open => dispatch(setDialog({name: 'findInvoiceDialog', open}))
	const closeDialog = () => toggleDialogOpen(false)
	const openDialog = () => {
		toggleDialogOpen(true)
		setFocusToSearchInput()
	}

	useDebounce(() => {
		if (tempSearchText.length > 2) {
			dispatch(setDialog({name: 'findInvoiceDialog', open:true, searchValue: tempSearchText}))
		}
	}, 1000,[tempSearchText])

	const isError = (inputErrorMessage.length > 0)

	useImperativeHandle(ref, () => ({
        openDialog,
		closeDialog
    }))

	const handleChangeInput = event => {
		let { value } = event.target
		if (value.length < 3) {
			setinputErrorMessage('TOO_SHORT')
		} else {
			setinputErrorMessage('')
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
						/>
						{isError &&
							<FormHelperText>
								{
									inputErrorMessage == 'TOO_SHORT' ? findInvoiceDialogText.errorTooShort : ''
								}
							</FormHelperText>
						}
					</FormControl>
					<div className="h-full flex justify-start">
						<IconButton>
							<SearchIcon/>
						</IconButton>
					</div>
				</Paper>
			</div>
			<DialogContent className='mt-3'>
				<ServerSideTable
                    enableCheckbox={false}
                    showDeleteButton={false}
					perPage="5"
                    url='/administrasi/invoice'
					searchFromParam={searchText}
					showToolbar={false}
					tableProps={{
						autoHeight:true
					}}
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
								<Link href={`/invoice?code=${params.row.code}`} className="no-underline flex-1" onClick={closeDialog}>
									<Button size="small" disableElevation variant="contained" className="w-full">{findInvoiceDialogText.invoiceTable.detailButton}</Button>
								</Link>
							),
							flex:1
						},
					]}
                />
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>{defautText.closeText}</Button>
			</DialogActions>
		</Dialog>
	)
})

FindInvoiceDialog.propTypes = {}

export default FindInvoiceDialog