import { Backdrop, CircularProgress } from '@mui/material'
import TrapFocus from '@mui/material/Unstable_TrapFocus'
import React from 'react'
import PropTypes from 'prop-types'

const SpinnerBackdrop = ({open,onBackdropClick}) => {
    return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={onBackdropClick}
            >
                <TrapFocus open={open}>
                    <CircularProgress
                        color="inherit"
                        size={75}
                        className="outline-none"
                    />
                </TrapFocus>
            </Backdrop>
    )
}

SpinnerBackdrop.defaultProps = {
    open: true,
    onBackdropClick: () => {}
}

SpinnerBackdrop.propTypes = {
    open: PropTypes.bool,
    onBackdropClick: PropTypes.func
}

export default SpinnerBackdrop
