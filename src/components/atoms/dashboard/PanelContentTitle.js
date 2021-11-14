import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'

const PanelContentTitle = ({title = 'No Title'}) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Typography variant="h4" className="capitalize" align={isSmallScreen ? 'center' : 'left'} gutterBottom>
            {title}
        </Typography>
    )
}

PanelContentTitle.propTypes = {
    title: PropTypes.string
}

export default PanelContentTitle
