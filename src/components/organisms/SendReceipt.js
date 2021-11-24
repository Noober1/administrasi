import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField } from '@mui/material'
import useLocalization from '../../lib/useLocalization'
import { DraggablePaperComponent } from '../atoms'
import { DateTimePicker } from '../molecules'
import PropTypes from 'prop-types'
import { useUpdateEffect } from 'react-use'

const SendReceipt = forwardRef(({transactionDate, accountNumber, sender, refNumber, ...props},ref) => {
    const { components: { invoiceDetailDialog }, default:textDefault } = useLocalization()
    const [dialogOpen, setdialogOpen] = useState(false)
    const openSendReceiptDialog = () => setdialogOpen(true)
    const closeSendReceiptDialog = () => setdialogOpen(false)
    const [formValue, setformValue] = useState({
        transactionDate: new Date(),
        accountNumber: accountNumber || '',
        sender: sender || '',
        refNumber: refNumber || ''
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
        console.log('form submitted')
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
                    <DialogContentText className="mb-2">{invoiceDetailDialog.sendReceiptContentText}</DialogContentText>
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
                            label={invoiceDetailDialog.senderName}
                            inputProps={{
                                maxLength:100
                            }}
                            helperText={invoiceDetailDialog.senderNameHelper}
                            required
                        />
                        <TextField
                            name="sender"
                            label={invoiceDetailDialog.refNumber}
                            inputProps={{
                                maxLength: 100
                            }}
                            type="text"
                            helperText={invoiceDetailDialog.refNumberHelper}
                            required
                        />
                    </div>
                </DialogContent>
                <DialogActions className="cursor-move">
                    <Button onClick={closeSendReceiptDialog}>
                        {textDefault.cancelText}
                    </Button>
                    <Button type="submit">
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
    refNumber: ''
}

SendReceipt.propTypes = {
    transactionDate: PropTypes.string,
    accountNumber: PropTypes.string,
    sender: PropTypes.string,
    refNumber: PropTypes.string
}

export default SendReceipt
