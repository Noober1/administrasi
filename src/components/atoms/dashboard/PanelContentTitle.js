import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const PanelContentTitle = ({title = 'No Title'}) => {
    return (
        <Typography variant="h4" className="capitalize" gutterBottom>
            {title}
        </Typography>
    )
}

PanelContentTitle.propTypes = {
    title: PropTypes.string
}

export default PanelContentTitle
