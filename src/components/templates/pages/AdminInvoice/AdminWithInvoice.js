import { ButtonGroup, Paper, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState, useEffect } from 'react'
import { useFetchApi } from '../../../../lib'
import useLocalization from '../../../../lib/useLocalization'
import { BackButton, PageHead } from '../../../atoms'
import { PanelContentHead } from '../../../atoms/dashboard'
import tools from '../../../../lib/tools'
import DetailText from '../../../organisms/InvoiceDetail/DetailText'
import { useUpdateEffect } from 'react-use'
import { useRouter } from 'next/router'

const AdminWithInvoice = ({code}) => {
    const {panel:{pages:{invoiceWithCode}}, components: {invoiceDetailDialog}, default: defaultText} = useLocalization()
    const [data, fetchLoading, fetchError, errorMessage] = useFetchApi(`/administrasi/getInvoice?code=${code}`)
    const router = useRouter()

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
                {title: invoiceDetailDialog.paymentMethod, content: data.paymentMethod},
                {title: invoiceDetailDialog.refNumber, content: data.refNumber || '-'},
                {title: invoiceDetailDialog.accountNumber, content: data.accountNumber || '-'},
                {title: invoiceDetailDialog.transactionDate, content: data.date.transaction ? tools.dateFormatting(data.date.transaction, 'd M y - h:i:s', defaultText.nameOfMonths) : '-'},
                {title: invoiceDetailDialog.destinationAccount, content: data.destinationAccount || '-'},
                {title: invoiceDetailDialog.verificationDate, content: data.date.verification || '-'}
            ])
        }
    }, [loading])

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            console.log('Component > AdminWithInvoice: invoiceData', invoiceData)
        }, [invoiceData])
    }
    
    return (
        <>
            <PageHead
                title={invoiceWithCode.titlePage}
            />
            <Box>
                <PanelContentHead
                    title={invoiceWithCode.titlePage}
                    buttonGroup={(
                        <ButtonGroup>
                            <BackButton onClick={backButtonClickHandler}/>
                        </ButtonGroup>
                    )}
                    helpButtonHandler={event => console.log('triggered help button panel_content_head_title')}
                />
                {!fetchError ?
                    <Paper
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5"
                        style={{
                            maxWidth:'210cm'
                        }}
                        elevation={0}
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
                                                invoiceData.status == 'paid' ? invoiceDetailDialog.statusPaid :
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
                                            width:170
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
                    </Paper> : 
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