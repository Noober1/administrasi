import React from 'react'
import { Panel } from '../../src/components/templates'

const Dashboard = () => {
    return (
        'test'
    )
}

Dashboard.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default Dashboard
