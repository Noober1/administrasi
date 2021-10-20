import React from 'react'
import { Panel } from '../../src/components/templates'

const Student = () => {
    return (
        <p>
        student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
            student<br/>student<br/>student<br/>
        </p>
    )
}

Student.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default Student
