import { Avatar, Button, IconButton, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { selectConfig, toggleDarkMode } from '../../../lib/redux/slices/configSlice'
import PropTypes from 'prop-types'
import { DarkMode, LightMode } from '@mui/icons-material'
import { IconButtonAvatar } from '..'
import useLocalization from '../../../lib/useLocalization'

const ButtonToggleDarkMode = ({variant = 'button'}) => {
    const strings = useLocalization()
    const config = useSelector(selectConfig)
    const { switchToDarkText, switchToLightText } = strings.buttonToggleDarkMode
    const dispatch = useDispatch()

    const toggler = () => {
        dispatch(toggleDarkMode())
    }

    if (variant === 'button') {
        return (
            <Button
                variant="outlined"
                onClick={toggler}
            >
                {config.theme == 'light' ? switchToDarkText : switchToLightText}
            </Button>
        )
    }

    return (
        <IconButton
            color="inherit"
            onClick={toggler}
        >
            {config.theme == 'light' ? <DarkMode/> : <LightMode/>}
        </IconButton>
    )
}

ButtonToggleDarkMode.propTypes = {
    variant: PropTypes.oneOf(['icon','button'])
}

export default connect(state => state)(ButtonToggleDarkMode)
