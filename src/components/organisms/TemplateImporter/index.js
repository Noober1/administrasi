import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, Link, Paper, Typography, useMediaQuery } from '@mui/material'
import { DraggablePaperComponent, Tooltip } from '../../atoms'
import { forwardRef } from 'react'
import { useState } from 'react'
import { useImperativeHandle } from 'react'
import UploadIcon from '@mui/icons-material/Upload'
import WhereToVoteIcon from '@mui/icons-material/WhereToVote'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseIcon from '@mui/icons-material/Close'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
import useLocalization from '../../../lib/useLocalization'
import { LoadingButton } from '@mui/lab'
import fetchAPI, { fetchWithToken } from '../../../lib/fetchApi'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import { useEffect } from 'react'
import tools from '../../../lib/tools'


const TemplateImporter = forwardRef((props, ref) => {
	const { authToken } = useSelector(selectAuth)
	const isMediumScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
	const {errors, default: defaultText, components: { templateUploader: templateUploaderText }} = useLocalization()
	const [open, setopen] = useState(false)
	const [uploadingFile, setUploadingFile] = useState(false)
	const [fileToUpload, setfileToUpload] = useState([])
	const [fileFormatErrorList, setfileFormatErrorList] = useState([])
	const [fileFormatError, setfileFormatError] = useState(false)

	// post-upload states
	const [dialogResultOpen, setdialogResultOpen] = useState(false)
	const [uploadingError, setuploadingError] = useState(false)
	const [uploadingMessage, setuploadingMessage] = useState('Uploading...')
	const [uploadingErrorData, setuploadingErrorData] = useState([])
	const openDialog = () => setopen(true)

	const closeDialog = () => {
		if (uploadingFile) return
		setopen(false)

	}
	const [filename, setfilename] = useState('')
	const fileDropHandler = useCallback((acceptedFiles, fileRejections) => {
		let filenames = acceptedFiles.reduce((prev,item) => `${prev}${item.name}, `, '')
		setfilename(filenames.replace(new RegExp(", " + "*$"),''))
		setfileToUpload([])
		if (fileRejections.length > 0) {
			setfileFormatError(true)
			setfileFormatErrorList(fileRejections)
		} else {
			setfileFormatError(false)
			setfileFormatErrorList([])
			setfileToUpload(acceptedFiles)
		}
	}, [])

	if (process.env.NODE_ENV == 'development') {
		useEffect(() => {
			console.log('Component > Organism > TemplateImporter: fileToUpload = ', fileToUpload)
		}, [fileToUpload])
	}
	
	const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
		onDrop:fileDropHandler,
		accept: props.allowedFormat.reduce((prev,item) => {
			switch (item) {
				case 'xls':
					return prev + 'application/vnd.ms-excel, '
				case 'xlsx':
					return prev + 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, '
				case 'csv':
					return prev + 'text/csv, '
				default:
					return prev
			}
		}, ''),
		multiple: props.multiple,
		maxSize: props.maxSize,
		disabled: uploadingFile
	})
	useImperativeHandle(
		ref,
		() => ({
			openDialog,
			closeDialog
		})
	)
	const handleSubmitForm = event => {
		event.preventDefault()
		setUploadingFile(true)
		const formData = new FormData();
		if (props.multiple) {
			formData.append('multiple', 'true')
		}
		const fileObjects = fileToUpload.map(file => {
			formData.append('file', file, file.name)
		})
		fetchAPI(fetchWithToken({
			url: props?.url || '/',
			method: "POST",
			token: authToken,
			data: formData
		}))
		.then(result => {
			setUploadingFile(false)
			setfileToUpload([])
			setfilename('')
			// uploading states
			setuploadingError(false)
			setuploadingMessage(result?.response?.data.message || defaultText.noMessageText)
			setuploadingErrorData([])
		})
		.then(() => {
			setdialogResultOpen(true)
			setopen(false)
			if (typeof props.callback === 'function') {
				props.callback(uploadingError)
			}
		})
		.catch(error => {
			setUploadingFile(false)
			setfileToUpload([])
			setfilename('')
			setdialogResultOpen(true)
			// uploading states
			setuploadingMessage(error?.response?.data?.message || errors.unknownError)
			setuploadingError(true)
			setuploadingErrorData(error?.response?.data?.data || [])
			if (typeof props.callback === 'function') {
				props.callback(uploadingError, uploadingErrorData)
			}
		})
	}

	return (
		<>
			<Dialog
				open={open}
				scroll="body"
				PaperComponent={DraggablePaperComponent}
				fullWidth
				fullScreen={isMediumScreen}
				maxWidth="md"
				disableEscapeKeyDown
			>
				<DialogTitle className='cursor-move'>
					{props.title}
					<Tooltip arrow title={<Typography>{templateUploaderText.closeImporterText}</Typography>}>
						<IconButton className="absolute top-2 right-2" onClick={closeDialog}>
							<CloseIcon/>
						</IconButton>
					</Tooltip>
				</DialogTitle>
				<DialogContent>
					{props.alertMessage &&
						<Alert severity={props.alertSeverity} className="mb-2" variant="filled">
							{props.alertMessage}
						</Alert>
					}
					{props.sampleUrl &&
						<Alert severity="info" className="mb-2">
							<Link component="a" href={props.sampleUrl} target="_blank">
								{templateUploaderText.fileTemplateDownloadText}
							</Link>
						</Alert>
					}
					<form onSubmit={handleSubmitForm}>
						<Paper
							className={`border-4 border-dashed border-blue-${isDragActive ? '300' : '700'} rounded-md flex text-center items-center py-10 cursor-pointer shadow-none`}
							{...getRootProps()}
						>
							<div className="mx-auto">
								<Fab
									color={fileFormatError ? "secondary" : "primary"}
									size="large"
									className={isDragActive ? 'my-3 animate-bounce shadow-none' : 'mb-6 shadow-none'}
								>
									{
										isDragActive ? <WhereToVoteIcon fontSize="large"/> : 
										filename.length > 0 ? <CheckRoundedIcon fontSize="large"/> :
										fileFormatError ? <CloseIcon/> :
										<UploadIcon fontSize="large"/>
									}
								</Fab>
								<Typography gutterBottom>
									{
										isDragActive ? templateUploaderText.dropFileHereText : 
										filename.length > 0 ? filename :
										fileFormatError ? templateUploaderText.fileFormatErrorText :
										templateUploaderText.helperText
									}
								</Typography>
								<Typography component="div">
									{templateUploaderText.allowedFormatText}: {props.allowedFormat.map(item => (
										<Chip key={item} label={'.' + item} size="small" color="primary" className="mr-1"/>
									))}
								</Typography>
								<Typography className="mt-2" component="div">
									{templateUploaderText.maxSizeText}: <Chip color="success" size="small" label={`${tools.byteToMegaByte(props.maxSize)} MB(MegaByte)`}/>
								</Typography>
							</div>
						</Paper>
						<input type="file" className="sr-only" name="file-upload" {...getInputProps()}/>
						<div className="mt-5 flex justify-center">
							<LoadingButton
								className="shadow-none"
								type="submit"
								variant="contained"
								color="success"
								loading={uploadingFile}
								loadingPosition="start"
								startIcon={<UploadIcon/>}
								disabled={fileToUpload.length < 1}
							>
								{uploadingFile ? templateUploaderText.uploadingText : templateUploaderText.uploadButtonText}
							</LoadingButton>
						</div>
					</form>
				</DialogContent>
			</Dialog>
			<Dialog
				open={dialogResultOpen}
			>
				<DialogTitle>
					{uploadingError ? templateUploaderText.errorUploadTitle : templateUploaderText.successUploadTitle}
				</DialogTitle>
				<DialogContent>
					<Typography gutterBottom>
						{uploadingError ? templateUploaderText.errorUploadText : templateUploaderText.successUploadText}
					</Typography>
					{uploadingError &&
						<Alert severity="error" className="mb-2" variant="filled">
							{/* TODO: showing error message with custom message based by error code instead error message from server */}
							{uploadingMessage}
						</Alert>
					}
					{(uploadingError && uploadingErrorData.length > 0) &&
						<>
							<Typography gutterBottom>
								{templateUploaderText.errorDataText}:
							</Typography>
							{uploadingErrorData.map((item, index) => (
								<Chip key={index} label={item} size="small" color="error" className="mr-1 mb-1"/>
							))}
						</>
					}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setdialogResultOpen(false)}>
						{defaultText.closeText}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
})

TemplateImporter.defaultProps = {
	title: 'Upload',
	allowedFormat: ['xls','xlsx','csv'],
	alertMessage: null,
	alertSeverity: 'warning',
	sampleUrl: null,
	maxSize: 1048576,
	callback: () => {},
	multiple: false
}

TemplateImporter.propTypes = {
	title: PropTypes.string,
	url: PropTypes.string.isRequired,
	allowedFormat: PropTypes.arrayOf(PropTypes.string),
	alertMessage: PropTypes.string,
	alertSeverity: PropTypes.oneOf(['error','warning','info','error']),
	sampleUrl: PropTypes.string,
	callback: PropTypes.func,
	maxSize: PropTypes.number,
	multiple: PropTypes.bool
}

export default TemplateImporter