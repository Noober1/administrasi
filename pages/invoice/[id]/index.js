import EditIcon from '@mui/icons-material/Edit'
import { Button, ButtonGroup, Paper, Typography } from '@mui/material'
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
import { BackButton, PageHead } from '../../../src/components/atoms'
import PaymentForm from '../../../src/components/templates/forms/paymentForm'
import { connect } from 'react-redux'
import fetchAPI from '../../../src/lib/fetchApi'
import Link from 'next/link'
import VerifyOrManualDialog from '../../../src/components/organisms/VerifyOrManualDialog'

const PaymentWithId = ({paymentId}) => {
    const tableRef = useRef(null)
    const verifyOrManualDialogRef = useRef(null)
    const { authToken } = useSelector(selectAuth)
    const strings = useLocalization()
    const { paymentWithId } = strings.panel.pages
    const { payment, invoice:invoiceText } = strings.table.columns
    const { invoice:invoiceTableText } = strings.table.columns
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

    const handleOpenVerifyOrManualDialog = invoiceCode => {
        verifyOrManualDialogRef.current.setInvoiceCode(invoiceCode)
        verifyOrManualDialogRef.current.openDialog()
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
            headerName: invoiceText.code,
            width:230
        },
        {
            field:'paymentMethod',
            headerName:invoiceText.paymentMethod,
            width:130,
            renderCell: params => <span className='capitalize'>{params.value}</span>
        },
        {
            field: 'status',
            headerName: invoiceText.status,
            width: 150,
            renderCell: params => (
                <div className="capitalize">
                    {
                        params.value == 'paid' ? invoiceTableText.statusPaid :
                        params.value == 'unpaid' ? invoiceTableText.statusUnpaid : 
                        params.value == 'confirming' ? invoiceTableText.statusConfirming : 
                        params.value == 'invalid' ? invoiceTableText.statusInvalid : invoiceTableText.statusUnknown
                    }
                </div>
            )
        },
        {
            field: 'student',
            headerName: invoiceText.studentFullName,
            flex:1,
            renderCell: params => <div className="capitalize">{params?.value?.fullName}</div>
        },
        {
            field: 'id',
            headerName: invoiceText.action,
            flex:1,
            renderCell: params => {
                return(
                    <ButtonGroup>
                        <Button size="small" variant="contained">
                            <Link href={`/invoice?code=${params.row.code}`}>
                                {invoiceTableText.actionPrint}
                            </Link>
                        </Button>
                        <Button onClick={() => handleOpenVerifyOrManualDialog(params.row.code)}>
                            {
                                params.row.status == 'confirming' ? invoiceTableText.actionVerify :
                                params.row.status == 'paid' ? '[EDIT]' :
                                invoiceTableText.actionManualPay
                            }
                        </Button>
                    </ButtonGroup>
                )
            }
        }
    ];

    return (
        <>
            <PageHead
                title={paymentWithId.titlePage}
            />
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
                    buttonGroup={(
                        <ButtonGroup>
                            <BackButton/>
                        </ButtonGroup>
                    )}
                    helpButtonHandler={() => console.log('help button from invoices triggered')}
                />
                <ServerSideTable
                    perPage="30"
                    ref={tableRef}
                    enableCheckbox={false}
                    showDeleteButton={false}
                    url={`/administrasi/payment/${paymentId}/invoices`}
                    columns={columns}
                />
                <VerifyOrManualDialog
                    ref={verifyOrManualDialogRef}
                    callback={isError => {
                        if (typeof tableRef.current.refresh == 'function') {
                            tableRef.current.refresh()
                        }
                    }}
                />
            </Box>
        </>
    )
}

PaymentWithId.getLayout = page => <Panel>{page}</Panel>

export const getServerSideProps = async({params}) => {
    try {
        const getDataFromApi = await fetchAPI('/administrasi/payment/' + params.id)
        return {
            props: {
                paymentId:params.id,
                data:getDataFromApi
            }
        }
    } catch (error) {
        return {
            notFound:true
        }
    }
}


export default connect(state => state)(PaymentWithId)
