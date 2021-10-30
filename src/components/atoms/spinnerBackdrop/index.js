import { Backdrop, CircularProgress, Modal } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const SpinnerBackdrop = ({open,onBackdropClick}) => {
    return (
        <Modal
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
            className="flex items-center outline-none"
            open={open}
            onClick={onBackdropClick}
        >
            <div className="mx-auto outline-none">
                <CircularProgress
                    color="inherit"
                    size={75}
                    className="outline-none"
                />
            </div>
        </Modal>
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
