import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import useLocalization from '../../lib/useLocalization'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { DraggablePaperComponent } from '../atoms'

const ConfirmDialog = forwardRef((props, ref) => {
    const strings = useLocalization()
    const [open, setopen] = useState(false)

    const handleConfirm = event => {
        setopen(false)
        if (typeof props?.onConfirm == 'function') {
            props.onConfirm(event)
        }
    }

    const openConfirm = () => setopen(true)
    const closeConfirm = () => setopen(false)

    useImperativeHandle(ref, () => ({
        openConfirm
    }));

    return (
        <Dialog
            open={open}
            onClose={closeConfirm}
            PaperComponent={DraggablePaperComponent}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle className='cursor-move'>
                {strings.default.alertConfirmTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText gutterBottom>
                    {props.dialogText}
                </DialogContentText>
                {props.alertText.length > 0 &&
                    <Alert severity={props.alertSeverity} variant="filled">
                        {props?.alertText}
                    </Alert>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={closeConfirm}>
                    {strings.default.cancelText}
                </Button>
                <Button onClick={handleConfirm}>
                    {strings.default.sendText}
                </Button>
            </DialogActions>
        </Dialog>
    )
})

ConfirmDialog.defaultProps = {
    dialogText: "No Title",
    alertSeverity: "warning",
    alertText: "",
    onConfirm: event => {}
}

ConfirmDialog.propTypes = {
    dialogText: PropTypes.string,
    alertText: PropTypes.string,
    onConfirm: PropTypes.func
}

export default ConfirmDialog
