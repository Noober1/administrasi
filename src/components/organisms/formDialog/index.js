import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'

const FormDialog = ({buttonText, buttonProps, dialogTitle, dialogContent, dialogCaption, onSubmit}) => {
    const strings = useLocalization()
    const [open, setOpen] = useState(false)
    console.log('test')

    const handleClickOpen = event => setOpen(true)
    const handleClose = event => setOpen(false)
    const defaultButton = <Button>Button</Button>

    return (
        <>
            <Button
                {...buttonProps}
                onClick={handleClickOpen}
            >
                {buttonText}
            </Button>
            <Dialog open={open} onClose={handleClose} keepMounted>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogCaption}
                    </DialogContentText>
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{strings.default.alertDialogCancelButtonText}</Button>
                    <Button onClick={onSubmit ?? handleClose}>[SUBMIT_TEXT]</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

FormDialog.defaultProps = {
    buttonText: 'Button',
    buttonProps: {
        variant:'contained',
        color:'primary'
    },
    dialogTitle: 'Dialog Title',
    dialogContent: 'Dialog Content',
    dialogCaption: 'Dialog Caption',
}

FormDialog.propTypes = {
    buttonText: PropTypes.element.isRequired,
    buttonProps: PropTypes.object,
    dialogTitle: PropTypes.string,
    dialogContent: PropTypes.element.isRequired,
    dialogCaption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    onSubmit: PropTypes.func
}

export default FormDialog
