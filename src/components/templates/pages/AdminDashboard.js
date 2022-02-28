import { Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { PageHead } from '../../atoms'
import Statistic from './Statistic'
import FindInvoiceDialog from '../../organisms/findInvoiceDialog'
import useLocalization from '../../../lib/useLocalization'

const AdminDashboard = () => {
	const {panel:{pages:{dashboard:dashboardText}}} = useLocalization()
	const searchInvoiceDialogRef = useRef(null)
	const handleOpenSearchInvoice = event => {
		searchInvoiceDialogRef.current.openDialog()
	}

	return (
		<div className='mt-5'>
			<PageHead title='Dashboard'/>
			<div className="my-5">
				<Typography variant='h5'>
					{dashboardText.statisticTitle}
				</Typography>
				<Statistic/>
			</div>
			<div className="my-5">
				<Typography variant='h5' gutterBottom>
					{dashboardText.toolsTitle}
				</Typography>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2'>
					<Button onClick={handleOpenSearchInvoice} variant='contained'>{dashboardText.toolsFindInvoice}</Button>
				</div>
				<FindInvoiceDialog ref={searchInvoiceDialogRef}/>
			</div>
		</div>
	)
}

export default AdminDashboard