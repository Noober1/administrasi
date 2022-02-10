import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TextField, Typography } from '@mui/material'
import fetchAPI from '../../../lib/fetchApi'
import { useEffect } from 'react'
import useLocalization from '../../../lib/useLocalization'
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const VerifyOrManualDialog = forwardRef((props,ref) => {

    const { default:defaultText, components: {verifyOrManualDialog: verifyOrManualDialogText} } = useLocalization()

    const [loading, setloading] = useState(true)
    const [status, setstatus] = useState(null)
    const [invoiceCode, setInvoiceCode] = useState(null)
    const [fetchError, setfetchError] = useState(false)
    const [fetchData, setfetchData] = useState({})
    const [fetchErrorMessage, setfetchErrorMessage] = useState('')
    const [open, setopen] = useState(false)
    const openDialog = () => setopen(true)
    const closeDialog = () => {
        setInvoiceCode(null)
        setstatus(null)
        setopen(false)
        setloading(true)
        setfetchData({})
        setfetchError(false)
    }

    useEffect(() => {
        if (!invoiceCode || !open) return

        fetchAPI('/administrasi/getInvoice?code=' + invoiceCode)
            .then(result => {
                setfetchData(result)
            })
            .then(result => {
                setloading(false)
            })
            .catch(errors => {
                setfetchError(true)
                setfetchErrorMessage(errors.message || 'UNKNOWN_ERROR')
            })
    }, [open])

    const handleSubmitForm = event => {
        event.preventDefault()
        console.log('form submitted')
    }
    
    const ViewLoading = () => (
        <div className='mx-auto text-center'>
            <CircularProgress size="4rem"/>
        </div>
    )

    const ViewContent = () => (
        <>
            {fetchData.status == 'confirming' &&
                <div className="grid grid-cols-2 gap-2 mb-5">
                    <Typography variant="h6" className='col-span-2'>
                        {verifyOrManualDialogText.detail}
                    </Typography>
                    <div className="test">
                        <Typography>{verifyOrManualDialogText.picture}</Typography>
                        {fetchData.picture &&
                            <a
                                href={`${process.env.NEXT_PUBLIC_API_URL}/media/${fetchData.picture}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div
                                    className='ratio-16-9'
                                >
                                    <Paper className='ratio-content rounded-none opacity-60'>
                                        <img class="w-full h-full" src={`${process.env.NEXT_PUBLIC_API_URL}/media/${fetchData.picture}`}/>
                                    </Paper>
                                    <div className="ratio-content flex items-center">
                                        <span className="mx-auto">
                                            <span className='block md:hidden'>
                                                <IconButton>
                                                    <ZoomInIcon/>
                                                </IconButton>
                                            </span>
                                            <span className='hidden md:block'>{verifyOrManualDialogText.clickToView}</span>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        }
                    </div>
                    <div className="grid grid-cols-1">
                        <TextField fullWidth className="mb-2" variant='standard' label={verifyOrManualDialogText.accountNumber} value={fetchData.accountNumber} aria-readonly/>
                        <TextField fullWidth className="mb-2" variant='standard' label={verifyOrManualDialogText.sender} value={fetchData.sender} aria-readonly/>
                        <TextField fullWidth className="capitalize mb-2" variant='standard' label={verifyOrManualDialogText.refNumber} value={fetchData?.refNumber || 'Empty'} aria-readonly/>
                    </div>
                </div>
            }
            <form onSubmit={handleSubmitForm} className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                <TextField
                    label="Mana saia tau"
                    required
                />
                <TextField
                    label="Mana saia tau"
                    required
                />
                <TextField
                    label="Mana saia tau"
                    required
                />
                <TextField
                    label="Mana saia tau"
                    required
                />
            </form>
        </>
    )

    useImperativeHandle(ref, () => ({
        openDialog, closeDialog, setInvoiceCode
    }));

    return(
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth="sm"
            onClose={closeDialog}
        >
            <DialogTitle>
                {loading ? defaultText.loadingText : fetchError ? defaultText.anErrorOccured + ': ' + fetchErrorMessage : '[PEMBAYARAN VERIFIKASI/MANUAL]'}
            </DialogTitle>
            <DialogContent>
                {loading ?
                    <ViewLoading/> :
                    <ViewContent/>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmitForm}>{defaultText.saveText}</Button>
                <Button onClick={closeDialog}>{defaultText.cancelText}</Button>
            </DialogActions>
        </Dialog>
    )
})

VerifyOrManualDialog.propTypes = {

}

export default VerifyOrManualDialog