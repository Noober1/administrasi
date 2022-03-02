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
import History from '../../../organisms/InvoiceDetail/History'
import VerifyOrManualDialog from '../../../organisms/VerifyOrManualDialog'

const AdminWithInvoice = ({code}) => {
    const {panel:{pages:{invoiceWithCode}}, components: {invoiceDetailDialog}, default: defaultText} = useLocalization()
    const [refreshCount, setrefreshCount] = useState(0)
    const [data, fetchLoading, fetchError, errorMessage] = useFetchApi(`/administrasi/getInvoice?code=${code}&refresh=${refreshCount}`)
    const router = useRouter()
    const profile = useProfile()

    // invoice box
    const invoiceBoxRef = useRef();
    // verify or manual dialog
    const verifyOrManualDialogRef = useRef()
    const handleOpenVerifyOrManualDialog = invoiceCode => {
        verifyOrManualDialogRef.current.setInvoiceCode(invoiceCode)
        verifyOrManualDialogRef.current.openDialog()
    }
    // history dialog
    const historyRef = useRef();
    const handleOpenHistory = event => {
        if (typeof historyRef?.current?.openDialog == 'function') {
            historyRef.current.openDialog()
        }
    }

    const handleInvoicePrint = useReactToPrint({
        documentTitle:'Cetak Invoice',
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

    const handleClickActionButton = (event, code) => {
        if(setinvoiceData.status !== 'paid') {
            handleOpenVerifyOrManualDialog(code)
        } else {
            console.log('open setting')
        }
    }

    const InvoiceBox = forwardRef((props, ref) => {
        return (
            <Paper
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 shadow-lg print:shadow-none invoice-print-area"
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
                                    color={invoiceData.status == 'paid' ? 'green' : invoiceData.status == 'pending' ? 'orange' : 'red'}
                                >
                                    {
                                        invoiceData.status == 'unpaid' ? invoiceDetailDialog.statusUnpaid :
                                        invoiceData.status == 'paid' ? invoiceDetailDialog.statusPaid + ` (${invoiceData.paymentMethod})` :
                                        invoiceData.status == 'confirming' ? invoiceDetailDialog.statusConfirming :
                                        invoiceData.status == 'invalid' ? invoiceDetailDialog.statusInvalid :
                                        invoiceData.status == 'pending' ? invoiceDetailDialog.statusPending :
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
                        <table className="w-full table-invoice">
                            <thead>
                                <tr>
                                    <th>{invoiceDetailDialog.invoiceDate}</th>
                                    <th>{invoiceDetailDialog.paymentType}</th>
                                    <th>{invoiceDetailDialog.paymentPrice}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{tools.dateFormatting(invoiceData?.date?.invoice || new Date(), 'd M y', defaultText.nameOfMonths)}</td>
                                    <td>
                                        <Typography variant="body1" className="capitalize">
                                            {invoiceData?.payment?.type || ''}<br/>
                                            <Typography variant="caption" noWrap>
                                                {invoiceData?.payment?.description || ''}
                                            </Typography>
                                        </Typography>
                                    </td>
                                    <td>
                                        {(() => {
                                            let nominal = tools.rupiahFormatting(invoiceData?.payment?.price || 0)
                                            if (invoiceData?.status == 'pending') {
                                                nominal = nominal + ` (${invoiceDetailDialog.invoiceRemaining} ${tools.rupiahFormatting(invoiceData?.remainingPaymentHistory || 0)})`
                                            }
                                            return nominal
                                        })()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>
                <div className="col-span-3">
                    <Typography variant="h6" className="mt-2">
                        {invoiceDetailDialog.otherDetail}
                    </Typography>
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
                            
                        </>
                    )}
                    helpButtonHandler={event => console.log('triggered help button panel_content_head_title')}
                />
                {!fetchError ?
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
                        {!loading ?
                            <>
                                <Button variant="contained" onClick={handleInvoicePrint}>
                                    {invoiceWithCode.printText}
                                </Button>
                                <Button variant="contained" color="success" onClick={handleOpenHistory}>{invoiceDetailDialog.paymentHistoryButtonText}</Button>
                                
                                    <Button variant="outlined" onClick={event => handleClickActionButton(event, invoiceData.code)}>
                                        {
                                            invoiceData.status === 'paid' ? invoiceWithCode.settingText :
                                            invoiceData.status === 'confirming' ? invoiceWithCode.verificationText :
                                            invoiceData.status === 'pending' ? invoiceWithCode.manualPayText :
                                            invoiceData.status === 'invalid' ? invoiceWithCode.verificationText :
                                            invoiceWithCode.manualPayText
                                        }
                                    </Button>
                            </> : 
                            <>
                                <Skeleton variant='rectangular' className='h-10'/>
                                <Skeleton variant='rectangular' className='h-10'/>
                                <Skeleton variant='rectangular' className='h-10'/>
                                <Skeleton variant='rectangular' className='h-10'/>
                            </>
                            
                        }
                        </div>
                        <InvoiceBox ref={invoiceBoxRef}/>
                        {!loading && 
                            <>
                                <History ref={historyRef} data={invoiceData?.paymentHistory || []}/>
                                <VerifyOrManualDialog
                                    ref={verifyOrManualDialogRef}
                                    callback={() => {
                                        setrefreshCount(prevValue => prevValue + 1)
                                    }}
                                />
                            </>
                        }
                    </> : 
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