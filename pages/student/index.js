import { Alert, Button, ButtonGroup, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'

const Student = () => {
    const strings = useLocalization()
    const { student } = strings.table.columns

    const columns = [
        {
            field:'NIS',
            headerName:student.NIS
        },
        {
            field: 'fullName',
            headerName: student.fullName,
            width: 250
        },
        {
            field: 'status',
            headerName: student.status
        },
        {
            field: 'type',
            headerName: student.type
        },
        {
            field: 'id',
            headerName: student.action,
            flex:1,
            renderCell: params => {
                return(
                    <ButtonGroup>
                        <Button size="small" variant="contained" color="info">
                            {strings.default.editText}
                        </Button>
                        <Button size="small" variant="contained" color="error">
                            {strings.default.deleteText}
                        </Button>
                    </ButtonGroup>
                )
            }
        }
    ];

    return (
        <Box>
            <PanelContentTitle title={strings.panel.pages.student.titlePage}/>
            <Alert severity="info" variant="filled">
                Berikut adalah data mahasiswa
            </Alert>
            <ServerSideTable
                url='/student'
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
