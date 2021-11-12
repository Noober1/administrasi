import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'
import { useDispatch, useSelector } from 'react-redux'
import { hideSpinner, openSnackbar, selectNoPersistConfig, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'
import { useUpdateEffect } from 'react-use'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import { selectAuth } from '../../../lib/redux/slices/authSlice'

const PaymentForm = ({open, handleClose, mode, callback, id}) => {

    const { profile } = useSelector(selectNoPersistConfig)

    // edit this, make sure compare it with edit form structure
    let formStructure = {
        admin: profile.email,
        type: '',
        price: '',
        description: ''
    }

    // don't edit this
    const { authToken } = useSelector(selectAuth)
    const strings = useLocalization()
    const dispatch = useDispatch()
    const [initComplete, setinitComplete] = useState(false)
    const [isFetchError, setisFetchError] = useState(false)
    const [formValue, setformValue] = useState(formStructure)

    const handleCloseFromDismiss = event => {
        handleClose()
        setinitComplete(false)
        setisFetchError(false)
    }

    useUpdateEffect(() => {
        if (mode === 'edit') {
            setinitComplete(false)
            setisFetchError(false)
            if (open) {
                fetchAPI(fetchWithToken({
                    url:`/administrasi/payment/${id || ''}`,
                    token: authToken
                }))
                .then(result => {
                    let { id, admin, ...val } = result
                    setformValue(prevValue => ({
                        ...prevValue,
                        ...val,
                        admin: admin.email
                    }))

                    setinitComplete(true)
                    setisFetchError(false)
                })
                .catch(error => {
                    if (process.env.NODE_ENV === 'development') {
                        console.error(error)
                    }
                    setisFetchError(true)
                })
            }
        } else {
            setinitComplete(true)
            setisFetchError(false)
            setformValue(prevValue => ({
                ...formStructure
            }))
        }
    }, [open])

    const { payment:paymentTable } = strings.table.columns
    const { payment:paymentPage } = strings.panel.pages

    const handleSubmitForm = event => {
        event.preventDefault()
        dispatch(showSpinner(true))
        fetchAPI(fetchWithToken({
            url:`/administrasi/payment${mode === 'edit' ? '/' + id : ''}` ,
            method:mode === 'edit' ? 'PATCH' : 'POST',
            token: authToken,
            data: formValue
        }))
        .then(result => {
            handleClose()
            dispatch(hideSpinner())
            dispatch(openSnackbar({
                position: 'top-right',
                message: strings.default.savedText,
                severity: 'success'
            }))
            if (typeof callback == 'function') {
                callback(false, result)
            }
        })
        .catch(error => {
            let msg = 'No message'
            dispatch(hideSpinner())
            if (typeof error.response !== 'undefined') {
                const { code } = error.response.data
                switch (code) {
                    case 'ER_DUP_ENTRY':
                        msg = strings.errors.duplicateData
                        break;
                    case 'ERR_ADMIN_NOT_FOUND':
                        msg = '[ADMIN_NOT_FOUND]'
                        break;
                    case 'ERR_DATA_EXIST':
                            msg = strings.errors.dataExist
                            break;
                    default:
                        msg = strings.errors.failedToDelete + ` [${code}]`
                        break;
                }
            }
            dispatch(openSnackbar({
                position: 'top-right',
                message: `${strings.errors.failedToSaveText}: ${msg}`,
                severity: 'error'
            }))
            if (typeof callback == 'function') {
                callback(true, error)
            }
        })
    }
    
    const handleInputChange = event => setformValue({
        ...formValue,
        [event.target.name]: event.target.value
    })

    const handlePriceChange = event => {
        let value = event.target.value.replace(/\./g, '')
        setformValue({
            ...formValue,
            [event.target.name]: value
        })
    }

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log('Component > PaymentForm: formValue', formValue)
        }, [formValue])
    }

    if (!initComplete && open) {
        return (
            <Dialog
                open={open}
                onClose={isFetchError ? handleCloseFromDismiss : () => {}}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent className="text-center">
                    <div className="py-10">
                        {!isFetchError ? <CircularProgress/> : 
                            <Typography>
                                {strings.default.anErrorOccured}
                            </Typography>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseFromDismiss}
            scroll="body"
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmitForm}>
                <DialogTitle>{mode === 'add' ? paymentPage.addPaymentTitle : paymentPage.editPaymentTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-5">
                        {mode === 'add' ? paymentPage.addPaymentDescription : paymentPage.editPaymentDescription}
                    </DialogContentText>
                    {/* FORM START HERE */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            value={formValue.type}
                            inputProps={{
                                maxLength: 100
                            }}
                            onChange={handleInputChange}
                            name="type"
                            label={paymentTable.type}
                            required
                        />
                        <TextField
                            value={formValue.price}
                            type="number"
                            onChange={handlePriceChange}
                            name="price"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Rp</InputAdornment>
                            }}
                            label={paymentTable.price}
                            helperText={paymentTable.priceHelper}
                            required
                        />
                        <TextField
                            value={formValue.description}
                            inputProps={{
                                maxLength: 500
                            }}
                            onChange={handleInputChange}
                            name="description"
                            label={paymentTable.description}
                            required
                        />
                        <TextField
                            value={formValue.admin}
                            inputProps={{
                                readOnly: true,
                                maxLength: 50
                            }}
                            name="admin"
                            label={paymentTable.admin}
                            helperText={paymentTable.adminCantChanged}
                        />
                    </div>
                    {/* FORM END HERE */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFromDismiss}>{strings.default.alertDialogCancelButtonText}</Button>
                    <Button type="submit">{strings.default.saveText}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

PaymentForm.defaultProps = {
    open: false,
    mode: 'add',
    id: null
}

PaymentForm.propTypes = {
    open: PropTypes.bool.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    handleClose: PropTypes.func.isRequired,
    callback: PropTypes.func,
    mode: PropTypes.oneOf(['add','edit'])
}

export default PaymentForm
