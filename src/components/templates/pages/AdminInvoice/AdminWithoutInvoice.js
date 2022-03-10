import React, { useRef } from 'react'
import useLocalization from '../../../../lib/useLocalization'
import Box from '@mui/system/Box'
import PanelContentHead from '../../../atoms/dashboard/PanelContentHead'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ServerSideTable from '../../serverSideTable'
import tools from '../../../../lib/tools'
import ButtonResponsive from '../../../atoms/ButtonResponsive'
import InfoIcon from '@mui/icons-material/Info';
import { PageHead } from '../../../atoms'
import Link from 'next/link'

const AdminWithoutInvoice = () => {
    const {panel: {pages: { invoice }},table:{columns:{payment}}, default: stringDef} = useLocalization()
    const adminInvoiceTableRef = useRef(null);
    const adminInvoiceTableColumns = [
        {
            field:'registerDate',
            headerName:payment.registerDate,
            valueGetter: params => tools.dateFormatting(params.value,'d M y', stringDef.nameOfMonths),
            width: 200
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
                        <ButtonResponsive size="small" variant="contained" iconFromScreen="md" startIcon={<InfoIcon/>}>
                            <Link href={`/invoice/${params.value}`}>
                                {stringDef.detailText}
                            </Link>
                        </ButtonResponsive>
                    </ButtonGroup>
                )
            }
        }
    ]

    return(
        <>
            <PageHead
                title={invoice.titlePage}
            />
            <Box>
                <PanelContentHead
                    title={invoice.titlePage}
                    helpButtonHandler={event => console.log('triggered help button panel_content_head_title')}
                />
                <ServerSideTable
                    ref={adminInvoiceTableRef}
                    url='/administrasi/payment'
                    showDeleteButton={false}
                    columns={adminInvoiceTableColumns}
                    enableCheckbox={false}
                />
            </Box>
        </>
    )
}

export default AdminWithoutInvoice