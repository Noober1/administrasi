import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, IconButton } from '@mui/material'
import clsx from 'clsx'

const IconButtonAvatar = ({className, children, avatarProps = {}, ...props}) => {

    const { className: AvatarClassName, ...restAvatarProps } = avatarProps

    return (
        <IconButton
            {...props}
        >
            <Avatar
                className={clsx('bg-blue-400 text-white',AvatarClassName || {})}
                {...avatarProps}
            >
                {children}
            </Avatar>
        </IconButton>
    )
}

IconButtonAvatar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    avatarProps: PropTypes.object
}

export default IconButtonAvatar
