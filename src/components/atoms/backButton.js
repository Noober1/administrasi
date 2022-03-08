import React from 'react'
import { Button, IconButton, useMediaQuery } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import useLocalization from '../../lib/useLocalization'
import { useRouter } from 'next/router'

const BackButton = ({onClick}) => {
    const isMediumScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
    const router = useRouter()
    const strings = useLocalization()

    const handleButtonClick = event => {
        if (typeof onClick == 'function') {
            onClick()
        } else {
            router.back()
        }
    }

    if (isMediumScreen) {
        return(
            <IconButton variant="contained" color="secondary" onClick={handleButtonClick}>
                <ArrowBackIcon/>
            </IconButton>
        )
    }

    return (
        <Button className="mr-2" variant="contained" color="error" startIcon={<ArrowBackIcon/>} onClick={handleButtonClick}>
            {strings.default.returnText}
        </Button>
    )
}

BackButton.defaultProps = {
    onClick: null
}

export default BackButton