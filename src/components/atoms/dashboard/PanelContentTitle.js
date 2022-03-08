import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'

const PanelContentTitle = ({title = 'No Title'}) => {
    const theme = useTheme()
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Typography variant={isMediumScreen ? "h5" : "h4"} className="capitalize" gutterBottom>
            {title}
        </Typography>
    )
}

PanelContentTitle.propTypes = {
    title: PropTypes.string
}

export default PanelContentTitle
