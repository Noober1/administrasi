import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import useLocalization from '../../../lib/useLocalization'
import { Box } from '@mui/system'
import { PanelContentHead } from '../../atoms/dashboard'
import { Button, ButtonGroup, Typography } from '@mui/material'
import { BackButton } from '../../atoms'
import { ServerSideTable } from '..'
import { tools } from '../../../lib'
import { InvoiceDetail } from '../../organisms'

const StudentInvoice = props => {
    const invoiceDetailRef = useRef(null)
    const {panel: {pages: { invoiceWithCode, invoice:invoicePage }}, table: {columns:{invoice:invoiceTable}},default:{nameOfMonths}} = useLocalization()

    const openInvoiceDetail = code => {
        invoiceDetailRef.current.setInvoice(code)
        invoiceDetailRef.current.openDialog(true)
    }

    if (props.code) {
        return(
            <Box>
                <PanelContentHead
                    title={invoiceWithCode.titlePage}
                    buttonGroup={
                        <BackButton/>
                    }
                    helpButtonHandler={() => console.log('should show help')}
                />
                <Typography>
                    Disini sih seharusnya kontent {props.code}
                </Typography>
            </Box>
        )
    }

    const columns = [
        {
            field:'code',
            headerName:invoiceTable.code,
            width:250
        },
        {
            field:'date',
            headerName:invoiceTable.date,
            valueGetter: params => tools.dateFormatting(params.value.invoice,'d M y - h:i:s', nameOfMonths),
            width:250
        },
        {
            field:'status',
            headerName:invoiceTable.status,
            width:175,
            renderCell: params => {
                let label = ''
                let color = ''
                switch (params.value) {
                    case 'paid':
                        label = invoiceTable.statusPaid
                        color = 'success'
                        break;
                    case 'unpaid':
                        label = invoiceTable.statusUnpaid
                        color = 'error'
                        break;
                    case 'confirming':
                        label = invoiceTable.statusConfirming
                        color = 'info'
                        break;
                    case 'invalid':
                        label = invoiceTable.statusInvalid
                        color = 'secondary'
                        break;
                    case 'pending':
                        label = invoiceTable.statusPending
                        color = 'warning'
                        break;
                    default:
                        label = invoiceTable.statusUnknown
                        color = 'warning'
                        break;
                }
                return(
                    <Button variant="contained" color={color} fullWidth>
                        {label}
                    </Button>
                )
            }
        },
        {
            field: 'id',
            headerName: invoiceTable.action,
            flex:1,
            renderCell: params => {
                let label = invoiceTable.statusUnknown
                let color = 'warning'
                const { status } = params.row
                switch (status) {
                    case 'paid':
                        label = invoiceTable.statusPaid
                        color = 'success'
                        break;
                    case 'unpaid':
                    case 'pending':
                        label = invoiceTable.actionSendPaymentDetail
                        color = 'primary'
                        break;
                    case 'invalid':
                        label = invoiceTable.actionResendPaymentDetail
                        color = 'primary'
                        break;
                }
                return(
                    <ButtonGroup>
                        <Button variant="contained" color="primary" onClick={() => openInvoiceDetail(params.row.code)}>
                            {invoiceTable.actionDetail}
                        </Button>
                    </ButtonGroup>
                )
            }
        }
    ]
    
    return (
        <Box>
            <PanelContentHead
                title={invoicePage.titlePage}
                buttonGroup={
                    <BackButton/>
                }
                helpButtonHandler={() => console.log('should show help')}
            />
            <ServerSideTable
                url={`/administrasi/invoice`}
                columns={columns}
                enableCheckbox={false}
            />
            <InvoiceDetail
                ref={invoiceDetailRef}
            />
        </Box>
    )
}

StudentInvoice.defaultProps = {
    code: null
}

StudentInvoice.propTypes = {
    code: PropTypes.oneOfType([
        PropTypes.string
    ])
}

export default StudentInvoice
