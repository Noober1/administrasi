import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText } from '@mui/material'
import { ConfirmDialog, ServerSideSelect } from '../../molecules'
import useLocalization from '../../../lib/useLocalization'
import { useDispatch } from 'react-redux'
import { hideSpinner, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'

const SendBatchInvoice = forwardRef((props, ref) => {
    const { components:{ sendBatchInvoice }, ...strings } = useLocalization()
    const confirmDialogRef = useRef(null)
    const dispatch = useDispatch()
    const [open, setopen] = useState(false)
    const [formValue, setformValue] = useState([])

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
        setTimeout(() => {
            dispatch(hideSpinner())
        }, 5000);
        console.log('submitted')
    }

    const showConfirm = event => {
        confirmDialogRef.current.openConfirm()
    }

    const handleClassOnChange = (event, value, value2) => {
        console.log(value,value2)
        setformValue(value)
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
                        <div className="text-center">
                            <FormControl
                                variant="outlined"
                                className="mb-5"
                                fullWidth
                            >
                                <ServerSideSelect
                                    multiple
                                    value={formValue}
                                    className="col-span-2"
                                    url="/class"
                                    optionValue="id"
                                    optionLabel="name"
                                    label={sendBatchInvoice.classFormLabel}
                                    onChange={handleClassOnChange}
                                    required
                                />
                                <FormHelperText>
                                    {sendBatchInvoice.classFormHelper}
                                </FormHelperText>
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>
                            {strings.default.alertDialogCancelButtonText}
                        </Button>
                        <Button onClick={showConfirm} disabled={formValue.length < 1}>
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
