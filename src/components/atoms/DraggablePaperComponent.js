import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import PropTypes from 'prop-types'

const DraggablePaperComponent = ({handle, cancel, ...props}) => (
    <Draggable handle={handle} cancel={cancel || '[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
    </Draggable>
)

DraggablePaperComponent.propTypes = {
    handle: PropTypes.string.isRequired,
    cancel: PropTypes.string
}

export default DraggablePaperComponent