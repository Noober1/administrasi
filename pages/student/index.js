import React, { memo, useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Alert, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PanelContentHead, PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'
import StudentForm from '../../src/components/templates/forms/studentForm';

const Student = () => {
    const strings = useLocalization()
    const [formAddStudentOpen, setformAddStudentOpen] = useState(false)
    const tableRef = useRef(null)

    const { student } = strings.table.columns

    const columns = [
        {
            field:'NIS',
            headerName:student.NIS
        },
        {
            field: 'fullName',
            headerName: student.fullName,
            width: 250,
            renderCell: params => <div className="capitalize">{params.value}</div>
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

    const handleFormCallback = (error, data) => {
        if (error || typeof tableRef.current.refresh === 'undefined') return
        tableRef.current.refresh()
    }

    return (
        <Box>
            <PanelContentHead
                title={strings.panel.pages.student.titlePage}
                buttonGroup={(
                    <ButtonGroup>
                        <Button variant="contained" color="primary" startIcon={<AddIcon/>} onClick={() => setformAddStudentOpen(true)}>
                            {strings.default.addText}
                        </Button>
                        <StudentForm
                            open={formAddStudentOpen}
                            handleClose={() => setformAddStudentOpen(false)}
                            callback={handleFormCallback}
                        />
                        <Button variant="contained" color="secondary" startIcon={<FileUploadIcon/>}>
                            {strings.default.importText}
                        </Button>
                    </ButtonGroup>
                )}
                helpButtonHandler={event => console.log('click tombol bantuan siswa')}
            />
            <ServerSideTable
                ref={tableRef}
                url='/student'
                perPage="2"
                columns={columns}
                deleteUrl='/student'
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
