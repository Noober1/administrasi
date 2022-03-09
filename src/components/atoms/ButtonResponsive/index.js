import PropTypes from 'prop-types'
import { Button, useMediaQuery } from '@mui/material'

import { IconButton } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tooltip from '../tooltip'

const ButtonResponsive = ({
	children, tooltipArrow, arrow, startIcon, iconFromScreen, ...props
}) => {
	const screenBreakpoint = useMediaQuery(theme => theme.breakpoints.down(iconFromScreen))
	

	if (screenBreakpoint) {
		const { disableElevation, fullWidth, ...iconButtonProps } = props
		return(
			<Tooltip
				arrow={arrow}
				title={children}
			>
				<IconButton {...iconButtonProps}>
					{startIcon}
				</IconButton>
			</Tooltip>
		)
	}
	
	return (
		<Button {...props} startIcon={startIcon}>
			{children}
		</Button>
	)
}

ButtonResponsive.defaultProps = {
	startIcon: <HelpOutlineIcon/>,
	children: 'Button',
	iconFromScreen: 'sm',
	color: 'primary',
	arrow: true
}

ButtonResponsive.propTypes = {
	startIcon: PropTypes.element.isRequired,
	children: PropTypes.node.isRequired,
	iconFromScreen: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default','info', 'success', 'warning', 'error']),
	arrow: PropTypes.bool
}

export default ButtonResponsive