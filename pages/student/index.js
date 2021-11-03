import React, { memo, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Alert, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PanelContentHead, PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'
import FormDialog from '../../src/components/organisms/formDialog';
import { useDebounce } from 'react-use';
import StudentForm from '../../src/components/templates/forms/studentForm';

const Student = () => {
    const strings = useLocalization()
    const [formAddStudentOpen, setformAddStudentOpen] = useState(false)

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
            <PanelContentHead
                title={strings.panel.pages.student.titlePage}
                buttonGroup={(
                    <ButtonGroup>
                        <Button variant="contained" color="primary" startIcon={<AddIcon/>} onClick={() => setformAddStudentOpen(true)}>
                            {strings.default.addText}
                        </Button>
                        <StudentForm open={formAddStudentOpen} handleClose={() => setformAddStudentOpen(false)}/>
                        {/* <FormDialog
                            buttonProps={{
                                variant:'contained',
                                color:'primary',
                                startIcon: <AddIcon/>
                            }}
                            buttonText={strings.default.addText}
                            dialogCaption={strings.panel.pages.student.addStudentDescription}
                            dialogTitle={strings.panel.pages.student.addStudentTitle}
                            onSubmit={handleSubmitAddStudent}
                            formValue={formValue}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                <TextField
                                    inputProps={{
                                        className:"capitalize"
                                    }}
                                    // onChange={handleInputChange}
                                    name="firstName"
                                    label={student.firstName}
                                />
                                <TextField
                                    inputProps={{
                                        className:"capitalize"
                                    }}
                                    // onChange={handleInputChange}
                                    name="lastName"
                                    label={student.lastName}
                                />
                            </div>
                        </FormDialog> */}
                        <Button variant="contained" color="secondary" startIcon={<FileUploadIcon/>}>
                            {strings.default.importText}
                        </Button>
                    </ButtonGroup>
                )}
                helpButtonHandler={event => console.log('click tombol bantuan siswa')}
            />
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
