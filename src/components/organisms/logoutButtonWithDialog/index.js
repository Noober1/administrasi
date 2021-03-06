import { Link } from '@mui/material'
import React from 'react'
import useLocalization from '../../../lib/useLocalization'
import AlertDialog from '../alertDialog'
import PropTypes from 'prop-types'
import { setAuthToken } from '../../../lib/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'

const LogoutButtonWithDialog = ({children}) => {
    const dispatch = useDispatch()
    const strings = useLocalization()
    const handleConfirmLogout = events => {
        dispatch(setAuthToken(null))
        dispatch(showSpinner(true))
        events.closeDialog()
    }

    return (
        <AlertDialog
            title={strings.default.alertLogoutTitleText}
            showCancelButton={true}
            content={strings.default.alertLogoutBodyText}
            confirmLabel={strings.default.alertLogoutText}
            onConfirm={handleConfirmLogout}
        >
            {children ? children :
                <Link variant="body1" underline="none" className="cursor-pointer">
                    {strings.default.alertLogoutText}
                </Link>
            }
        </AlertDialog>
    )
}

LogoutButtonWithDialog.propTypes = {
    children: PropTypes.element
}

export default LogoutButtonWithDialog
