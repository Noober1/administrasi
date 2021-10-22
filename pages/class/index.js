import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Panel } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'

const Class = () => {
    const strings = useLocalization()

    return (
        <Box>
            <Typography
                variant="h5"
            >
                {strings.panel.pages.dashboard.welcomeMessage}
            </Typography>
            <Typography
                variant="h4"
            >
                [USER_FULLNAME]
            </Typography>
        </Box>
    )
}

Class.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default Class
