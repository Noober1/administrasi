import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'
import { useDispatch, useSelector } from 'react-redux'
import { hideSpinner, openSnackbar, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'
import { useUpdateEffect } from 'react-use'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import { selectAuth } from '../../../lib/redux/slices/authSlice'

const ClassForm = ({open, handleClose, mode, callback, id}) => {

    // edit this, make sure compare it with edit form structure
    let formStructure = {
        name:'',
        semester:'',
        angkatan: new Date().getFullYear(),
        isActive:true
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
                    url:`/class/${id || ''}`,
                    token: authToken
                }))
                .then(result => {
                    let { id, ...val } = result
                    setformValue(prevValue => ({
                        ...prevValue,
                        ...val
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

    const { class:classTable } = strings.table.columns
    const { class:classPage } = strings.panel.pages

    const handleSubmitForm = event => {
        event.preventDefault()
        dispatch(showSpinner(true))
        fetchAPI(fetchWithToken({
            url:`/class${mode === 'edit' ? '/' + id : ''}` ,
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
                    case 'ERR_CLASS_NOT_FOUND':
                        msg = strings.errors.classNotFound
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

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log('Component > classForm: formValue', formValue)
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
                <DialogTitle>{mode === 'add' ? classPage.addClassTitle : classPage.editClassTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-5">
                        {mode === 'add' ? classPage.addClassDescription : classPage.editClassDescription}
                    </DialogContentText>
                    {/* FORM START HERE */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            value={formValue.name}
                            inputProps={{
                                className:"capitalize",
                                maxLength: 50
                            }}
                            onChange={handleInputChange}
                            name="name"
                            label={classTable.name}
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel>{classTable.semester}</InputLabel>
                            <Select
                                name="semester"
                                value={formValue.semester}
                                label={classTable.semester}
                                onChange={handleInputChange}
                                required
                            >
                                {[1,2,3,4,5,6,7,8].map(item => {
                                    return(
                                        <MenuItem key={'semester' + item} value={item}>Semester {item}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            value={formValue.angkatan}
                            type="number"
                            onChange={handleInputChange}
                            name="angkatan"
                            label={classTable.angkatan}
                            inputProps={{
                                readOnly: mode === 'edit'
                            }}
                            required={mode === 'add'}
                        />
                        <FormControl fullWidth>
                            <InputLabel>{classTable.status}</InputLabel>
                            <Select
                                name="isActive"
                                label={classTable.status}
                                value={formValue.isActive}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value={true}>{classTable.statusActive}</MenuItem>
                                <MenuItem value={false}>{classTable.statusInactive}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* FORM END HERE */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFromDismiss}>{strings.default.cancelText}</Button>
                    <Button type="submit">{strings.default.saveText}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

ClassForm.defaultProps = {
    open: false,
    mode: 'add',
    id: null
}

ClassForm.propTypes = {
    open: PropTypes.bool.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    handleClose: PropTypes.func.isRequired,
    callback: PropTypes.func,
    mode: PropTypes.oneOf(['add','edit'])
}

export default ClassForm
