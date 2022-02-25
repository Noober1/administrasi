import { Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchApi } from '../../../lib'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import useLocalization from '../../../lib/useLocalization'
import StatsCard from '../../organisms/StatsCard'

const Statistic = () => {
	const { authToken } = useSelector(selectAuth)
	const [data, loading, error, errorData ] = useFetchApi('/administrasi',{
        url: '/administrasi',
        headers: {
			Authorization: 'Bearer ' + authToken
		}
    })
	const {panel: {pages: {dashboard:dashboardText}}} = useLocalization()

	if(error) { 
		return(
			<Paper>Error</Paper>
		)
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2'>
			<StatsCard loading={loading} value={data?.statistic?.total} title={dashboardText.totalText} description={dashboardText.totalDescriptionText}/>
			<StatsCard loading={loading} value={data?.statistic?.paid} title={dashboardText.paidText} description={dashboardText.paidDescriptionText}/>
			<StatsCard loading={loading} value={data?.statistic?.verifying} title={dashboardText.verifyingText} description={dashboardText.verifyingDescriptionText}/>
			<StatsCard loading={loading} value={data?.statistic?.pending} title={dashboardText.pendingText} description={dashboardText.pendingDescriptionText}/>
			<StatsCard loading={loading} value={data?.statistic?.invalid} title={dashboardText.invalidText} description={dashboardText.invalidDescriptionText}/>
			<StatsCard loading={loading} value={data?.statistic?.unpaid} title={dashboardText.unpaidText} description={dashboardText.unpaidDescriptionText}/>
		</div>
	)
}

export default Statistic