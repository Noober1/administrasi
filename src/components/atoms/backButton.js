import React from 'react'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import useLocalization from '../../lib/useLocalization'
import { useRouter } from 'next/router'

const BackButton = () => {
    const router = useRouter()
    const strings = useLocalization()

    const handleButtonClick = event => {
        router.back()
    }

    return (
        <Button className="mr-2" variant="contained" color="error" startIcon={<ArrowBackIcon/>} onClick={handleButtonClick}>
            {strings.default.returnText}
        </Button>
    )
}

export default BackButton