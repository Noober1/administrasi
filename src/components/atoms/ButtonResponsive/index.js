import React from 'react'
import PropTypes from 'prop-types'
import { Button, useMediaQuery } from '@mui/material'

import { IconButton } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tooltip from '../tooltip'

const ButtonResponsive = props => {
	const screenBreakpoint = useMediaQuery(theme => theme.breakpoints.down(props.iconFromScreen))

	if (screenBreakpoint) {
		console.log('typeof children', typeof props.children)
		const { startIcon, ...rest } = props
		const IconButtonComponent = () => (
			<IconButton {...rest}>
				{startIcon}
			</IconButton>
		)

		if(typeof props.children == 'string') {
			return(
				<Tooltip title={(<span>{props.children}</span>)}>
					<div><IconButtonComponent/></div>
				</Tooltip>
			)
		}
		return <IconButtonComponent/>
	}
	
	return (
		<Button {...props}>
			{props.children}
		</Button>
	)
}

ButtonResponsive.defaultProps = {
	startIcon: <HelpOutlineIcon/>,
	children: 'Button',
	iconFromScreen: 'sm'
}

ButtonResponsive.propTypes = {
	startIcon: PropTypes.element.isRequired,
	children: PropTypes.node.isRequired,
	iconFromScreen: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
}

export default ButtonResponsive