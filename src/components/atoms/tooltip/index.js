import { styled } from '@mui/material/styles'
import MuiTooltip, { tooltipClasses } from '@mui/material/Tooltip'

const Tooltip = styled(({ className, ...props }) => (
	<MuiTooltip {...props} classes={{ popper: className}} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.text.primary,
		color: theme.palette.background.default,
		maxWidth: 350,
		fontSize: theme.typography.pxToRem(16),
		borderRadius: 5
	},
	[`& .${tooltipClasses.arrow}`]: {
		borderColor: theme.palette.text.primary,
		color: theme.palette.text.primary
	}
}));

export default Tooltip