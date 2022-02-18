import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import { useEffect } from 'react'
import useLocalization from '../../../lib/useLocalization'
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { DraggablePaperComponent, Tooltip } from '../../atoms'
import ConfirmDialog from '../../organisms/ConfirmDialog'
import { useDispatch } from 'react-redux'
import { hideSpinner, openSnackbar, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../lib/redux/slices/authSlice'

const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/media/`

const VerifyOrManualDialog = forwardRef((props,ref) => {

    const dispatch = useDispatch()
    const { authToken } = useSelector(selectAuth)

    const { default:defaultText, errors: errorText, components: {verifyOrManualDialog: verifyOrManualDialogText} } = useLocalization()
    const confirmVerifyDialogRef = useRef(null)
    const [formVerify, setformVerify] = useState({
        paymentMethod: 'manual'
    })

    const handleFormVerifyOnChange = event => {
        setformVerify(prevValue => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }))
    }

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

    if (process.env.NODE_ENV == 'development') {
        useEffect(() => {
            console.log('Component > VerifyOrManualDialog: formVerify = ', formVerify)
        }, [formVerify])
    }

    useEffect(() => {
        if (!invoiceCode || !open) return

        fetchAPI('/administrasi/getInvoice?code=' + invoiceCode)
            .then(result => {
                setfetchData(result)
                setformVerify(prevValue => ({
                    ...prevValue,
                    paymentMethod: result.paymentMethod
                }))
            })
            .then(result => {
                setloading(false)
            })
            .catch(errors => {
                setfetchError(true)
                setfetchErrorMessage(errors.message || 'UNKNOWN_ERROR')
            })
    }, [open])

    const executeCallback = (isError = false) => {
        if (typeof props.callback == 'function') {
            props.callback(isError)
        }
    }

    const handleSubmitForm = event => {
        event.preventDefault()
        console.log('form submitted')
    }

    const handleSubmitVerify = () => {
        if (
            !invoiceCode ||
            fetchError ||
            loading
        ) return

        dispatch(showSpinner(true))
        fetchAPI(fetchWithToken({
            url: '/administrasi/getInvoice?code=' + invoiceCode,
            method: "PATCH",
            token: authToken,
            data: formVerify
        })).then(result => {
            closeDialog()
            dispatch(openSnackbar({
                position: 'top-right',
                message: '[DATA BERHASIL DISIMPAN]',
                severity: 'success'
            }))
            executeCallback(false)
            dispatch(hideSpinner())
        })
        .catch(error => {
            dispatch(openSnackbar({
                position: 'top-right',
                message: '[DATA GAGAL DISIMPAN]',
                severity: 'error'
            }))
            executeCallback(true)
            dispatch(hideSpinner())
        })
    }

    const ViewLoading = () => (
        <div className='mx-auto text-center'>
            <CircularProgress size="4rem"/>
        </div>
    )

    const VerifyContent = () => (
        <>
            <DialogContentText gutterBottom>
                {verifyOrManualDialogText.verifyMessage}
            </DialogContentText>
            <div className="grid grid-cols-2 mb-5">
                <Typography variant="h6" className='col-span-2'>
                    {verifyOrManualDialogText.detail}
                </Typography>
                <div className='pt-3'>
                    <a
                        href={fetchData.picture ? imageUrl + fetchData.picture : '#'}
                        target={fetchData?.picture ? "_blank" : ''}
                    >
                        <div
                            className='ratio-16-9'
                        >
                            <Paper className='ratio-content rounded-none opacity-60'>
                                <img className="w-full h-full" src={fetchData.picture ? imageUrl + fetchData.picture : imageUrl + 'not-found.jpg'}/>
                            </Paper>
                            <div className="ratio-content flex items-center">
                                <span className="mx-auto">
                                    <span className='block md:hidden'>
                                        <Tooltip title={verifyOrManualDialogText.clickToView}>
                                            <Fab color='default'>
                                                <ZoomInIcon/>
                                            </Fab>
                                        </Tooltip>
                                    </span>
                                    <Paper className='hidden md:block p-1'>
                                        {fetchData?.picture ? verifyOrManualDialogText.clickToView : errorText.imageNotFound}
                                    </Paper>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="grid grid-cols-1 p-3">
                    <TextField fullWidth className="mb-2" variant='standard' label={verifyOrManualDialogText.accountNumber} value={fetchData?.accountNumber  || 'No data'} aria-readonly/>
                    <TextField fullWidth className="mb-2" variant='standard' label={verifyOrManualDialogText.sender} value={fetchData?.sender  || 'No data'} aria-readonly/>
                    <TextField fullWidth className="capitalize mb-2" variant='standard' label={verifyOrManualDialogText.refNumber} value={fetchData?.refNumber || 'No data'} aria-readonly/>
                </div>
                <Typography className="col-span-2 mb-4" variant='h6' gutterBottom>
                    {verifyOrManualDialogText.verifyOptionsText}
                </Typography>
                <FormControl>
                    <InputLabel>{verifyOrManualDialogText.paymentMethodText}</InputLabel>
                    <Select
                        label={verifyOrManualDialogText.paymentMethodText}
                        value={formVerify.paymentMethod}
                        name="paymentMethod"
                        onChange={handleFormVerifyOnChange}
                    >
                        <MenuItem value="manual">{verifyOrManualDialogText.paymentMethodManualText}</MenuItem>
                        <MenuItem value="transfer">{verifyOrManualDialogText.paymentMethodTransferText}</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </>
    )

    const ViewContent = () => (
        <>
            {fetchData.status == 'confirming' ?
                <VerifyContent/> : <div className="test">test</div>
            }
        </>
    )

    useImperativeHandle(ref, () => ({
        openDialog, closeDialog, setInvoiceCode
    }));

    return(
        <>
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth="sm"
            onClose={closeDialog}
            PaperComponent={DraggablePaperComponent}
        >
            <DialogTitle className='cursor-move'>
                {loading ?
                    defaultText.loadingText :
                    fetchError ?
                        defaultText.anErrorOccured + ': ' + fetchErrorMessage :
                        fetchData.status == 'confirming' ? verifyOrManualDialogText.verifyTitle : verifyOrManualDialogText.manualTitle
                }
            </DialogTitle>
            <DialogContent>
                {loading ?
                    <ViewLoading/> :
                    fetchError ? <div>Error</div> : <ViewContent/>
                }
            </DialogContent>
            <DialogActions>
                {(!loading && !fetchError) &&
                    <>
                    {fetchData.status == 'confirming' ?
                        <Button onClick={() => confirmVerifyDialogRef.current.openConfirm()}>{verifyOrManualDialogText.verifyButton}</Button> :
                        <Button>{defaultText.saveText}</Button>
                    }
                    </>
                }
                <Button onClick={closeDialog}>{defaultText.cancelText}</Button>
            </DialogActions>
        </Dialog>
        {!fetchError &&
            // verify confirm dialog
            <>
                {
                    fetchData.status == 'confirming' ? 
                    <ConfirmDialog
                        ref={confirmVerifyDialogRef}
                        dialogText={verifyOrManualDialogText.verifyConfirmingVerify}
                        onConfirm={handleSubmitVerify}
                    /> : 
                    <ConfirmDialog/>
                }
            </>
        }
        </>
    )
})

VerifyOrManualDialog.propTypes = {
    callback: PropTypes.func
}

export default VerifyOrManualDialog