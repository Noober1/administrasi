import { createStyles, makeStyles } from '@mui/styles';
import MuiTooltip from '@mui/material/Tooltip';

// TODO: need to fix this
const useStyles = makeStyles(theme =>
	{
		console.log(theme)
	}
);

const Tooltip = ({children,classes,...props}) => {
	const style = useStyles()

	return(
		<MuiTooltip
			classes={{
				tooltip: style.tooltip,
				arrow: style.arrow,
				tooltipPlacementTop: style.tooltipPlacementTop
			}}
			{...props}
		>
			{children}
		</MuiTooltip>
	)
}

export default Tooltip