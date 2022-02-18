import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Skeleton, Typography } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import { useSelector } from 'react-redux'
import { useUpdateEffect } from 'react-use'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { tools } from '../../../lib'
import DetailText from './DetailText'
import { DataGrid } from '@mui/x-data-grid'
import { ServerSideSelect } from '../../molecules'
import SendReceipt from '../SendReceipt'
import { DraggablePaperComponent } from '../../atoms'
import { useReactToPrint } from 'react-to-print'

const InvoiceDetail = forwardRef((props,ref) => {
    const receiptDialog = useRef(null)
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
        pageStyle:`
            @page {
                orientation: landscape;
                size: 9,5cm 11cm;
            }
        `,
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

    const InvoiceBox = forwardRef((propx, ref) => {
        return(
            <DialogContent
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
                                    color={fetchData.status == 'paid' ? 'green' : fetchData.status == 'pending' ? 'orange' : 'green'}
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
                            {loading ? <Skeleton/> : fetchData?.student?.fullName
                            }
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
                                                    {fetchData?.payment?.description || ''}
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
                                    date: fetchData?.date?.invoice,
                                    description: fetchData?.payment?.type || '',
                                    price: tools.rupiahFormatting(fetchData?.payment?.price || 0)
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
                PaperComponent={DraggablePaperComponent}
            >
                <DialogTitle className="cursor-move"></DialogTitle>
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
                        <DialogActions className="p-5">
                            {loading ?
                                <Skeleton width="50%" height="75px"/> :
                                <>
                                    <Button variant="contained" color="secondary" onClick={helpButtonHandler} startIcon={<HelpOutlineIcon/>}>
                                        {defaultText.helpButtonLabel}
                                    </Button>
                                    <Button variant="contained" onClick={openReceiptDialog}>
                                        {invoiceDetailDialog.actionSendPaymentDetail}
                                    </Button>
                                    <Button variant="contained" onClick={handleInvoicePrint}>
                                        {invoiceDetailDialog.actionPrint}
                                    </Button>
                                    <Button variant="contained" color="error" onClick={closeDialog}>
                                        {defaultText.closeText}
                                    </Button>
                                </>
                            }
                        </DialogActions>
                    </>
                }
            </Dialog>
            {Object.keys(fetchData).length > 0 &&
                <SendReceipt
                    ref={receiptDialog}
                    invoiceId={fetchData?.id || 0}
                    transactionDate={fetchData?.date?.transaction}
                    accountNumber={fetchData?.accountNumber}
                    sender={fetchData?.sender}
                    refNumber={fetchData?.refNumber}
                    callback={callbackSendReceipt}
                />
            }
        </>
    )
})

InvoiceDetail.propTypes = {
    
}

export default InvoiceDetail
