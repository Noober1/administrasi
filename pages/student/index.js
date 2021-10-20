import React from 'react'
import { Panel } from '../../src/components/templates'

const Student = () => {
    return (
        'student'
    )
}

Student.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default Student
