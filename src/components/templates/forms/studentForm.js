import React, { memo, useState, useEffect } from 'react'
import PropTypes, { object } from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'
import { ServerSideSelect } from '../../molecules'
import { useDispatch, useSelector } from 'react-redux'
import { hideSpinner, openSnackbar, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'
import { useUpdateEffect } from 'react-use'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import { selectAuth } from '../../../lib/redux/slices/authSlice'

const StudentForm = ({open, handleClose, mode, callback}) => {
    const { authToken } = useSelector(selectAuth)
    const emptyForm = {
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
    const strings = useLocalization()
    const dispatch = useDispatch()
    const { student } = strings.table.columns
    const [passwordError, setpasswordError] = useState(false)
    const [passwordEmpty, setpasswordEmpty] = useState(false)
    const [formValue, setformValue] = useState(emptyForm)
    const [passwordFormValue, setpasswordFormValue] = useState({
        password:'',
        retypePassword:''
    })
    const formError = passwordError || passwordEmpty

    const handleSubmitForm = event => {
        event.preventDefault()
        dispatch(showSpinner(true))
        fetchAPI(fetchWithToken({
            url:'/student',
            method:'POST',
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
                message: `${strings.default.failedToSaveText}: ${msg}`,
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

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="body"
            maxWidth="sm"
            fullWidth
            keepMounted
        >
            <form onSubmit={handleSubmitForm}>
                <DialogTitle>{strings.panel.pages.student.addStudentTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-5">
                        {strings.panel.pages.student.addStudentDescription}
                    </DialogContentText>
                    {/* FORM START HERE */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            className="col-span-2"
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
                            onChange={handleInputChange}
                            name="NIS"
                            label={student.NIS}
                            required
                        />
                        <TextField
                            type="email"
                            inputProps={{
                                maxLength: 50
                            }}
                            onChange={handleInputChange}
                            name="email"
                            label={student.email}
                            required
                        />
                        <TextField
                            error={passwordError || passwordEmpty}
                            type="password"
                            inputProps={{
                                maxLength: 50
                            }}
                            onChange={handlePassOnChange}
                            name="password"
                            label={student.password}
                            helperText={passwordEmpty ? student.emptyPassword : passwordError ? student.mismatchPassword : ''}
                            required
                        />
                        <TextField
                            error={passwordError}
                            type="password"
                            inputProps={{
                                maxLength: 50
                            }}
                            onChange={handlePassOnChange}
                            name="retypePassword"
                            label={student.repeatPassword}
                            helperText={passwordError ? student.mismatchPassword : ''}
                            required
                        />
                        <ServerSideSelect
                            className="col-span-2"
                            url="/prodi"
                            optionValue="id"
                            optionLabel="name"
                            label={student.prodi}
                            onChange={handleProdiOnChange}
                            required
                        />
                        <ServerSideSelect
                            className="col-span-2"
                            url="/class"
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
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="reguler">Reguler</MenuItem>
                                <MenuItem value="beasiswa">Beasiswa</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* FORM END HERE */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{strings.default.alertDialogCancelButtonText}</Button>
                    <Button type="submit" disabled={formError}>{strings.default.saveText}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

StudentForm.defaultProps = {
    open: false,
    mode: 'add'
}

StudentForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    callback: PropTypes.func,
    mode: PropTypes.oneOf(['add','edit'])
}

export default StudentForm
