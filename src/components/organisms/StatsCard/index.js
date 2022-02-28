import React from 'react'
import { Card, CardActions, CardContent, Skeleton, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const StatsCard = ({title,description,value,loading,...props}) => {
	if (loading) return <Skeleton variant="rectangular" animation="wave" className="rounded-sm" height={100}/>

	return (
		<Card className='flex items-center cursor-pointer' style={{minHeight:'100px'}} {...props}>
			<CardContent className="flex-1 pr-0">
				<Typography variant="h5">{title}</Typography>
				<Typography variant="subtitle1">{description}</Typography>
			</CardContent>
			<CardActions className='text-center' style={{maxWidth:'150px',minWidth:'75px'}}>
				<Typography variant='h3' className='flex-1 overflow-hidden overflow-ellipsis'>
					{value}
				</Typography>
			</CardActions>
		</Card>
	)
}

StatsCard.defaultProps = {
	title: 'No Title',
	description: 'No description',
	value: '0',
	loading: false
}

StatsCard.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	loading: PropTypes.bool
}

export default StatsCard