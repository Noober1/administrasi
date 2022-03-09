import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Alert, Button, ButtonGroup } from '@mui/material'
import { Box } from '@mui/system'
import { PageHead, Tooltip } from '../../src/components/atoms'
import { Panel, ServerSideTable } from '../../src/components/templates'
import useLocalization from '../../src/lib/useLocalization';
import { PanelContentHead } from '../../src/components/atoms/dashboard';
import { tools } from '../../src/lib';
import { DeleteDialog } from '../../src/components/molecules';
import PaymentForm from '../../src/components/templates/forms/paymentForm';
import SendBatchInvoice from '../../src/components/templates/forms/SendBatchInvoice';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Payment = (props) => {
    const {panel:{pages:{payment:paymentPage}},table:{columns:{payment}},...strings} = useLocalization()

    // table ref
    const tableRef = useRef(null)

    // for batch invoice components
    const sendBatchInvoiceRef = useRef(null)
    const [paymentName, setpaymentName] = useState('')
    const [paymentId, setpaymentId] = useState(null);

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
            width: 150
        },
        {
            field: 'admin',
            headerName: payment.admin,
            valueGetter: params => params.row.admin.fullName,
            width:150
        },
        {
            field: 'type',
            headerName: payment.type,
            flex:1
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
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                                setpaymentId(params.value)
                                setpaymentName(params.row.type)
                                sendBatchInvoiceRef.current.openDialog()
                            }}
                        >
                            <Tooltip title={payment.sendBatchInvoiceButton}>
                                <SendIcon/>
                            </Tooltip>
                        </Button>
                        <Button size="small" variant="contained" color="info" onClick={() => handleEditButton(params.value)}>
                            <Tooltip title={strings.default.editText}>
                                <EditIcon/>
                            </Tooltip>
                        </Button>
                        <Button size="small" variant="contained" color="error" onClick={() => handleOpenDeleteDialog(params.value)}>
                            <Tooltip title={strings.default.deleteText}>
                                <DeleteIcon/>
                            </Tooltip>
                        </Button>
                    </ButtonGroup>
                )
            }
        }
    ]

    return (
        <>
            <PageHead
                title={paymentPage.titlePage}
            />
            <Box>
                <PanelContentHead
                    title={paymentPage.titlePage}
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
                        <Alert severity="warning" variant="filled">
                            {paymentPage.warningDeleteItem}
                        </Alert>
                    )}
                    url="/administrasi/payment"
                    refreshTableHandler={() => {
                        tableRef.current.refresh()
                    }}
                />
                <SendBatchInvoice
                    ref={sendBatchInvoiceRef}
                    paymentId={paymentId}
                    paymentName={paymentName}
                    callback={(isError, result) => {
                        if (!isError) {
                            tableRef.current.refresh()
                        }
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
        </>
    )
}

Payment.getLayout = page => <Panel>{page}</Panel>

export default Payment
