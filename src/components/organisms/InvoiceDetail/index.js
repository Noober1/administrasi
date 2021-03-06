import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Skeleton, Typography, useMediaQuery } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import { useSelector } from 'react-redux'
import { useMedia, useUpdateEffect } from 'react-use'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
// icons
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';
import SendIcon from '@mui/icons-material/Send';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';

import { tools } from '../../../lib'
import DetailText from './DetailText'
import { DataGrid } from '@mui/x-data-grid'
import { ServerSideSelect } from '../../molecules'
import SendReceipt from '../SendReceipt'
import { DraggablePaperComponent } from '../../atoms'
import { useReactToPrint } from 'react-to-print'
import History from './History'

const InvoiceDetail = forwardRef((props,ref) => {
    const receiptDialog = useRef(null)
    const historyRef = useRef(null)
    const [refreshCount, setrefreshCount] = useState(0)
    const { default:defaultText, components: {invoiceDetailDialog} } = useLocalization()
    const [open, setopen] = useState(false)
    const [bankAccount, setbankAccount] = useState(null)
    const [invoiceCode, setinvoiceCode] = useState(null)
    const [fetchData, setfetchData] = useState({})
    const [fetchLoading, setfetchLoading] = useState(true)
    const [fetchError, setfetchError] = useState(false)
    const [fetchErrorMessage, setfetchErrorMessage] = useState('')
    const [detailList, setdetailList] = useState(() => {
        return [1,2,3,4,5].map(item => ({
            title: '',content:''
        }))
    })
    const { authToken } = useSelector(selectAuth)
    const isMediumScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

    const loading = fetchLoading
    const url = `/administrasi/getInvoice/?code=${invoiceCode}`

    const openDialog = () => setopen(true)
    const closeDialog = () => {
        if (fetchError) {
            setfetchData({})
            setfetchLoading(true)
            setfetchError(false)
            setfetchErrorMessage('')
            setinvoiceCode(null)
        }
        setopen(false)
    }

    // TODO: helper button popup
    const helpButtonHandler = () => {

    }

    const callbackSendReceipt = (error, data) => {
        if (!error) {
            setrefreshCount(prevValue => prevValue + 1)
        }
    }

    // print invoice
    const invoiceBoxRef = useRef()
    const handleInvoicePrint = useReactToPrint({
        documentTitle:'Cetak Invoice',
        content: () => invoiceBoxRef.current,
    });

    if(process.env.NODE_ENV === 'development') {
        useUpdateEffect(() => {
            console.log('Component > Invoice Detail: Bank Account Data Fetch', bankAccount)
        }, [bankAccount])
    }
    
    useUpdateEffect(() => {
        if (invoiceCode && open) {
            setfetchLoading(true)
            setfetchError(false)
            setfetchErrorMessage('')
            fetchAPI(fetchWithToken({
                url: url,
                token: authToken
            }))
            .then(result => {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Component > InvoiceDetail = fetching result:', result)
                }
                setfetchLoading(false)
                setfetchData(result)
                setdetailList([
                    {title: invoiceDetailDialog.refNumber, content: result.refNumber || '-'},
                    {title: invoiceDetailDialog.accountNumber, content: result.accountNumber || '-'},
                    {title: invoiceDetailDialog.transactionDate, content: result.date.transaction ? tools.dateFormatting(result.date.transaction, 'd M y - h:i:s', defaultText.nameOfMonths) : '-'},
                    {title: invoiceDetailDialog.destinationAccount, content: result.destinationAccount || '-'},
                    {title: invoiceDetailDialog.verificationDate, content: result.date.verification ? tools.dateFormatting(result.date.verification, 'd M y - h:i:s', defaultText.nameOfMonths) : '-'},
                ])
                if (result.sender) {
                    setdetailList(prevValue => {
                        return [
                            ...prevValue,
                            {title: invoiceDetailDialog.senderName, content: result.sender},
                        ]
                    })
                }
            })
            .catch(error => {
                setfetchError(true)
                setfetchErrorMessage(error?.response?.data?.code)
                if (process.env.NODE_ENV === 'development') {
                    console.log('Component > InvoiceDetail = fetching error:', error)
                }
            })
        }
    }, [invoiceCode, refreshCount])

    useImperativeHandle(ref, () => ({
        open: open,
        openDialog,
        closeDialog,
        setInvoice: code => setinvoiceCode(code)
    }))

    const openReceiptDialog = event => {
        if (!fetchData) return
        if (fetchData.status !== 'paid') {
            receiptDialog.current.openSendReceiptDialog()
        }
    }

    const handleOpenHistory = () => {
        historyRef.current.openDialog()
    }

    const InvoiceBox = forwardRef((props, ref) => {
        return(
            <DialogContent
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 invoice-print-area"
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
                                    color={fetchData.status == 'paid' ? 'green' : fetchData.status == 'pending' ? 'orange' : 'red'}
                                >
                                    {fetchData.status == 'unpaid' ? invoiceDetailDialog.statusUnpaid :
                                    fetchData.status == 'paid' ? invoiceDetailDialog.statusPaid + ` (${fetchData.paymentMethod})` :
                                    fetchData.status == 'confirming' ? invoiceDetailDialog.statusConfirming :
                                    fetchData.status == 'invalid' ? invoiceDetailDialog.statusInvalid :
                                    fetchData.status == 'pending' ? invoiceDetailDialog.statusPending :
                                    invoiceDetailDialog.statusUnknown
                                    }
                                </Typography>
                                <Typography variant="body1" align="center">
                                    {fetchData.code || ''}
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
                            {loading ? <Skeleton/> : fetchData?.student?.fullName}
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
                                        </> : fetchData?.destinationAccount || '-'
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
                                    <td>{tools.dateFormatting(fetchData?.date?.invoice || new Date(), 'd M y', defaultText.nameOfMonths)}</td>
                                    <td>
                                        <Typography variant="body1" className="capitalize">
                                            {fetchData?.payment?.type || ''}<br/>
                                            <Typography variant="caption" noWrap>
                                                {fetchData?.payment?.description || ''}
                                            </Typography>
                                        </Typography>
                                    </td>
                                    <td>
                                        {(() => {
                                            let nominal = tools.rupiahFormatting(fetchData?.payment?.price || 0)
                                            if (fetchData?.status == 'pending') {
                                                nominal = nominal + ` (${invoiceDetailDialog.invoiceRemaining} ${tools.rupiahFormatting(fetchData?.remainingPaymentHistory || 0)})`
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
            </DialogContent>
        )
    })

    return (
        <>
            <Dialog
                open={open}
                maxWidth="md"
                onClose={closeDialog}
                scroll="body"
                fullWidth
                fullScreen={isMediumScreen}
                PaperComponent={DraggablePaperComponent}
                PaperProps={{
                    smallScreen: "md",
                }}
            >
                <DialogTitle></DialogTitle>
                {fetchError &&
                    <div className="text-center block py-10">
                        <Typography variant="h5" className="mb-5">
                            {defaultText.anErrorOccured} {fetchErrorMessage}
                        </Typography>
                        <Button variant="contained" color="error" size="large" onClick={closeDialog}>
                            {defaultText.closeText}
                        </Button>
                    </div>
                }
                {!fetchError &&
                    <>
                        <InvoiceBox ref={invoiceBoxRef}/>
                        <DialogActions>
                            {loading ?
                                <Skeleton width="50%" height="75px"/> :
                                <div className="w-full grid grid-cols-1 gap-2 md:flex md:justify-end">
                                    <Button startIcon={<HelpOutlineIcon/>} variant="contained" color="secondary" onClick={helpButtonHandler}>
                                        {defaultText.helpButtonLabel}
                                    </Button>
                                    <Button startIcon={<HistoryIcon/>} variant="contained" color="info" onClick={handleOpenHistory}>
                                        {invoiceDetailDialog.paymentHistoryButtonText}
                                    </Button>
                                    {fetchData?.status !== 'paid' &&
                                        <Button startIcon={<SendIcon/>} variant="contained" onClick={openReceiptDialog}>
                                            {invoiceDetailDialog.actionSendPaymentDetail}
                                        </Button>
                                    }
                                    <Button startIcon={<PrintIcon/>} variant="contained" onClick={handleInvoicePrint}>
                                        {invoiceDetailDialog.actionPrint}
                                    </Button>
                                    <Button startIcon={<CloseIcon/>} variant="contained" color="error" onClick={closeDialog}>
                                        {defaultText.closeText}
                                    </Button>
                                </div>
                            }
                        </DialogActions>
                    </>
                }
            </Dialog>
            {Object.keys(fetchData).length > 0 &&
                <>
                    <SendReceipt
                        ref={receiptDialog}
                        invoiceId={fetchData?.id || 0}
                        transactionDate={fetchData?.date?.transaction}
                        accountNumber={fetchData?.accountNumber}
                        sender={fetchData?.sender}
                        refNumber={fetchData?.refNumber}
                        callback={callbackSendReceipt}
                    />
                    <History
                        ref={historyRef}
                        data={fetchData?.paymentHistory || []}
                    />
                </>
            }
        </>
    )
})

InvoiceDetail.propTypes = {
    
}

export default InvoiceDetail
