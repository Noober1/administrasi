import React from 'react'
import PropTypes from 'prop-types'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, IconButton, useMediaQuery } from '@mui/material'
import PanelContentTitle from './PanelContentTitle'
import useLocalization from '../../../lib/useLocalization'

const PanelContentHead = ({title,buttonGroup,helpButtonHandler}) => {
    const strings = useLocalization()
    const isMediumScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
    
    return (
        <div className="flex my-2">
            <div className="flex-1">
                <PanelContentTitle title={title}/>
            </div>
            <div className="flex items-center justify-end sm:justify-end">
                {buttonGroup}
                <div className="ml-2">
                    {!isMediumScreen ?
                        <Button variant="contained" color="secondary" onClick={helpButtonHandler} startIcon={<HelpOutlineIcon/>}>
                            {strings.default.helpButtonLabel}
                        </Button> :
                        <IconButton variant="contained" color="secondary" onClick={helpButtonHandler}>
                            <HelpOutlineIcon/>
                        </IconButton>
                    }
                </div>
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
