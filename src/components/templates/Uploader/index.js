import React, { forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, Pagination, Paper, Skeleton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import fetchAPI, { uploadAPI } from '../../../lib/fetchApi'
import AddIcon from '@mui/icons-material/Add'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import useProfile from '../../../lib/useProfile'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../../../lib/redux/slices/noPersistConfigSlice'

const Uploader = props => {
    const profile = useProfile()
    const dispatch = useDispatch()

    // dialog
    const [dialogOpen, setdialogOpen] = useState(false)
    const openDialog = () => setdialogOpen(true)
    const closeDialog = () => setdialogOpen(false)
    
    // loading
    const [loading, setLoading] = useState(true)
    const [initLoading, setinitLoading] = useState(true)
    const [uploadLoading, setuploadLoading] = useState(false)

    // for pagination
    const [page, setpage] = useState(1)
    const [itemLimit, setitemLimit] = useState(props.perPage)
    const urlParam = new URLSearchParams()
    urlParam.append('page', page)
    urlParam.append('limit', itemLimit)
    const handleChangePage = (event,value) => {
        if (loading) return
        setpage(value)
    }
    
    // uploader
    const fileInputRef = useRef(null)

    // selection
    const [fileSelected, setfileSelected] = useState('')
    const handleConfirmFile = () => {
        if (fileSelected === '') return
        setdialogOpen(false)
    }

    // fetch
    const [fetchedData, setfetchedData] = useState([])
    const [fetchedPaginationData, setfetchedPaginationData] = useState({})
    const [fetchError, setfetchError] = useState(false)
    const [refreshData, setrefreshData] = useState(0)

    useEffect(() => {
        // only trigger if dialog is open
        if (dialogOpen) {
            setLoading(true)
            setfetchError(false)
            setfetchedData([])
            fetchAPI('/media/image?' + urlParam.toString())
            .then(result => {
                setfetchedData(result.data)
                if (Object.keys(fetchedPaginationData).length < 1) {
                    setfetchedPaginationData(result.pagination)
                }
                if (initLoading) {
                    setinitLoading(false)
                }
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                if (error?.response) {
                    fetchError(error.response)
                }
            })
        }
    }, [dialogOpen, page, refreshData])

    const getFileNameFromValueInput = value => {
        if (value) {
            var startIndex = (value.indexOf('\\') >= 0 ? value.lastIndexOf('\\') : value.lastIndexOf('/'));
            var filename = value.substring(startIndex)
            if (filename.indexOf('\\')  === 0 || filename.indexOf('/')  === 0) {
                filename = filename.substring(1)
            }
            return filename
        } else {
            return false
        }
    }
    
    const handleChangeFileInput = event => {
        setuploadLoading(true)
        // get file name, display only
        const getFileName = getFileNameFromValueInput(event.target.value)
        // if not get file, if true that mean client isn't selecting file yet
        if(!getFileName) return
        console.log(getFileName)
        // preparing formData
        const formData = new FormData();
        const time = new Date().getTime() / 1000
		formData.append('title', 'title-' + time)
		formData.append('description', 'description-' + time)
        formData.append('user', profile.email || 'unknown')
		formData.append('file', event.target.files[0])
        // uploading
        uploadAPI(formData)
            .then(result => {
                setrefreshData(refreshData + 1)
                dispatch(openSnackbar({
                    position:'top-right',
                    severity: 'success',
                    message: 'OKE KEKNYA'
                }))
                setuploadLoading(false)
            })
            .catch(error => {
                console.error(error)
                dispatch(openSnackbar({
                    position:'top-right',
                    severity: 'error',
                    message: 'GK OKE KEKNYA'
                }))
                setuploadLoading(false)
            })
    }

    return (
        <>
            <Button variant="contained" onClick={openDialog}>
                [OPEN IMAGE]
            </Button>
            <Dialog
                open={dialogOpen}
                fullScreen
            >
                <AppBar className="relative">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeDialog}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className="ml-2 flex-1">
                            {props.title}
                        </Typography>
                        {/* dev only start */}
                        <Button color="inherit" onClick={() => {
                            setLoading(!loading)
                            setinitLoading(!initLoading)
                        }}>
                            [DEV ONLY loading toggle]
                        </Button>
                        <Button color="inherit" onClick={() => setuploadLoading(!uploadLoading)}>
                            [DEV ONLY upload loading toggle]
                        </Button>
                        {/* dev only end */}
                        <Button color="inherit" onClick={handleConfirmFile} disabled={fileSelected === ''}>
                            [PILIH]
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent className="flex flex-col justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {!initLoading &&
                            <>
                                <label htmlFor="file-upload-input">
                                    <Paper className="ratio-16-9 relative cursor-pointer">
                                        <div className="absolute top-0 left-0 buttom-0 right-0 h-full flex items-center">
                                            <div className="mx-auto text-center">
                                                {!uploadLoading ?
                                                    <>
                                                        <Fab size="small" color="primary" className="mb-2">
                                                            <AddIcon/>
                                                        </Fab>
                                                        <Typography>
                                                            [UPLOAD]
                                                        </Typography>
                                                    </> : 
                                                    <CircularProgress/>
                                                }
                                            </div>
                                        </div>
                                    </Paper>
                                </label>
                                <input ref={fileInputRef} onChange={handleChangeFileInput} id="file-upload-input" type="file" accept="image/*" className="sr-only" name="file-upload-input"/>
                            </>
                        }
                        {initLoading &&
                            <>
                                {[1,2,3,4,5,6].map(item => (
                                    <Skeleton key={item} animation="wave" variant="rectangular" className="ratio-16-9"/>
                                ))}
                            </>
                        }
                        {!initLoading &&
                            <>
                                {fetchedData.map(item => {
                                    return(
                                        <Paper
                                            tabIndex="0"
                                            key={item.id}
                                            className={
                                                clsx(
                                                    'bg-no-repeat bg-cover bg-center border-4  outline-none cursor-pointer',
                                                    item.name === fileSelected ? 'border-gray-700' : 'border-white'
                                                )
                                            }
                                            onClick={() => setfileSelected(item.name)}
                                            style={{
                                                backgroundImage:`url(${item.url})`,
                                                paddingTop: '56.25%'
                                            }}
                                        >
                                        </Paper>
                                    )
                                })}
                            </>
                        }
                    </div>
                    <div className="flex flex-row-reverse justify-between">
                        {initLoading ? 
                            <Skeleton className="max-w-sm" width="100%" height="40px"/> : 
                            <Pagination count={fetchedPaginationData?.lastPage || 1} page={page} onChange={handleChangePage}/>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

Uploader.defaultProps = {
    title: 'No title',
    perPage: 6
}

Uploader.propTypes = {
    title: PropTypes.string,
    perPage: PropTypes.number
}

export default Uploader