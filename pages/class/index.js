import React, { useRef, useState } from 'react'
import { Alert, Button, ButtonGroup, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { PanelContentHead, PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'
import { DeleteDialog } from '../../src/components/molecules'

const Class = () => {
    const tableRef = useRef(null)
    const strings = useLocalization()
    const [deleteDialogOpen, setdeleteDialogOpen] = useState(false)
    const [dataToDelete, setdataToDelete] = useState(null)

    const handleOpenDeleteDialog = (data) => {
        setdataToDelete(data)
        setdeleteDialogOpen(true)
    }

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
                        <Button size="small" variant="contained" color="error" onClick={() => handleOpenDeleteDialog(params.value)}>
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
                ref={tableRef}
                enableCheckbox={false}
                showDeleteButton={false}
                url='/class'
                columns={columns}
            />
            <DeleteDialog
                dialogOpen={deleteDialogOpen}
                closeHandle={() => setdeleteDialogOpen(false)}
                data={[dataToDelete]}
                additionalMessage={(
                    <Alert severity="warning">
                        {strings.panel.pages.class.warningDeleteItem}
                    </Alert>
                )}
                url="/class"
                refreshTableHandler={() => {
                    tableRef.current.refresh()
                }}
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
