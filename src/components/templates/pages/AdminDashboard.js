import { Button, Typography } from '@mui/material'
import { PageHead } from '../../atoms'
import Statistic from './Statistic'
import useLocalization from '../../../lib/useLocalization'
import { setDialog } from '../../../lib/redux/slices/noPersistConfigSlice'
import { useDispatch } from 'react-redux'

const AdminDashboard = () => {
	const {panel:{pages:{dashboard:dashboardText}}} = useLocalization()
	const dispatch = useDispatch()
	const handleOpenSearchInvoice = () => {
		dispatch(setDialog({
			name: 'findInvoiceDialog',
			open:true
		}))
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
			</div>
		</div>
	)
}

export default AdminDashboard