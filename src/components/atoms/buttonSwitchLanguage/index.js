import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { toggleIDENLang } from '../../../lib/redux/slices/configSlice'
import { useDispatch } from 'react-redux'
import { Button, IconButton } from '@mui/material'
import { Tooltip } from '..'
import useLocalization from '../../../lib/useLocalization'

const ButtonSwitchLanguage = ({variant}) => {
    const config = useSelector(state => state.config)
    const dispatch = useDispatch()
    const strings = useLocalization()

    const toggler = () => {
        dispatch(toggleIDENLang())
    }

    if (variant === 'button') {
        return (
            <Tooltip
                title={strings.default.buttonSwitchLanguageTooltipText}
            >
                <Button
                    onClick={toggler}
                >
                    {config.language == 'light' ? 'EN' : 'ID'}
                </Button>
            </Tooltip>
        )
    }

    return (
        <Tooltip
            title={strings.buttonSwitchLanguageTooltipText}
        >
            <IconButton
                color="inherit"
                onClick={toggler}
                className="w-10 h-10 text-base font-bold"
            >
                {config.language == 'en' ? 'EN' : 'ID'}
            </IconButton>
        </Tooltip>
    )
}

ButtonSwitchLanguage.propTypes = {
    variant: PropTypes.oneOf(['icon','button'])
}

export default connect(state => state)(ButtonSwitchLanguage)
