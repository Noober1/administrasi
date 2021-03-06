import { Alert, Button, ButtonGroup, Paper, Typography } from '@mui/material'
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
import VerifyOrManualDialog from '../../../src/components/organisms/VerifyOrManualDialog'
import ButtonResponsive from '../../../src/components/atoms/ButtonResponsive'
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router'

const PaymentWithId = ({ paymentId }) => {
    const router = useRouter()
    const tableRef = useRef(null)
    const verifyOrManualDialogRef = useRef(null)
    const { authToken } = useSelector(selectAuth)
    const strings = useLocalization()
    const { paymentWithId } = strings.panel.pages
    const { payment, invoice: invoiceText } = strings.table.columns
    const { invoice: invoiceTableText } = strings.table.columns
    const [paymentDetailData, setpaymentDetailData] = useState({})
    const [refreshCount, setrefreshCount] = useState(0)


    const [formOpen, setformOpen] = useState(false)

    const url = `/administrasi/payment/${paymentId}?refreshCount=${refreshCount}`
    const [data, loading, fetchError, errorMessage] = useFetchApi(url, {
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
        { title: payment.registerDate, content: tools.dateFormatting(paymentDetailData?.registerDate) },
        { title: payment.admin, content: paymentDetailData?.admin?.fullName },
        { title: payment.type, content: paymentDetailData?.type },
        { title: payment.price, content: tools.rupiahFormatting(paymentDetailData?.price) },
        { title: payment.description, content: paymentDetailData?.description },
    ]

    const columns = [
        {
            field: 'code',
            headerName: invoiceText.code,
            width: 230
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
                                    params.value == 'invalid' ? invoiceTableText.statusInvalid :
                                        params.value == 'pending' ? invoiceTableText.statusPending :
                                            invoiceTableText.statusUnknown
                    }
                </div>
            )
        },
        {
            field: 'student',
            headerName: invoiceText.studentFullName,
            flex: 1,
            renderCell: params => <div className="capitalize">{params?.value?.fullName}</div>
        },
        {
            field: 'id',
            headerName: invoiceText.action,
            flex: 1,
            renderCell: params => {
                var text;
                var icon;
                switch (params.row.status) {
                    case 'confirming':
                        text = invoiceTableText.actionVerify
                        icon = <CheckIcon />
                        break;
                    case 'paid':
                        text = invoiceTableText.statusPaid
                        icon = <EditIcon />
                        break;
                    default:
                        text = invoiceTableText.actionManualPay
                        icon = <AddIcon />
                        break;
                }
                return (
                    <ButtonGroup>
                        <ButtonResponsive size="small" variant="contained" startIcon={<InfoIcon />} iconFromScreen="lg" onClick={() => router.push(`/invoice?code=${params.row.code}`)}>
                            {invoiceTableText.actionDetail}
                        </ButtonResponsive>
                        <ButtonResponsive
                            onClick={() => handleOpenVerifyOrManualDialog(params.row.code)}
                            size='small'
                            iconFromScreen="lg"
                            startIcon={icon}
                        >
                            {text}
                        </ButtonResponsive>
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
                            <BackButton />
                            <ButtonGroup>
                                <Button variant="contained" color="info" startIcon={<EditIcon />} onClick={() => handleEditButton(paymentId)}>
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
                            <BackButton />
                        </ButtonGroup>
                    )}
                    helpButtonHandler={() => console.log('help button from invoices triggered')}
                />
                <ServerSideTable
                    perPage="30"
                    ref={tableRef}
                    deleteUrl='/administrasi/invoice'
                    deleteAdditionalMessage={(
                        <Alert severity='warning' variant="filled">
                            {paymentWithId.deleteWarningMessage}
                        </Alert>
                    )}
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

export const getServerSideProps = async ({ params }) => {
    try {
        const getDataFromApi = await fetchAPI('/administrasi/payment/' + params.id)
        return {
            props: {
                paymentId: params.id,
                data: getDataFromApi
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}


export default connect(state => state)(PaymentWithId)
