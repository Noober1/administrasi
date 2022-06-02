import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'

// eslint-disable-next-line react/display-name
const FormDialog = memo(({ buttonText, confirmButtonText, buttonProps, dialogTitle, children, dialogCaption, onSubmit }) => {
    const strings = useLocalization()
    const [open, setOpen] = useState(false)

    const handleClickOpen = event => setOpen(true)
    const handleClose = event => setOpen(false)
    const defaultButton = <Button>Button</Button>

    console.log('test2')

    return (
        <>
            <Button
                {...buttonProps}
                onClick={handleClickOpen}
            >
                {buttonText}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="mb-5">
                        {dialogCaption}
                    </DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{strings.default.cancelText}</Button>
                    <Button onClick={onSubmit ?? handleClose}>{confirmButtonText ?? strings.default.saveText}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
})

FormDialog.defaultProps = {
    buttonText: 'Button',
    buttonProps: {
        variant: 'contained',
        color: 'primary'
    },
    dialogTitle: 'Dialog Title',
    dialogContent: 'Dialog Content',
    dialogCaption: 'Dialog Caption',
}

FormDialog.propTypes = {
    buttonText: PropTypes.string,
    buttonProps: PropTypes.object,
    dialogTitle: PropTypes.string,
    confirmButtonText: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    dialogCaption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    onSubmit: PropTypes.func
}

export default FormDialog
