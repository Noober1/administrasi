import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'

const StudentForm = ({open, handleClose}) => {
    const strings = useLocalization()
    const { student } = strings.table.columns
    const [formValue, setformValue] = useState({
        firstName:'',
        lastName:''
    })

    const handleSubmitForm = () => {
        console.log('test')
    }
    
    const handleInputChange = event => setformValue({
        ...formValue,
        [event.target.name]: event.target.value
    })

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{strings.panel.pages.student.addStudentTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText className="mb-5">
                    {strings.panel.pages.student.addStudentDescription}
                </DialogContentText>
                {/* FORM START HERE */}
                <div className="grid grid-cols-2 gap-2">
                    <TextField
                        inputProps={{
                            className:"capitalize",
                            maxLength: 50
                        }}
                        onChange={handleInputChange}
                        name="firstName"
                        label={student.firstName}
                    />
                    <TextField
                        inputProps={{
                            className:"capitalize",
                            maxLength: 50
                        }}
                        onChange={handleInputChange}
                        name="firstName"
                        label={student.firstName}
                    />
                    <TextField
                        inputProps={{
                            className:"capitalize",
                            maxLength: 50
                        }}
                        onChange={handleInputChange}
                        name="lastName"
                        label={student.lastName}
                    />
                </div>
                {/* FORM END HERE */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{strings.default.alertDialogCancelButtonText}</Button>
                <Button onClick={handleSubmitForm}>{strings.default.saveText}</Button>
            </DialogActions>
        </Dialog>
    )
}

StudentForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default StudentForm
