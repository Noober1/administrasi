import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { toggleIDENLang } from '../../../lib/redux/slices/configSlice'
import { useDispatch } from 'react-redux'
import { Avatar, Button, IconButton } from '@mui/material'

const ButtonSwitchLanguage = ({variant}) => {
    const config = useSelector(state => state.config)
    const dispatch = useDispatch()

    const toggler = () => {
        dispatch(toggleIDENLang())
    }

    if (variant === 'button') {
        return (
            <Button
                onClick={toggler}
            >
                {config.language == 'light' ? 'EN' : 'ID'}
            </Button>
        )
    }

    return (
        <IconButton
            color="inherit"
            onClick={toggler}
            className="w-10 h-10 text-base font-bold"
        >
            {/* <Avatar
                className="w-10 h-10 bg-transparent text-white"
            >
                
            </Avatar> */}
            {config.language == 'en' ? 'EN' : 'ID'}
        </IconButton>
    )
}

ButtonSwitchLanguage.propTypes = {
    variant: PropTypes.oneOf(['icon','button'])
}

export default connect(state => state)(ButtonSwitchLanguage)
