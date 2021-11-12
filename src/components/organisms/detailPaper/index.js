import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItemButton, ListItemIcon, ListItemText, Paper, Skeleton, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import useLocalization from '../../../lib/useLocalization'

const DetailPaper = ({title, list, loading, error}) => {
    const strings = useLocalization()

    const RenderList = () => {
        return(
            <>
                {list.map((item, index) => (
                    <ListItemButton key={item.title}>
                        <ListItemIcon>
                            {loading ?
                                <Skeleton variant="rectangular" width={50} height={50}/> : 
                                item.icon ?? <StarIcon/>
                            }
                        </ListItemIcon>
                        {loading ?
                            <div className="grid grid-cols-1 w-full">
                                <Skeleton variant="text" width="50%"/>
                                <Skeleton variant="text" width="100%"/>
                            </div>:
                            <ListItemText primary={item.title} secondary={item.content}/>
                        }
                    </ListItemButton>
                ))}
            </>
        )
    }

    return (
        <Paper className="p-5" elevation={0}>
            {error &&
                <Typography>
                    {strings.default.anErrorOccured}
                </Typography>
            }
            {!error &&
                <>
                    <Typography variant="h5" gutterBottom>
                        {loading ? <Skeleton variant="text" width={200}/> : title}
                    </Typography>
                    <List className="grid grid-cols-2">
                        <RenderList/>
                    </List>
                </>
            }
        </Paper>
    )
}

DetailPaper.defaultProps = {
    title: "No Title",
    loading: true,
    error: false
}

DetailPaper.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
}

export default DetailPaper
