import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField, Typography } from '@mui/material'
import useLocalization from '../../lib/useLocalization'
import { DraggablePaperComponent } from '../atoms'
import { DateTimePicker, ServerSideSelect } from '../molecules'
import PropTypes from 'prop-types'
import { useUpdateEffect } from 'react-use'
import { Uploader } from '../templates'
import fetchAPI, { fetchWithToken } from '../../lib/fetchApi'
import useProfile from '../../lib/useProfile'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../../lib/redux/slices/authSlice'
import { openSnackbar } from '../../lib/redux/slices/noPersistConfigSlice'

const SendReceipt = forwardRef(({invoiceId, transactionDate, accountNumber, sender, refNumber, picture, destinationAccount, callback, ...props},ref) => {
    const { authToken } = useSelector(selectAuth)
    const dispatch = useDispatch()
    const { components: { invoiceDetailDialog }, default:textDefault, errors } = useLocalization()
    const [dialogOpen, setdialogOpen] = useState(false)
    const openSendReceiptDialog = () => setdialogOpen(true)
    const closeSendReceiptDialog = () => setdialogOpen(false)
    const [formValue, setformValue] = useState({
        transactionDate: new Date(),
        accountNumber: accountNumber || '',
        sender: sender || '',
        refNumber: refNumber || '',
        picture: picture || '',
        destinationAccount: destinationAccount || ''
    })

    useEffect(() => {
        if (typeof transactionDate == 'string') {
            setformValue(prevValue => ({
                ...prevValue,
                transactionDate: new Date(transactionDate)
            }))
        }
    }, [transactionDate])

    useImperativeHandle(ref,() => ({
        openSendReceiptDialog
    }))

    const handleFormSubmit = event => {
        event.preventDefault()
        fetchAPI(fetchWithToken({
            url: `/administrasi/receipt/${invoiceId}/send`,
            method: "POST",
            token: authToken,
            data: formValue
        }))
        .then(result => {
            closeSendReceiptDialog()
            dispatch(openSnackbar({
                position: 'top-right',
                message: textDefault.savedText,
                severity: 'success'
            }))
            if (typeof callback == 'function') callback(false, result)
        })
        .catch(error => {
            console.error(error)
            dispatch(openSnackbar({
                position: 'top-right',
                message: errors.failedToSaveText,
                severity: 'danger'
            }))
            if (typeof callback == 'function') callback(true, error)
        })
    }

    const handleTextOnChange = event => {
        setformValue(prevValue => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }))
    }

    const handleDateOnChange = value => {
        setformValue(prevValue => ({
            ...prevValue,
            transactionDate: value
        }))
    }

    const handleChangePicture = (event,value) => {
        setformValue(prevValue=> ({
            ...prevValue,
            picture: value
        }))
    }

    const handleChangeDestinationAccount = (event,value) => {
        setformValue(prevValue => ({
            ...prevValue,
            destinationAccount: value
        }))
    }

    if (process.env.NODE_ENV === 'development') {
        useUpdateEffect(() => {
            console.log('Component > SendReceipt = formValue: ', formValue)
        }, [formValue])
    }
    
    return (
        <Dialog
            fullWidth
            onClose={closeSendReceiptDialog}
            open={dialogOpen}
            PaperComponent={DraggablePaperComponent}
            aria-labelledby="send-receipt-dialog"
        >
            <DialogTitle className="cursor-move">
                {invoiceDetailDialog.actionSendPaymentDetail}
            </DialogTitle>
            <form onSubmit={handleFormSubmit} className="drag-cancel">
                <DialogContent>
                    <DialogContentText className="mb-5">{invoiceDetailDialog.sendReceiptContentText}</DialogContentText>
                    <div className="grid grid-cols-1 gap-4">
                        <DateTimePicker
                            value={formValue.transactionDate}
                            label={invoiceDetailDialog.transactionDate}
                            valueGetter={handleDateOnChange}
                        />
                        <TextField
                            name="accountNumber"
                            value={formValue.accountNumber}
                            onChange={handleTextOnChange}
                            label={invoiceDetailDialog.accountNumber}
                            inputProps={{
                                maxLength:16
                            }}
                            required
                        />
                        <TextField
                            name="sender"
                            value={formValue.sender}
                            onChange={handleTextOnChange}
                            label={invoiceDetailDialog.senderName}
                            inputProps={{
                                maxLength:100
                            }}
                            helperText={invoiceDetailDialog.senderNameHelper}
                            required
                        />
                        <TextField
                            name="refNumber"
                            value={formValue.refNumber}
                            onChange={handleTextOnChange}
                            label={invoiceDetailDialog.refNumber}
                            inputProps={{
                                maxLength: 100
                            }}
                            type="text"
                            helperText={invoiceDetailDialog.refNumberHelper}
                            required
                        />
                        <ServerSideSelect
                            name="destinationAccount"
                            url="/administrasi/account"
                            optionLabel="name"
                            optionValue="number"
                            label={invoiceDetailDialog.destinationAccount}
                            onChange={handleChangeDestinationAccount}
                            required
                        />
                        <div className="grid grid-cols-3">
                            <div>
                            <Typography gutterBottom>
                                {invoiceDetailDialog.picture}
                            </Typography>
                            <Uploader
                                title={invoiceDetailDialog.pickImage}
                                required
                                onChange={handleChangePicture}
                            />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="cursor-move">
                    <Button onClick={closeSendReceiptDialog}>
                        {textDefault.cancelText}
                    </Button>
                    <Button type="submit" disabled={formValue.picture === ''}>
                        {textDefault.sendText}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
})

SendReceipt.defaultProps = {
    transactionDate: '',
    accountNumber: '',
    sender: '',
    refNumber: '',
    invoiceId: 0
}

SendReceipt.propTypes = {
    invoiceId:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    transactionDate: PropTypes.string,
    accountNumber: PropTypes.string,
    sender: PropTypes.string,
    refNumber: PropTypes.string,
    callback: PropTypes.func
}

export default SendReceipt
