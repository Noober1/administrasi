import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'

const DraggablePaperComponent = ({handle, cancel, ...props}) => {
    return(
        <Draggable handle={handle} cancel={cancel || '[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    )
}

DraggablePaperComponent.propTypes = {
    handle: PropTypes.string,
    cancel: PropTypes.string
}

export default DraggablePaperComponent