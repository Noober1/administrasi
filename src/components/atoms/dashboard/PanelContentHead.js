import React from 'react'
import PropTypes from 'prop-types'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button } from '@mui/material'
import PanelContentTitle from './PanelContentTitle'
import useLocalization from '../../../lib/useLocalization'

const PanelContentHead = ({title,buttonGroup,helpButtonHandler}) => {
    const strings = useLocalization()
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 my-2">
            <PanelContentTitle title={title}/>
            <div className="text-right flex items-center justify-end">
                {buttonGroup}
                <Button className="ml-2" variant="contained" color="secondary" onClick={helpButtonHandler} startIcon={<HelpOutlineIcon/>}>
                    {strings.default.helpButtonLabel}
                </Button>
            </div>
        </div>
    )
}

PanelContentHead.defaultProps = {
    title: 'No title',
    helpButtonHandler: () => {}
}

PanelContentHead.propTypes = {
    title: PropTypes.string,
    buttonGroup: PropTypes.element,
    helpButtonHandler: PropTypes.func
}

export default PanelContentHead
