import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, ButtonGroup } from '@mui/material'
import { Box } from '@mui/system'
import { PanelContentHead } from '../../src/components/atoms/dashboard'
import { PageHead } from '../../src/components/atoms'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'
import StudentForm from '../../src/components/templates/forms/studentForm';
import TemplateImporter from '../../src/components/organisms/TemplateImporter';

const Student = () => {
    const {panel:{pages:{student:studentPage}},table:{columns:{student}},...strings} = useLocalization()
    const [formStudentMode, setformStudentMode] = useState('add')
    const [formStudentOpen, setformStudentOpen] = useState(false)
    const [formStudentEditId, setformStudentEditId] = useState(null)
    const tableRef = useRef(null)

    const handleAddStudentButton = event => {
        setformStudentMode('add')
        setformStudentOpen(true)
    }

    const handleEditStudent = id => {
        setformStudentMode('edit')
        setformStudentEditId(id)
        setformStudentOpen(true)
    }

    const handleFormCallback = (error, data) => {
        if (error || typeof tableRef.current.refresh === 'undefined') return
        tableRef.current.refresh()
    }

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
                        <Button size="small" variant="contained" color="info" onClick={() => handleEditStudent(params.value)}>
                            {strings.default.editText}
                        </Button>
                    </ButtonGroup>
                )
            }
        }
    ];

    return (
        <>
            <PageHead
                title={studentPage.titlePage}
            />
            <Box>
                <PanelContentHead
                    title={studentPage.titlePage}
                    buttonGroup={(
                        <ButtonGroup>
                            <Button variant="contained" color="primary" startIcon={<AddIcon/>} onClick={handleAddStudentButton}>
                                {strings.default.addText}
                            </Button>
                            <StudentForm
                                open={formStudentOpen}
                                mode={formStudentMode}
                                id={formStudentEditId}
                                handleClose={() => setformStudentOpen(false)}
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
                    columns={columns}
                    deleteUrl='/student'
                />
                <TemplateImporter/>
            </Box>
        </>
    )
}

Student.getLayout = page => (
    <Panel>
        {page}
    </Panel>
)

export default Student
