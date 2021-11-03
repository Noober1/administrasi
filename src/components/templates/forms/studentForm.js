import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'

const StudentForm = ({open, handleClose}) => {
    const strings = useLocalization()
    const { student } = strings.table.columns
    const [formValue, setformValue] = useState({
        firstName:'',
        lastName:'',
        NIS:'',
        email:'',
        password:'',
        status:'',
        class:0,
        type:'',
        registerYear: new Date().getFullYear(),
        prodi:''
    })
    const [passwordFormValue, setpasswordFormValue] = useState({
        password:'',
        retypePassword:''
    })

    const handleSubmitForm = event => {
        event.preventDefault()
        console.log('test')
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

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log('Component > studentForm: formValue', formValue)
        }, [formValue])
    }

    useEffect(() => {
        const { password, retypePassword } = passwordFormValue
        if (password === retypePassword) {
            setformValue(prevValue => ({
                ...prevValue,
                password: password
            }))
            console.log('password same')
        } else {
            setformValue(prevValue => ({
                ...prevValue,
                password: ''
            }))
            console.log('password isnt same')
        }
    }, [passwordFormValue])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                        />
                        <TextField
                            type="email"
                            inputProps={{
                                className:"capitalize",
                                maxLength: 50
                            }}
                            onChange={handleInputChange}
                            name="email"
                            label={student.email}
                        />
                        <TextField
                            type="password"
                            inputProps={{
                                maxLength: 50
                            }}
                            onChange={handlePassOnChange}
                            name="password"
                            label={student.password}
                        />
                        <TextField
                            type="password"
                            inputProps={{
                                maxLength: 50
                            }}
                            onChange={handlePassOnChange}
                            name="retypePassword"
                            label={student.repeatPassword}
                        />
                        <FormControl fullWidth>
                            <InputLabel>{student.status}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="status"
                                value={formValue.status}
                                label="Age"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="aktif">Aktif</MenuItem>
                                <MenuItem value="alumni">Alumni</MenuItem>
                                <MenuItem value="dropout">Dropout</MenuItem>
                                <MenuItem value="lainnya">Lainnya</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* FORM END HERE */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{strings.default.alertDialogCancelButtonText}</Button>
                    <Button type="submit">{strings.default.saveText}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

StudentForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default StudentForm
