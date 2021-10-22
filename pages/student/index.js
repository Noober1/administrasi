import { Alert, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel } from '../../src/components/templates'

const Student = () => {
    return (
        <Box>
            <PanelContentTitle title="manakutau"/>
            <Alert severity="info">
                Berikut adalah data mahasiswa
            </Alert>
            
        </Box>
    )
}

Student.getLayout = page => (
    <Panel>
        {page}
    </Panel>
)

export default Student
