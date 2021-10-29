import { Alert, Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'

const columns = [
    {
        field:'code',
        headerName:'Kode'
    },
    {
        field: 'name',
        headerName: 'Nama',
        width: 120
    },
    {
        field: 'brand',
        headerName: 'Merek'
    },
    {
        field: 'model',
        headerName: 'Model'
    }
];

const Student = () => {
    const strings = useLocalization()

    return (
        <Box>
            <PanelContentTitle title={strings.panel.pages.student.titlePage}/>
            <Alert severity="info">
                Berikut adalah data mahasiswa
            </Alert>
            <ServerSideTable
                url='/inventaris/item/3/input'
                columns={columns}
            />
        </Box>
    )
}

Student.getLayout = page => (
    <Panel>
        {page}
    </Panel>
)

export default Student
