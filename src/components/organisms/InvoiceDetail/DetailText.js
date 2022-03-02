import React from 'react'
import PropTypes from 'prop-types'
import StarIcon from '@mui/icons-material/Star'
import { List, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material'

const DetailText = ({list, loading}) => {

    const RenderList = () => {
        return(
            <>
                {list.map((item, index) => (
                    <ListItemButton key={item.title || index} className="p-0 pl-2">
                        <ListItemIcon classes={{
                            root:"min-w-0 mr-3 print:text-black"
                        }}>
                            {loading ?
                                <Skeleton variant="rectangular" width={50} height={50}/> : 
                                item.icon ?? <StarIcon/>
                            }
                        </ListItemIcon>
                        {loading ?
                            <div className="grid grid-cols-1 w-full p-2">
                                <Skeleton variant="text" width="50%"/>
                                <Skeleton variant="text" width="100%"/>
                            </div>:
                            <ListItemText className="capitalize" classes={{
                                secondary:"print:text-black"
                            }} primary={item.title} secondary={item.content}/>
                        }
                    </ListItemButton>
                ))}
            </>
        )
    }

    return (
        <List className="grid grid-cols-2 lg:grid-cols-3">
            <RenderList/>
        </List>
    )
}

DetailText.propTypes = {
    loading:PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired
}

export default DetailText
