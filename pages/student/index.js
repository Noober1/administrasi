import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Alert, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PanelContentHead, PanelContentTitle } from '../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization'
import FormDialog from '../../src/components/organisms/formDialog';
import { useDebounce } from 'react-use';

const Student = () => {
    const strings = useLocalization()
    const { student } = strings.table.columns
    var addStudentValue = {}

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

    const AddStudentForm = () => {
        const [formValue, setformValue] = useState({
            firstName:'',
            lastName:''
        })
        const handleInputChange = event => {
            setformValue({
                ...formValue,
                [event.target.name]: event.target.value
            })
        }
        useDebounce(() => {
            addStudentValue = {
                ...formValue
            }
        }, [formValue])
        return(
            <>
                <TextField
                    value={formValue.firstName}
                    onChange={handleInputChange}
                    name="firstName"
                    label="Nama depan"
                />
                <TextField
                    value={formValue.lastName}
                    onChange={handleInputChange}
                    name="lastName"
                    label="Nama belakang"
                />
            </>
        )
    }

    const handleSubmitAddStudent = (event) => {
        console.log(addStudentValue)
    }

    return (
        <Box>
            <PanelContentHead
                title={strings.panel.pages.student.titlePage}
                buttonGroup={(
                    <ButtonGroup>
                        <FormDialog
                            buttonProps={{
                                variant:'contained',
                                color:'primary',
                                startIcon: <AddIcon/>
                            }}
                            buttonText={strings.default.addText}
                            dialogCaption="Ini caption"
                            dialogTitle="Ini title"
                            onSubmit={handleSubmitAddStudent}
                            dialogContent={<AddStudentForm/>}
                        />
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
