import EditIcon from '@mui/icons-material/Edit'
import { Button, ButtonGroup } from '@mui/material'
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
import { BackButton } from '../../../src/components/atoms'
import PaymentForm from '../../../src/components/templates/forms/paymentForm'

const PaymentWithId = ({paymentId}) => {
    const tableRef = useRef(null)
    const { authToken } = useSelector(selectAuth)
    const strings = useLocalization()
    const { paymentWithId } = strings.panel.pages
    const { payment } = strings.table.columns
    const [paymentDetailData, setpaymentDetailData] = useState({})
    const [refreshCount, setrefreshCount] = useState(0)

    const [formOpen, setformOpen] = useState(false)

    const url = `/administrasi/payment/${paymentId}?refreshCount=${refreshCount}`
    const [data, loading, fetchError, errorMessage] = useFetchApi(url,{
        url,
        headers: {
			Authorization: 'Bearer ' + authToken
		}
    })

    const handleEditButton = id => {
        setformOpen(true)
    }

    const handleFormCallback = (error, data) => {
        if (!error) {
            setrefreshCount(refreshCount + 1)
        }
    }

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
            width:130,
            valueGetter: params => params.value ?? '-'
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
                    <>
                    <BackButton/>
                    <ButtonGroup>
                        <Button variant="contained" color="info" startIcon={<EditIcon/>} onClick={() => handleEditButton(paymentId)}>
                            {strings.default.editText}
                        </Button>
                    </ButtonGroup>
                    </>
                )}
                helpButtonHandler={() => console.log('help button clicked')}
            />
            <PaymentForm
                open={formOpen}
                mode="edit"
                id={paymentId}
                handleClose={() => setformOpen(false)}
                callback={handleFormCallback}
            />
            <Box className="mb-5">
                <DetailPaper
                    loading={loading}
                    error={fetchError}
                    title={strings.default.detailText}
                    list={detailList}
                />
            </Box>
            <PanelContentHead
                title={paymentWithId.invoiceTableTitle}
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
