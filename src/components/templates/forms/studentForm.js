import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'
import { MainSpinner, ServerSideSelect } from '../../molecules'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { hideSpinner, openSnackbar, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'
import { useUpdateEffect, useEffectOnce } from 'react-use'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import { DraggablePaperComponent } from '../../atoms'

const StudentForm = ({open, handleClose, mode, callback, id}) => {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

    // edit this, make sure compare it with edit form structure
    let formStructure = {
        firstName:'',
        lastName:'',
        NIS:'',
        email:'',
        password:'',
        status:'',
        class:0,
        type:'',
        registerYear: '',
        prodi:''
    }

    // don't edit this
    const { authToken } = useSelector(selectAuth)
    const strings = useLocalization()
    const dispatch = useDispatch()
    const [initComplete, setinitComplete] = useState(false)
    const [isFetchError, setisFetchError] = useState(false)
    const [formValue, setformValue] = useState(formStructure)

    useUpdateEffect(() => {
        if (mode === 'edit') {
            setinitComplete(false)
            setisFetchError(false)
            if (open) {
                fetchAPI(fetchWithToken({
                    url:`/student/${id || ''}`,
                    token: authToken
                }))
                .then(result => {
                    // edit this
                    setformValue(prevValue => ({
                        ...prevValue,
                        ...result,
                        class: result.class.id,
                        prodi: result.prodi.id
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

    const { student } = strings.table.columns
    const [passwordError, setpasswordError] = useState(false)
    const [passwordEmpty, setpasswordEmpty] = useState(false)
    const [passwordFormValue, setpasswordFormValue] = useState({
        password:'',
        retypePassword:''
    })
    const formError = passwordError || (passwordEmpty && mode === 'add')

    const handleSubmitForm = event => {
        event.preventDefault()
        dispatch(showSpinner(true))
        fetchAPI(fetchWithToken({
            url:`/student${mode === 'edit' ? '/' + id : ''}` ,
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
                    case 'ERR_EMAIL_EXIST':
                        msg = strings.errors.emailDuplicate
                        break;
                    case 'ERR_CLASS_NOT_FOUND':
                        msg = strings.errors.classNotFound
                        break;
                    case 'ERR_PRODI_NOT_FOUND':
                        msg = strings.errors.prodiNotFound
                        break;
                    default:
                        msg = strings.errors.internalError
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

    const handlePassOnChange = event => {
        setpasswordFormValue(prevValue => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }))
    }

    const handleClassOnChange = (event, newValue, objectValue) => {
        setformValue(prevValue => ({
            ...prevValue,
            class: newValue,
            registerYear: Object.keys(objectValue).length > 0 ? objectValue.angkatan : ''
        }))
    }

    const handleProdiOnChange = (event, newValue) => {
        setformValue(prevValue => ({
            ...prevValue,
            prodi: newValue
        }))
    }

    const handleCloseFromDismiss = event => {
        handleClose()
        setinitComplete(false)
        setisFetchError(false)
    }

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log('Component > studentForm: formValue', formValue)
        }, [formValue])
    }

    useUpdateEffect(() => {
        const { password, retypePassword } = passwordFormValue
        if (password === retypePassword) {
            setformValue(prevValue => ({
                ...prevValue,
                password: password
            }))
            setpasswordError(false)
        } else {
            setpasswordError(true)
            setformValue(prevValue => ({
                ...prevValue,
                password: ''
            }))
        }
        setpasswordEmpty(password == '')
    }, [passwordFormValue])

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
                                Error
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
            PaperComponent={DraggablePaperComponent}
            onClose={handleCloseFromDismiss}
            fullScreen={isSmallScreen}
            scroll={isSmallScreen ? 'paper' : 'body'}
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmitForm}>
                <DialogTitle className="flex">
                    <div className="flex-1">
                        {strings.panel.pages.student.addStudentTitle}
                    </div>
                    {isSmallScreen &&
                        <IconButton>
                            <CloseIcon onClick={handleCloseFromDismiss}/>
                        </IconButton>
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-5 flex">
                        {strings.panel.pages.student.addStudentDescription}
                    </DialogContentText>
                    {/* FORM START HERE */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            className="col-span-2"
                            value={formValue.firstName}
                            inputProps={{
                                className:"capitalize",
                                maxLength: 50
                            }}
                            onChange={handleInputChange}
                            name="firstName"
                            label={student.firstName}
                            required
                        />
                        <TextField
                            className="col-span-2"
                            value={formValue.lastName}
                            inputProps={{
                                className:"capitalize",
                                maxLength: 50
                            }}
                            onChange={handleInputChange}
                            name="lastName"
                            label={student.lastName}
                        />
                        <TextField
                            inputProps={{
                                maxLength: 30
                            }}
                            value={formValue.NIS}
                            onChange={handleInputChange}
                            name="NIS"
                            label={student.NIS}
                            required
                        />
                        <TextField
                            type="email"
                            value={formValue.email}
                            inputProps={{
                                maxLength: 50
                            }}
                            onChange={handleInputChange}
                            name="email"
                            label={student.email}
                            required
                        />
                        {mode === 'edit' &&
                            <Alert severity="info" className="col-span-2" variant="filled">
                                Jika ingin merubah kata sandi, silahkan isi 2 kolom kata sandi dibawah
                            </Alert>
                        }
                        <TextField
                            error={passwordError || (passwordEmpty && mode === 'add')}
                            type="password"
                            inputProps={{
                                maxLength: 50
                            }}
                            onChange={handlePassOnChange}
                            name="password"
                            label={student.password}
                            helperText={passwordEmpty && mode === 'add' ? student.emptyPassword : passwordError ? student.mismatchPassword : ''}
                            required={mode === 'add'}
                        />
                        <TextField
                            error={passwordError && mode ==='add'}
                            type="password"
                            inputProps={{
                                maxLength: 50
                            }}
                            onChange={handlePassOnChange}
                            name="retypePassword"
                            label={student.repeatPassword}
                            helperText={passwordError && mode === 'add' ? student.mismatchPassword : ''}
                            required={mode === 'add'}
                        />
                        <ServerSideSelect
                            value={formValue.prodi}
                            className="col-span-2"
                            url="/prodi"
                            optionValue="id"
                            optionLabel="name"
                            label={student.prodi}
                            onChange={handleProdiOnChange}
                            required
                        />
                        <ServerSideSelect
                            value={formValue.class}
                            className="col-span-2"
                            url="/class"
                            urlParams={mode == 'add' ? {
                                isActive: true
                            } : {}}
                            optionValue="id"
                            optionLabel="name"
                            label={student.class}
                            onChange={handleClassOnChange}
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel>{student.status}</InputLabel>
                            <Select
                                name="status"
                                value={formValue.status}
                                onChange={handleInputChange}
                                label={student.status}
                                required
                            >
                                <MenuItem value="aktif">Aktif</MenuItem>
                                <MenuItem value="alumni">Alumni</MenuItem>
                                <MenuItem value="dropout">Dropout</MenuItem>
                                <MenuItem value="lainnya">Lainnya</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>{student.type}</InputLabel>
                            <Select
                                name="type"
                                value={formValue.type}
                                label={student.type}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="reguler">Reguler</MenuItem>
                                <MenuItem value="beasiswa">Beasiswa</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            type="text"
                            value={formValue.registerYear}
                            label={student.registerYear}
                            helperText={student.helperRegisterYearCantChange}
                            inputProps={{
                                readOnly: true
                            }}
                        />
                    </div>
                    {/* FORM END HERE */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFromDismiss}>{strings.default.cancelText}</Button>
                    <Button type="submit" disabled={formError}>{strings.default.saveText}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

StudentForm.defaultProps = {
    open: false,
    mode: 'add',
    id: null
}

StudentForm.propTypes = {
    open: PropTypes.bool.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    handleClose: PropTypes.func.isRequired,
    callback: PropTypes.func,
    mode: PropTypes.oneOf(['add','edit'])
}

export default StudentForm
