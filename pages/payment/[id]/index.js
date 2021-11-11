import StarIcon from '@mui/icons-material/Star'
import EditIcon from '@mui/icons-material/Edit'
import { Button, ButtonGroup, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { PanelContentHead } from '../../../src/components/atoms/dashboard'
import { Panel, ServerSideTable } from '../../../src/components/templates'
import useLocalization from '../../../src/lib/useLocalization'
import { DetailPaper } from '../../../src/components/organisms'
import useFetchApi from '../../../src/lib/useFetchApi'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../src/lib/redux/slices/authSlice'
import { tools } from '../../../src/lib'

const PaymentWithId = ({paymentId}) => {
    const tableRef = useRef(null)
    const { authToken } = useSelector(selectAuth)
    const strings = useLocalization()
    const { paymentWithId } = strings.panel.pages
    const { payment } = strings.table.columns
    const [paymentDetailData, setpaymentDetailData] = useState({})

    const [data, loading, fetchError, errorMessage] = useFetchApi(null,{
        url: `/administrasi/payment/${paymentId}`,
        headers: {
			Authorization: 'Bearer ' + authToken
		}
    })

    useEffect(() => {
        if (!loading) {
            setpaymentDetailData(data)
        }
    }, [loading])

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log('Pages > useState = paymentDetailData:', paymentDetailData)
        }, [paymentDetailData])
    }
    

    const detailList = [
        {title: payment.registerDate, content: tools.dateFormatting(paymentDetailData?.registerDate)},
        {title: payment.admin, content: paymentDetailData?.admin?.fullName},
        {title: payment.type, content: paymentDetailData?.type},
        {title: payment.price, content: tools.rupiahFormatting(paymentDetailData?.price)},
        {title: payment.description, content: paymentDetailData?.description},
    ]

    const columns = [
        {
            field:'code',
            headerName:'No. Invoice',
            width:130
        },
        {
            field: 'paymentMethod',
            headerName: 'Metode Pembayaran',
            width: 150,
            renderCell: params => <div className="capitalize">{params.value}</div>
        },
        {
            field: 'student',
            headerName: 'Nama Siswa',
            flex:1,
            renderCell: params => <div className="capitalize">{params?.value?.fullName}</div>
        },
        {
            field:'destinationAccount',
            headerName:'Tujuan Rekening',
            width:130
        },
        {
            field: 'id',
            headerName: 'Aksi',
            flex:1,
            renderCell: params => {
                return(
                    <ButtonGroup>
                        <Button size="small" variant="contained" color="info" onClick={() => handleEditButton(params.value)}>
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
                title={paymentWithId.titlePage}
                buttonGroup={(
                    <ButtonGroup>
                        <Button variant="contained" color="info" startIcon={<EditIcon/>}>
                            {strings.default.editText}
                        </Button>
                    </ButtonGroup>
                )}
                helpButtonHandler={() => console.log('help button clicked')}
            />
            <DetailPaper
                loading={loading}
                error={fetchError}
                title={strings.default.detailText}
                list={detailList}
            />
            <PanelContentHead
                title="[INVOICES]"
                helpButtonHandler={() => console.log('help button from invoices triggered')}
            />
            <ServerSideTable
                ref={tableRef}
                enableCheckbox={false}
                showDeleteButton={false}
                url={`/administrasi/payment/${paymentId}/invoices`}
                columns={columns}
            />
        </Box>
    )
}

export function getServerSideProps({params}){
    return {
        props:{
            paymentId: params.id
        }
    }
}

PaymentWithId.getLayout = page => <Panel>{page}</Panel>

export default PaymentWithId
