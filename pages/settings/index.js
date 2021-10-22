import { Box } from '@mui/system'
import React from 'react'
import { Panel } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'

const Settings = () => {
    const strings = useLocalization()

    return (
        <Box>
            disini pengaturan
        </Box>
    )
}

Settings.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default Settings
