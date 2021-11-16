import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText } from '@mui/material'
import { ConfirmDialog, ServerSideSelect } from '../../molecules'
import useLocalization from '../../../lib/useLocalization'
import { useDispatch } from 'react-redux'
import { hideSpinner, openSnackbar, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'

const SendBatchInvoice = forwardRef((props, ref) => {
    const { components:{ sendBatchInvoice }, ...strings } = useLocalization()
    const confirmDialogRef = useRef(null)
    const dispatch = useDispatch()
    const [open, setopen] = useState(false)
    const [formValue, setformValue] = useState({
        prodi: [],
        class: []
    })

    const openDialog = () => setopen(true)
    const closeDialog = () => setopen(false)

    useImperativeHandle(ref, () => ({
        open: open,
        openDialog,
        closeDialog
    }));

    const handleSubmitForm = event => {
        event.preventDefault()
        dispatch(showSpinner(true))
        fetchAPI(fetchWithToken({
            url:'/administrasi/invoice/',
            method: 'POST',
            data: formValue
        }))
        .then(result => {
            dispatch(hideSpinner())
            dispatch(openSnackbar({
                severity: 'success',
                position: 'top-right',
                message:sendBatchInvoice.invoiceSended
            }))
        })
        .catch(error => {
            console.error(error)
            dispatch(hideSpinner())
            dispatch(openSnackbar({
                severity: 'error',
                position: 'top-right',
                message:sendBatchInvoice.invoiceFailedToSend
            }))
        })
        console.log('submitted')
    }

    const showConfirm = event => {
        confirmDialogRef.current.openConfirm()
    }

    const handleMultipleSelectOnChange = (name, value) => {
        setformValue(prevValue => ({
            ...prevValue,
            [name]:value
        }))
    }

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log('Component > Templates > Forms > SendBatchInvoice. Form Value:', formValue)
        }, [formValue])
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={closeDialog}
                maxWidth="sm"
                fullWidth
                keepMounted
            >
                <DialogTitle>
                        {sendBatchInvoice.dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className="mb-5">
                        {sendBatchInvoice.dialogContentText}
                        </DialogContentText>
                        <div className="grid grid-cols-1 gap-2">
                            <FormControl
                                variant="outlined"
                                className="mb-5"
                                fullWidth
                            >
                                <ServerSideSelect
                                    name="class"
                                    multiple
                                    value={formValue}
                                    className="col-span-2"
                                    url="/class"
                                    urlParams={{
                                        isActive: true
                                    }}
                                    optionValue="id"
                                    optionLabel="name"
                                    label={sendBatchInvoice.classFormLabel}
                                    onChange={(event,value) => handleMultipleSelectOnChange('class', value)}
                                    required
                                />
                                <FormHelperText>
                                    {sendBatchInvoice.classFormHelper}
                                </FormHelperText>
                            </FormControl>
                            <FormControl
                                variant="outlined"
                                className="mb-5"
                                fullWidth
                            >
                                <ServerSideSelect
                                    multiple
                                    value={formValue}
                                    className="col-span-2"
                                    url="/prodi"
                                    optionValue="id"
                                    optionLabel="name"
                                    label={sendBatchInvoice.prodiFormLabel}
                                    onChange={(event,value) => handleMultipleSelectOnChange('prodi', value)}
                                    required
                                />
                                <FormHelperText>
                                    {sendBatchInvoice.prodiFormHelper}
                                </FormHelperText>
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>
                            {strings.default.alertDialogCancelButtonText}
                        </Button>
                        <Button onClick={showConfirm} disabled={formValue.prodi.length < 1 || formValue.class.length < 1}>
                            {strings.default.sendText}
                        </Button>
                    </DialogActions>
            </Dialog>
            <ConfirmDialog
                ref={confirmDialogRef}
                dialogText={sendBatchInvoice.alertConfirmText}
                alertText={sendBatchInvoice.alertWarningText}
                onConfirm={handleSubmitForm}
            />
        </div>
    )
})

SendBatchInvoice.defaultProps = {
    
}

SendBatchInvoice.propTypes = {
    
}

export default SendBatchInvoice
