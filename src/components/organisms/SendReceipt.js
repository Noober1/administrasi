import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, TextField } from '@mui/material'
import useLocalization from '../../lib/useLocalization'
import { DraggablePaperComponent } from '../atoms'
import { DateTimePicker } from '../molecules'

const SendReceipt = forwardRef((props,ref) => {
    const { components: { invoiceDetailDialog }, default:textDefault } = useLocalization()
    const [dialogOpen, setdialogOpen] = useState(false)
    const openSendReceiptDialog = () => setdialogOpen(true)
    const closeSendReceiptDialog = () => setdialogOpen(false)

    useImperativeHandle(ref,() => ({
        openSendReceiptDialog
    }))

    const handleFormSubmit = event => {
        event.preventDefault()
        console.log('form submitted')
    }
    
    return (
        <Dialog
            fullWidth
            onClose={closeSendReceiptDialog}
            open={dialogOpen}
            PaperComponent={DraggablePaperComponent}
            PaperProps={{
                handle:'#send-receipt-dialog'
            }}
            aria-labelledby="send-receipt-dialog"
        >
            <DialogTitle id="send-receipt-dialog" className="cursor-move">
                {invoiceDetailDialog.actionSendPaymentDetail}
            </DialogTitle>
            <form onSubmit={handleFormSubmit}>
                <DialogContent>
                    <DialogContentText className="mb-2">{invoiceDetailDialog.sendReceiptContentText}</DialogContentText>
                    <div className="grid grid-cols-1 gap-4">
                        <DateTimePicker
                            value={new Date('2020-01-01')}
                            label={invoiceDetailDialog.transactionDate}
                        />
                        <TextField
                            name="accountNumber"
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
                                min: 0
                            }}
                            type="number"
                            helperText={invoiceDetailDialog.refNumberHelper}
                            required
                        />
                    </div>
                </DialogContent>
                <DialogActions>
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

export default SendReceipt
