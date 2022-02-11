import { Button, ButtonGroup, Paper, Skeleton, Typography, Divider } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState, useEffect, forwardRef } from 'react'
import { useFetchApi } from '../../../../lib'
import useLocalization from '../../../../lib/useLocalization'
import { BackButton, PageHead } from '../../../atoms'
import { PanelContentHead } from '../../../atoms/dashboard'
import tools from '../../../../lib/tools'
import DetailText from '../../../organisms/InvoiceDetail/DetailText'
import { useUpdateEffect } from 'react-use'
import { useRouter } from 'next/router'
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'
import useProfile from '../../../../lib/useProfile'

const AdminWithInvoice = ({code}) => {
    const {panel:{pages:{invoiceWithCode}}, components: {invoiceDetailDialog}, default: defaultText} = useLocalization()
    const [data, fetchLoading, fetchError, errorMessage] = useFetchApi(`/administrasi/getInvoice?code=${code}`)
    const router = useRouter()
    const profile = useProfile()

    // invoice box
    const invoiceBoxRef = useRef();
    const handleInvoicePrint = useReactToPrint({
        documentTitle:'Cetak Invoice',
        pageStyle:`
            @page {
                orientation: landscape;
                size: 9,5cm 11cm;
            }
        `,
        content: () => invoiceBoxRef.current,
    });

    const [invoiceData, setinvoiceData] = useState({})
    const [bankAccount, setbankAccount] = useState(null)
    const [detailList, setdetailList] = useState(() => {
        return [1,2,3,4,5].map(item => ({
            title: '',content:''
        }))
    })

    const backButtonClickHandler = () => {
        if(fetchError) {
            router.push('/invoice')
        } else {
            router.back()
        }
    }

    const loading = fetchLoading || fetchError

    useUpdateEffect(() => {
        if (!fetchError && !loading) {
            setinvoiceData(data)
            setdetailList([
                {title: invoiceDetailDialog.refNumber, content: data.refNumber || '-'},
                {title: invoiceDetailDialog.accountNumber, content: data.accountNumber || '-'},
                {title: invoiceDetailDialog.transactionDate, content: data.date.transaction ? tools.dateFormatting(data.date.transaction, 'd M y - h:i:s', defaultText.nameOfMonths) : '-'},
                {title: invoiceDetailDialog.destinationAccount, content: data.destinationAccount || '-'},
                {title: invoiceDetailDialog.verificationDate, content: data.date.verification ? tools.dateFormatting(data.date.verification, 'd M y - h:i:s', defaultText.nameOfMonths) : '-'}
            ])
            if (data.sender) {
                setdetailList(prevValue => {
                    return [
                        ...prevValue,
                        {title: invoiceDetailDialog.senderName, content: data.sender},
                    ]
                })
            }
        }
    }, [loading])

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log('Component > AdminWithInvoice: invoiceData', invoiceData)
        }, [invoiceData])
    }

    const InvoiceBox = forwardRef((props, ref) => {
        return (
            <Paper
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 invoice-print-area shadow-lg print:shadow-none"
                elevation={0}
                ref={ref}
            >
                <div className="col-span-3 flex items-center mb-5">
                    <div className="flex-1">
                        {loading ?
                            <Skeleton variant="text" height="75px" width="75%"/> :
                            <Typography variant="h5">
                                {process.env.NEXT_PUBLIC_COMPANY_NAME}
                            </Typography>
                        }
                    </div>
                    <div className="flex-1">
                        {loading ? 
                            <div className="block">
                                <div className="w-3/4 mx-auto">
                                    <Skeleton variant="text" height="74px"/>
                                    <Skeleton variant="text" height="25px"/>
                                </div>
                            </div> :
                            <div>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    className="uppercase font-bold"
                                    color={invoiceData.status == 'unpaid' ? 'red' : 'green'}
                                >
                                    {
                                        invoiceData.status == 'unpaid' ? invoiceDetailDialog.statusUnpaid :
                                        invoiceData.status == 'paid' ? invoiceDetailDialog.statusPaid + ` (${invoiceData.paymentMethod})` :
                                        invoiceData.status == 'confirming' ? invoiceDetailDialog.statusConfirming :
                                        invoiceData.status == 'invalid' ? invoiceDetailDialog.statusInvalid :
                                        invoiceDetailDialog.statusUnknown
                                    }
                                </Typography>
                                <Typography variant="body1" align="center">
                                    {invoiceData.code || ''}
                                </Typography>
                            </div>
                        }
                    </div>
                </div>
                <div className='col-span-3 grid grid-cols-2 gap-4 mb-5'>
                    <div>
                        <Typography variant="h6">
                            {loading ? <Skeleton width="50%"/> : invoiceDetailDialog.sentTo}
                        </Typography>
                        <Typography className="capitalize">
                            {loading ? <Skeleton/> : invoiceData?.student?.fullName}
                        </Typography>
                    </div>
                    <div className="text-right">
                        <Typography variant="h6">
                            {loading ? <div className="grid grid-cols-4">
                                <span></span>
                                <Skeleton className="col-span-3"/>
                            </div> : invoiceDetailDialog.destinationAccount}
                        </Typography>
                        {loading ?
                            <div className="grid grid-cols-2">
                                <span></span>
                                <Skeleton/>
                                <span> </span>
                                <Skeleton/>
                            </div> : 
                            <>
                                <Typography>
                                    {bankAccount ?
                                        <>
                                            <span className="capitalize">Atas nama: {bankAccount.owner}</span><br/>
                                            {bankAccount.name}({bankAccount.alias})<br/>
                                            {bankAccount.number}
                                        </> : invoiceData?.destinationAccount || '-'
                                    }
                                </Typography>
                            </>
                        }
                    </div>
                </div>
                <div className="col-span-3">
                    {loading ? 
                        <div className="block">
                            <Skeleton height="150px"/>
                        </div> :
                        <DataGrid
                            disableColumnFilter
                            disableColumnMenu
                            disableSelectionOnClick
                            disableColumnSelector
                            disableExtendRowFullWidth
                            disableDensitySelector
                            autoHeight
                            columns={[
                                {
                                    field: 'date',
                                    headerName: invoiceDetailDialog.invoiceDate,
                                    width:150,
                                    valueGetter: params => tools.dateFormatting(params.value || new Date(), 'd M y', defaultText.nameOfMonths)
                                },
                                {
                                    field:'description',
                                    headerName: invoiceDetailDialog.paymentType,
                                    flex:1,
                                    renderCell: params => (
                                        <>
                                            <Typography variant="body1">
                                                {params.value}<br/>
                                                <Typography variant="caption" noWrap>
                                                    {invoiceData?.payment?.description || ''}
                                                </Typography>
                                            </Typography>
                                        </>
                                    )
                                },
                                {
                                    field:'price',
                                    headerName: invoiceDetailDialog.paymentPrice,
                                    flex:1
                                },
                            ]}
                            rows={[
                                {
                                    id: 1,
                                    date: invoiceData?.date?.invoice,
                                    description: invoiceData?.payment?.type || '',
                                    price: tools.rupiahFormatting(invoiceData?.payment?.price || 0)
                                }
                            ]}
                            hideFooter
                        />
                    }
                </div>
                <div className="col-span-3">
                    <DetailText
                        loading={loading}
                        list={detailList}
                    />
                </div>
                <div className="col-span-3 mt-10">
                    <div className="grid grid-cols-2">
                        <div> </div>
                        <div className="text-center">
                            <Typography className="mb-16" variant='h6'>
                                Administrator,
                            </Typography>
                            <Typography className="underline font-bold capitalize" variant='h6'>
                                {profile.fullName}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    });
    
    return (
        <>
            <PageHead
                title={invoiceWithCode.titlePage}
            />
            <Box>
                <PanelContentHead
                    title={invoiceWithCode.titlePage}
                    buttonGroup={(
                        <>
                            <BackButton onClick={backButtonClickHandler}/>
                            <Button variant="contained" onClick={handleInvoicePrint}>
                                {invoiceWithCode.printText}
                            </Button>
                        </>
                    )}
                    helpButtonHandler={event => console.log('triggered help button panel_content_head_title')}
                />
                {!fetchError ?
                    <div>
                        <InvoiceBox ref={invoiceBoxRef}/>
                    </div> : 
                    <Paper>
                        <div className="text-center block py-10">
                            <Typography variant="h5" className="mb-5">
                                {defaultText.anErrorOccured}<br/>{errorMessage}
                            </Typography>
                        </div>
                    </Paper>
                }
            </Box>
        </>
    )
}

export default AdminWithInvoice