import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useLocalization from '../../../lib/useLocalization'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import { hideSpinner, openSnackbar, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'

const DeleteDialog = ({dialogOpen, closeHandle, additionalMessage, data, url, refreshTableHandler}) => {

    const strings = useLocalization()
    const dispatch = useDispatch()
    const { authToken } = useSelector(selectAuth)
    const snackbarErrorOptions = {
        position: 'top-right',
        severity: 'error'
    }

    const handleDeleteItem = event => {
        dispatch(showSpinner(true))
        if (!data) {
            closeHandle()
            dispatch(openSnackbar({
                ...snackbarErrorOptions,
                message: strings.errors.noDataSelected
            }))
            dispatch(hideSpinner())
            return false
        }

        if (data.length < 1) {
            closeHandle()
            dispatch(openSnackbar({
                ...snackbarErrorOptions,
                message: strings.errors.noDataSelected
            }))
            dispatch(hideSpinner())
            return false
        }

        if (!url) {
            closeHandle()
            dispatch(openSnackbar({
                ...snackbarErrorOptions,
                message: strings.errors.deleteUrlInvalid
            }))
            dispatch(hideSpinner())
            return false
        }

        fetchAPI(fetchWithToken({
            url: url,
            method: "DELETE",
            token: authToken,
            data: {
                ids: data,
                action: 'delete'
            }
        }))
        .then(result => {
            closeHandle()
            if (typeof refreshTableHandler == 'function') {
                refreshTableHandler()
            }
            dispatch(openSnackbar({
                position: 'top-right',
                severity: 'success',
                message: strings.success.deleteItemsSuccess
            }))
            dispatch(hideSpinner())
        })
        .catch(error =>{
            const error_code = error?.response?.data?.code ? `[${error.response.data.code}]` : ''
            closeHandle()
            dispatch(openSnackbar({
                ...snackbarErrorOptions,
                message: strings.errors.deleteItemsError + ' ' + error_code
            }))
            dispatch(hideSpinner())
        })
    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={closeHandle}
        >
            <DialogTitle>{strings.table.dialogDeleteTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText gutterBottom color="InfoText">
                    {strings.table.dialogDeleteConfirmMessage}
                </DialogContentText>
                {additionalMessage ?? ''}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeHandle}>
                    {strings.default.alertDialogCancelButtonText}
                </Button>
                <Button onClick={handleDeleteItem}>
                    {strings.default.deleteText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DeleteDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    closeHandle: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
    refreshTableHandler: PropTypes.func,
    additionalMessage: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
        PropTypes.element
    ])
}

export default DeleteDialog
