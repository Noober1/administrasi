import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Panel } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'
import useProfile from '../../src/lib/useProfile'

const Dashboard = () => {
    const strings = useLocalization()
    const profile = useProfile()

    return (
        <Box>
            <Typography
                variant="h5"
            >
                {strings.panel.pages.dashboard.welcomeMessage}
            </Typography>
            <Typography
                variant="h4"
                className="capitalize"
            >
                {profile.fullName}
            </Typography>
        </Box>
    )
}

Dashboard.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default Dashboard
