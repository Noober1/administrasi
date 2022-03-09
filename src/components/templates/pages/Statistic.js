import { Paper } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchApi } from '../../../lib'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import { setDialog } from '../../../lib/redux/slices/noPersistConfigSlice'
import useLocalization from '../../../lib/useLocalization'
import StatsCard from '../../organisms/StatsCard'

const Statistic = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { authToken } = useSelector(selectAuth)
	const [data, loading, error, errorData ] = useFetchApi('/administrasi',{
        url: '/administrasi',
        headers: {
			Authorization: 'Bearer ' + authToken
		}
    })
	const {panel: {pages: {dashboard:dashboardText}}} = useLocalization()

	const handleClickGrid = search => {
		dispatch(setDialog({
			name: 'findInvoiceDialog',
			open: true,
			searchValue: search
		}))
	}

	if(error) { 
		return(
			<Paper>Error</Paper>
		)
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2'>
			<StatsCard onClick={() => handleClickGrid('')} loading={loading} value={data?.statistic?.total} title={dashboardText.totalText} description={dashboardText.totalDescriptionText}/>
			<StatsCard onClick={() => handleClickGrid('paid')} loading={loading} value={data?.statistic?.paid} title={dashboardText.paidText} description={dashboardText.paidDescriptionText}/>
			<StatsCard onClick={() => handleClickGrid('verification')} loading={loading} value={data?.statistic?.verifying} title={dashboardText.verifyingText} description={dashboardText.verifyingDescriptionText}/>
			<StatsCard onClick={() => handleClickGrid('pending')} loading={loading} value={data?.statistic?.pending} title={dashboardText.pendingText} description={dashboardText.pendingDescriptionText}/>
			<StatsCard onClick={() => handleClickGrid('invalid')} loading={loading} value={data?.statistic?.invalid} title={dashboardText.invalidText} description={dashboardText.invalidDescriptionText}/>
			<StatsCard onClick={() => handleClickGrid('unpaid')} loading={loading} value={data?.statistic?.unpaid} title={dashboardText.unpaidText} description={dashboardText.unpaidDescriptionText}/>
		</div>
	)
}

export default Statistic