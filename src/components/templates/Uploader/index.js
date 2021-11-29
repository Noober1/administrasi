import React, { forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, Pagination, Paper, Skeleton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import fetchAPI, { uploadAPI } from '../../../lib/fetchApi'
import AddIcon from '@mui/icons-material/Add'
import clsx from 'clsx'
import useProfile from '../../../lib/useProfile'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../../../lib/redux/slices/noPersistConfigSlice'
import useLocalization from '../../../lib/useLocalization'
import UploadIcon from '@mui/icons-material/Upload'

const Uploader = props => {
    const {default:defaultText, components: {uploader}} = useLocalization()
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
    urlParam.append('email', profile.email || '')
    const handleChangePage = (event,value) => {
        if (loading) return
        setpage(value)
    }
    
    // uploader
    const fileInputRef = useRef(null)

    // selection
    const [fileSelected, setfileSelected] = useState('')
    const [itemSelected, setitemSelected] = useState({})
    const [formValue, setformValue] = useState('')
    const handleConfirmFile = () => {
        if (fileSelected === '') return
        setdialogOpen(false)
    }
    const handleFileClick = item => {
        setfileSelected(item.name)
        setitemSelected(item)
    }

    // fetch
    const [fetchedData, setfetchedData] = useState([])
    const [fetchedPaginationData, setfetchedPaginationData] = useState({})
    const [fetchError, setfetchError] = useState(false)
    const [refreshData, setrefreshData] = useState(0)

    useEffect(() => {
        let active = true
        // only trigger if dialog is open
        if (dialogOpen) {
            setLoading(true)
            setfetchError(false)
            setfetchedData([])
            fetchAPI('/media/image?' + urlParam.toString())
            .then(result => {
                if (active) {
                    setfetchedData(result.data)
                    if (Object.keys(fetchedPaginationData).length < 1 || page == 1) {
                        setfetchedPaginationData(result.pagination)
                    }
                    if (initLoading) {
                        setinitLoading(false)
                    }
                    setLoading(false)
                }
            })
            .catch(error => {
                if (active) {
                    console.error(error)
                    if (error?.response) {
                        setfetchError(error.response)
                    } else {
                        setfetchError(true)
                    }
                    setLoading(false)
                }
            })
        }
        return () => {
            active = false
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
                dispatch(openSnackbar({
                    position:'top-center',
                    severity: 'success',
                    message: uploader.uploadFileSuccess
                }))
                setuploadLoading(false)
                if (page == 1) {
                    setrefreshData(refreshData + 1)
                } else {
                    setpage(1)
                }
            })
            .catch(error => {
                console.error(error)
                dispatch(openSnackbar({
                    position:'top-center',
                    severity: 'error',
                    message: uploader.uploadFileFailed
                }))
                setuploadLoading(false)
            })
    }

    return (
        <>
            <Paper
                tabIndex="0"
                elevation={0}
                className="ratio-1-1 cursor-pointer border-2 border-blue-700 bg-center bg-no-repeat bg-cover"
                onClick={openDialog}
                style={{
                    backgroundImage: `url(${itemSelected?.url || ''})`
                }}
            >
                <div className="ratio-content bg-gray-900 opacity-40"></div>
                <div
                    className="ratio-content flex items-center"
                >
                    <div className="mx-auto text-center overflow-ellipsis overflow-x-hidden px-3" color="primary">
                        {fileSelected == '' &&
                            <Fab size="small" className="mb-5 shadow-none">
                                <AddIcon/>
                            </Fab>
                        }
                        <Typography noWrap fontSize="12px" color="white">
                            {fileSelected == '' ? props.title : fileSelected}
                        </Typography>
                    </div>
                </div>
            </Paper>
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
                        <Button onClick={handleConfirmFile} disabled={fileSelected === ''} className="text-white">
                            {fileSelected == '' ? defaultText.noSelectedText : defaultText.selectText}
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent className="flex flex-col justify-between">
                    {fetchError &&
                        <div className="text-center">
                            <Typography gutterBottom>
                                {defaultText.anErrorOccured}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => setrefreshData(prevValue => prevValue + 1)}>
                                {defaultText.retryText}
                            </Button>
                        </div>
                    }
                    {!fetchError &&
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {!initLoading &&
                                    <>
                                        <label htmlFor="file-upload-input">
                                            <Paper className="ratio-16-9 cursor-pointer shadow-none border-4 border-blue-900 border-dashed bg-gray-200">
                                                <div className="ratio-content flex items-center">
                                                    <div className="mx-auto text-center">
                                                        {!uploadLoading ?
                                                            <>
                                                                <Fab size="small" color="primary" className="mb-2 shadow-none">
                                                                    <UploadIcon/>
                                                                </Fab>
                                                                <Typography>
                                                                    {uploader.uploadText}
                                                                </Typography>
                                                            </> : 
                                                            <CircularProgress/>
                                                        }
                                                    </div>
                                                </div>
                                            </Paper>
                                        </label>
                                        <input ref={fileInputRef} onChange={handleChangeFileInput} id="file-upload-input" type="file" accept="image/*" className="sr-only"/>
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
                                                            'bg-no-repeat bg-cover bg-center border-4 outline-none cursor-pointer',
                                                            item.name === fileSelected ? 'border-blue-700' : 'border-white'
                                                        )
                                                    }
                                                    onClick={() => handleFileClick(item)}
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
                        </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

Uploader.defaultProps = {
    title: 'No title',
    invalid: false,
    name: 'file',
    perPage: 6,
    required: false
}

Uploader.propTypes = {
    title: PropTypes.string,
    invalid: PropTypes.bool,
    name: PropTypes.string,
    perPage: PropTypes.number,
    required: PropTypes.bool,
}

export default Uploader