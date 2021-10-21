import { Button, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { selectConfig, toggleDarkMode } from '../../../lib/redux/slices/configSlice'
import PropTypes from 'prop-types'
import { DarkMode, LightMode } from '@mui/icons-material'
import { Tooltip } from '..'
import useLocalization from '../../../lib/useLocalization'

const ButtonToggleDarkMode = ({variant = 'button'}) => {
    const strings = useLocalization()
    const config = useSelector(selectConfig)
    const { switchToDarkText, switchToLightText } = strings.buttonToggleDarkMode
    const isLight = config.theme == 'light'
    const tooltipText = isLight ? switchToDarkText : switchToLightText
    const dispatch = useDispatch()

    const toggler = () => {
        dispatch(toggleDarkMode())
    }

    if (variant === 'button') {
        return (
            <Tooltip
                title={tooltipText}
            >
                <Button
                    variant="outlined"
                    onClick={toggler}
                >
                    {isLight ? switchToDarkText : switchToLightText}
                </Button>
            </Tooltip>
        )
    }

    return (
        <Tooltip
            title={tooltipText}
        >
            <IconButton
                color="inherit"
                onClick={toggler}
            >
                {isLight ? <DarkMode/> : <LightMode/>}
            </IconButton>
        </Tooltip>
    )
}

ButtonToggleDarkMode.propTypes = {
    variant: PropTypes.oneOf(['icon','button'])
}

export default connect(state => state)(ButtonToggleDarkMode)
