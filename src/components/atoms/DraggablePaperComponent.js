import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@mui/material'
import clsx from 'clsx'

const DraggablePaperComponent = ({handle, cancel, className, ...props}) => {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
    return(
        <Draggable handle={handle} position={isSmallScreen ? {x: 0, y: 0} : null} disabled={isSmallScreen} cancel={cancel || '[class*="MuiDialogContent-root"]'}>
            <Paper className={clsx(className, 'draggable-paper')} {...props} />
        </Draggable>
    )
}

DraggablePaperComponent.propTypes = {
    handle: PropTypes.string,
    cancel: PropTypes.string
}

export default DraggablePaperComponent