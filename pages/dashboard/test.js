import { Box } from '@mui/system'
import React from 'react'
import { Panel } from '../../src/components/templates'

const TestPage = () => {

    return (
        <Box>
            disini pengaturan
        </Box>
    )
}

TestPage.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default TestPage
