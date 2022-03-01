import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Paper, Typography } from '@mui/material'
import { DraggablePaperComponent } from '../../atoms'
import { forwardRef } from 'react'
import { useState } from 'react'
import { useImperativeHandle } from 'react'
import UploadIcon from '@mui/icons-material/Upload'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

const handleSubmitForm = event => {
	event.preventDefault()
}

const TemplateImporter = forwardRef((props, ref) => {
	const [open, setopen] = useState(true)
	const openDialog = () => setopen(true)
	const closeDialog = () => setopen(false)
	const [filename, setfilename] = useState('')
	const fileDropHandler = useCallback((acceptedFiles, fileRejections) => {
		let filenames = acceptedFiles.reduce((prev,item) => `${prev}${item.name}, `, '')
		setfilename(filenames.replace(new RegExp(", " + "*$"),''))
		// TODO: buat script eksekusi upload file ke API disini
	}, [])
	const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
		onDrop:fileDropHandler,
		accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	})
	useImperativeHandle(
		ref,
		() => ({
			openDialog,
			closeDialog
		})
	)

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			PaperComponent={DraggablePaperComponent}
			fullWidth
			maxWidth="md"
		>
			<DialogTitle className='cursor-move'>{props.title}</DialogTitle>
			{props.alertMessage &&
				<Alert severity={props.alertSeverity}>
					{props.alertMessage}
				</Alert>
			}
			<form onSubmit={handleSubmitForm}>
				<DialogContent>
					<Paper
						component="label"
						className={`border-4 border-dashed border-blue-${isDragActive ? '300' : '700'} rounded-sm flex text-center items-center h-screen max-h-40 cursor-pointer`}
						{...getRootProps()}
					>
						<div className="mx-auto">
							<Fab size="large" className={isDragActive ? 'animate-bounce' : 'mb-5'}>
								<UploadIcon fontSize="large"/>
							</Fab>
							<Typography>
								{
									isDragActive ? '[LEPASKAN BERKAS DISINI]' : 
									filename.length > 0 ? filename :
									'[KLIK DISINI ATAU SERET BERKAS KE SINI UNTUK UNGGAH MEMILIH BERKAS]'
								}
							</Typography>
						</div>
					</Paper>
					<input type="file" className="sr-only" name="file-upload" {...getInputProps()}/>
				</DialogContent>
			</form>
		</Dialog>
	)
})

TemplateImporter.defaultProps = {
	title: 'Upload',
	alertMessage: null,
	alertSeverity: 'warning'
}

TemplateImporter.propTypes = {
	title: PropTypes.string,
	alertMessage: PropTypes.string,
	alertSeverity: PropTypes.oneOf(['error','warning','info','error'])
}

export default TemplateImporter