import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Alert, Button, ButtonGroup } from '@mui/material'
import { Box } from '@mui/system'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization';
import { PanelContentHead } from '../../src/components/atoms/dashboard';
import { tools } from '../../src/lib';
import { DeleteDialog } from '../../src/components/molecules';
import Link from 'next/link'
import PaymentForm from '../../src/components/templates/forms/paymentForm';

const Payment = (props) => {
    const strings = useLocalization()
    const { payment } = strings.table.columns
    const tableRef = useRef(null)
    const [deleteDialogOpen, setdeleteDialogOpen] = useState(false)
    const [dataToDelete, setdataToDelete] = useState(null)
    const [formOpen, setformOpen] = useState(false)
    const [formMode, setformMode] = useState('add')
    const [formEditId, setformEditId] = useState(null)

    const handleAddButton = event => {
        setformMode('add')
        setformOpen(true)
    }

    const handleEditButton = id => {
        setformMode('edit')
        setformEditId(id)
        setformOpen(true)
    }

    const handleFormCallback = (error, data) => {
        try {
            if (typeof tableRef.current.refresh == 'function') {
                if (!error) {
                    tableRef.current.refresh()
                }
            }
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error()
            }
        }
    }

    const handleOpenDeleteDialog = (data) => {
        setdataToDelete(data)
        setdeleteDialogOpen(true)
    }

    const columns = [
        {
            field:'registerDate',
            headerName:payment.registerDate,
            valueGetter: params => tools.dateFormatting(params.value,'d M y', strings.default.nameOfMonths),
            width: 200
        },
        {
            field: 'admin',
            headerName: payment.admin,
            valueGetter: params => params.row.admin.fullName,
            flex:1
        },
        {
            field: 'type',
            headerName: payment.type,
            width:150
        },
        {
            field: 'price',
            headerName: payment.price,
            valueGetter: params => tools.rupiahFormatting(params.value),
            width: 150,
        },
        {
            field: 'id',
            headerName: payment.action,
            flex:1,
            renderCell: params => {
                return(
                    <ButtonGroup>
                        <Button size="small" variant="contained">
                            <Link href={`/payment/${params.value}`}>
                                {strings.default.detailText}
                            </Link>
                        </Button>
                        <Button size="small" variant="contained" color="info" onClick={() => handleEditButton(params.value)}>
                            {strings.default.editText}
                        </Button>
                        <Button variant="contained" color="error" onClick={() => handleOpenDeleteDialog(params.value)}>
                            {strings.default.deleteText}
                        </Button>
                    </ButtonGroup>
                )
            }
        }
    ]

    return (
        <Box>
            <PanelContentHead
                title={strings.panel.pages.payment.titlePage}
                buttonGroup={(
                    <ButtonGroup>
                        <Button variant="contained" color="primary" startIcon={<AddIcon/>} onClick={handleAddButton}>
                            {strings.default.addText}
                        </Button>
                    </ButtonGroup>
                )}
                helpButtonHandler={event => console.log('hehe')}
            />
            <ServerSideTable
                ref={tableRef}
                url='/administrasi/payment'
                showDeleteButton={false}
                columns={columns}
                enableCheckbox={false}
            />
            <DeleteDialog
                dialogOpen={deleteDialogOpen}
                closeHandle={() => setdeleteDialogOpen(false)}
                data={[dataToDelete]}
                additionalMessage={(
                    <Alert severity="warning">
                        {strings.panel.pages.payment.warningDeleteItem}
                    </Alert>
                )}
                url="/administrasi/payment"
                refreshTableHandler={() => {
                    tableRef.current.refresh()
                }}
            />
            <PaymentForm
                open={formOpen}
                mode={formMode}
                id={formEditId}
                handleClose={() => setformOpen(false)}
                callback={handleFormCallback}
            />
        </Box>
    )
}

Payment.getLayout = page => <Panel>{page}</Panel>

export default Payment
