import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton, Typography } from '@mui/material'
import useLocalization from '../../../lib/useLocalization'
import { useFetchApi } from '../../../lib'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import { useSelector } from 'react-redux'
import { useUpdateEffect } from 'react-use'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import { DetailPaper } from '..'
import { tools } from '../../../lib'
import DetailText from './DetailText'

const InvoiceDetail = forwardRef((props,ref) => {
    const { default:defaultText, components: {invoiceDetailDialog} } = useLocalization()
    const [open, setopen] = useState(false)
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
    const closeDialog = () => setopen(false)

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
                    {title: invoiceDetailDialog.invoiceDate, content: tools.dateFormatting(result.date.invoice || new Date(), 'd M y', defaultText.nameOfMonths)},
                    {title: invoiceDetailDialog.refNumber, content: result.refNumber || '-'},
                    {title: invoiceDetailDialog.sentTo, content: result.student.fullName},
                    {title: invoiceDetailDialog.status, content: result.status},
                    {title: invoiceDetailDialog.accountNumber, content: result.accountNumber || '-'},
                    {title: invoiceDetailDialog.destinationAccount, content: result.destinationAccount || '-'},
                    {title: invoiceDetailDialog.transactionDate, content: result.date.transaction || '-'},
                    {title: invoiceDetailDialog.verificationDate, content: result.date.verification || '-'}
                ])
            })
            .catch(error => {
                setfetchError(true)
                setfetchErrorMessage(error?.response?.data?.code)
                if (process.env.NODE_ENV === 'development') {
                    console.log('Component > InvoiceDetail = fetching error:', error)
                }
            })
        }
    }, [invoiceCode])

    useImperativeHandle(ref, () => ({
        open: open,
        openDialog,
        closeDialog,
        setInvoice: code => setinvoiceCode(code)
    }))

    return (
        <Dialog
            open={open}
            maxWidth="md"
            onClose={closeDialog}
            fullWidth
        >
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
                    <DialogContent
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
                                        <Typography variant="h4" align="center" className="uppercase font-bold" color={fetchData.status == 'unpaid' ? 'red' : 'green'}>
                                            {fetchData.status == 'unpaid' ? invoiceDetailDialog.statusUnpaid :
                                            fetchData.status == 'paid' ? invoiceDetailDialog.statusPaid :
                                            fetchData.status == 'confirming' ? invoiceDetailDialog.statusConfirming :
                                            fetchData.status == 'invalid' ? invoiceDetailDialog.statusInvalid :
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
                        <div className="col-span-3">
                            <DetailText
                                loading={loading}
                                list={detailList}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions className="p-5">
                        <Button variant="contained" size="large">
                            {invoiceDetailDialog.actionSendPaymentDetail}
                        </Button>
                        <Button variant="contained" size="large">
                            {invoiceDetailDialog.actionPrint}
                        </Button>
                        <Button variant="contained" color="error" size="large" onClick={closeDialog}>
                            {defaultText.closeText}
                        </Button>
                    </DialogActions>
                </>
            }
        </Dialog>
    )
})

InvoiceDetail.propTypes = {
    
}

export default InvoiceDetail
