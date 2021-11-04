import React from 'react'
import PropTypes from 'prop-types'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, IconButton, useMediaQuery } from '@mui/material'
import PanelContentTitle from './PanelContentTitle'
import useLocalization from '../../../lib/useLocalization'

const PanelContentHead = ({title,buttonGroup,helpButtonHandler}) => {
    const strings = useLocalization()
    const upToMd = useMediaQuery(theme => theme.breakpoints.up('md'))
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 my-2">
            <PanelContentTitle title={title}/>
            <div className="flex items-center justify-center sm:justify-end">
                {buttonGroup}
                <div className="ml-2">
                    {upToMd ?
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
