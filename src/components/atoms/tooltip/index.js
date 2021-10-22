import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

const HtmlTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className}} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		maxWidth: 350,
		fontSize: theme.typography.pxToRem(16),
		borderRadius: 5
	},
	[`& .${tooltipClasses.arrow}`]: {
		borderColor: theme.palette.background.paper,
		color: theme.palette.background.paper
	}
}));

export default HtmlTooltip