import React from 'react'
import { Button, ButtonGroup, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { PanelContentHead, PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'

const Class = () => {
    const strings = useLocalization()

    const columns = [
        {
            field:'name',
            headerName:'Nama kelas',
            flex:1
        },
        {
            field: 'semester',
            headerName: 'Semester',
            width: 150
        },
        {
            field: 'angkatan',
            headerName: 'Angkatan'
        },
        {
            field: 'id',
            headerName: 'Aksi',
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
            <PanelContentHead
                title={strings.panel.pages.class.titlePage}
                buttonGroup={(
                    <ButtonGroup>
                        <Button variant="contained" color="primary" startIcon={<AddIcon/>}>
                            {strings.default.addText}
                        </Button>
                        <Button variant="contained" color="secondary" startIcon={<FileUploadIcon/>}>
                            {strings.default.importText}
                        </Button>
                    </ButtonGroup>
                )}
                helpButtonHandler={event => console.log('click tombol bantuan pembayaran')}
            />
            <ServerSideTable
                url='/class'
                columns={columns}
            />
        </Box>
    )
}

Class.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default Class
