import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography, useMediaQuery } from '@mui/material'
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

    var nominalValue = 0
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const dispatch = useDispatch()
    const { authToken } = useSelector(selectAuth)
    const manualContentRef = useRef(null)

    const { default:defaultText, errors: errorText, components: {verifyOrManualDialog: verifyOrManualDialogText} } = useLocalization()
    const confirmVerifyDialogRef = useRef(null)
    const [formVerify, setformVerify] = useState({
        nominal: 0,
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

    const handleOpenVerifyConfirm = () => {
        if (nominalValue < 1) return
        confirmVerifyDialogRef.current.openConfirm()
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
            data: {
                ...formVerify,
                nominal: nominalValue
            }
        })).then(result => {
            closeDialog()
            dispatch(openSnackbar({
                position: 'top-right',
                message: defaultText.savedText,
                severity: 'success'
            }))
            executeCallback(false)
            dispatch(hideSpinner())
        })
        .catch(error => {
            dispatch(openSnackbar({
                position: 'top-right',
                message: errorText.failedToSaveText,
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

    const VerifyContent = () => {
        const [verifyNominalValue, setverifyNominalValue] = useState(0)
        useEffect(() => {
            var updatedValue = setTimeout(() => {
                nominalValue = verifyNominalValue
            }, 1000);
            return () => {
                clearInterval(updatedValue)
            }
        }, [verifyNominalValue])
        
        return(
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
                    <div className="col-span-2 grid grid-cols-2 gap-1">
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
                        <FormControl error={verifyNominalValue < 1 || verifyNominalValue > fetchData?.remainingPaymentHistory}>
                            <InputLabel>{verifyOrManualDialogText.verifyNominal}</InputLabel>
                            <OutlinedInput
                                error={verifyNominalValue < 1 || verifyNominalValue > fetchData?.remainingPaymentHistory}
                                type="number"
                                inputProps={{
                                    min:1
                                }}
                                label={verifyOrManualDialogText.verifyNominal}
                                value={verifyNominalValue}
                                name="nominal"
                                onChange={e => setverifyNominalValue(e.target.value)}
                                startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                            />
                            <FormHelperText>{verifyOrManualDialogText.maxNominal}: {fetchData?.remainingPaymentHistory}</FormHelperText>
                        </FormControl>
                    </div>
                </div>
            </>
        )
    }

    const ManualContent = forwardRef(({data}, ref) => {

        const [manualData, setmanualData] = useState({
            paymentMethod: 'manual',
            nominal: 0,
            payer: ''
        })

        if (process.env.NODE_ENV == 'development') {
            useEffect(() => {
                console.log('Component > VerifyOrManualDialog > ManualContent > manualData = ', manualData)
            }, [manualData])
        }

        const [isManualFormError, setisManualFormError] = useState(false)

        useImperativeHandle(ref, () => ({
            manualData,
            isError: isManualFormError
        }));

        const formChangeHandler = event => {
            let { name, value } = event.target
            if (!event.target.validity.valid) return false
            setmanualData(prevValue => ({
                ...prevValue,
                [name]: value
            }))
        }

        return(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <FormControl error={isManualFormError}>
                    <InputLabel>{verifyOrManualDialogText.verifyNominal}</InputLabel>
                    <OutlinedInput
                        label={verifyOrManualDialogText.verifyNominal}
                        name="nominal"
                        type="number"
                        inputProps={{
                            pattern:"[0-9]+",
                            max: fetchData?.remainingPaymentHistory || 0
                        }}
                        value={manualData.nominal}
                        onChange={formChangeHandler}
                        startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                    />
                    <FormHelperText>{verifyOrManualDialogText.maxNominal}: {fetchData?.remainingPaymentHistory}</FormHelperText>
                </FormControl>
                <TextField
                    label={verifyOrManualDialogText.payer}
                    name="payer"
                    type="text"
                    value={manualData.payer}
                    error={isManualFormError}
                    onChange={formChangeHandler}
                    required
                />
            </div>
        )
    })

    const handleManualSubmit = event => {
        const getData = manualContentRef.current.manualData
        if (!getData) return
        if (getData.payer.length < 1) return
        if (
            getData.nominal < 1 ||
            getData.nominal > fetchData?.remainingPaymentHistory
        ) return
        dispatch(showSpinner(true))
        fetchAPI(fetchWithToken({
            url: '/administrasi/getInvoice?code=' + invoiceCode,
            method: "PATCH",
            token: authToken,
            data: getData
        })).then(result => {
            closeDialog()
            dispatch(openSnackbar({
                position: 'top-right',
                message: defaultText.savedText,
                severity: 'success'
            }))
            executeCallback(false)
            dispatch(hideSpinner())
        })
        .catch(error => {
            dispatch(openSnackbar({
                position: 'top-right',
                message: errorText.failedToSaveText,
                severity: 'error'
            }))
            executeCallback(true)
            dispatch(hideSpinner())
        })
    }

    const ViewContent = () => (
        <>
            {fetchData.status == 'confirming' &&
                <VerifyContent/>
            }
            {(fetchData.status == 'unpaid' || fetchData.status == 'pending' || fetchData.status == 'invalid') &&
                <ManualContent ref={manualContentRef} data={fetchData}/>
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
            fullScreen={isSmallScreen}
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
                    {fetchData.status == 'confirming' &&
                        <Button onClick={handleOpenVerifyConfirm}>{verifyOrManualDialogText.verifyButton}</Button>
                    }
                    {(fetchData.status == 'unpaid' || fetchData.status == 'pending' || fetchData.status == 'invalid') &&
                        <Button onClick={handleManualSubmit}>{defaultText.saveText}</Button>
                    }
                    </>
                }
                <Button onClick={closeDialog}>{defaultText.cancelText}</Button>
            </DialogActions>
        </Dialog>
        {!fetchError &&
            // verify confirm dialog
            <>
                {(fetchData.status == 'confirming') &&
                    <ConfirmDialog
                        ref={confirmVerifyDialogRef}
                        dialogText={verifyOrManualDialogText.verifyConfirmingVerify}
                        onConfirm={handleSubmitVerify}
                    />
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