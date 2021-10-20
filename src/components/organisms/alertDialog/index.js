import { useState, Children, cloneElement, isValidElement } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types'
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import useLocalization from '../../../lib/useLocalization';

const AlertDialog = ({
	children,
	onConfirm,
	onCancel,
	title,
	content,
	showConfirmButton = true,
	showCancelButton = false,
	confirmLabel,
	cancelLabel,
	sizeOnFullscreen = 'sm',
	scroll = 'paper',
	closeOutsideClick = true
}) => {
	const [open, setOpen] = useState(false);
	const theme = useTheme()
	const fullscreen = useMediaQuery(theme.breakpoints.down(sizeOnFullscreen))
	const strings = useLocalization()

	const handleClickOpen = () => {
		setOpen(true)
	};

	const closeDialog = () => {
		setOpen(false)
	}

	const events = {
		closeDialog
	}

	const handleClose = () => {
		if (closeOutsideClick) {
			setOpen(false)
		}
	};

	const handleConfirm = () => {
		if (typeof onConfirm === 'function') {
			onConfirm({
				...events,
				action: 'confirm'
			})
		}
	}

	const handleCancel = () => {
		if (typeof onCancel === 'function') {
			onCancel({
				...events,
				action: 'cancel'
			})
		}
		closeDialog()
	}

	const childrenWithProps = Children.map(children, child => {
		if (isValidElement(child)) {
		  return cloneElement(child, { onClick: handleClickOpen });
		}
		return child;
	});

	return (
		<div>
			{childrenWithProps}
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen={fullscreen}
				scroll={scroll}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{title ?? "No title"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{content ?? "No content"}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{showConfirmButton &&
						<Button onClick={handleConfirm}>{confirmLabel ?? strings.default.alertDialogConfirmButtonText}</Button>
					}
					{showCancelButton &&
						<Button onClick={handleCancel}>{cancelLabel ?? strings.default.alertDialogCancelButtonText}</Button>
					}
				</DialogActions>
			</Dialog>
		</div>
	);
}

AlertDialog.propTypes = {
	children: PropTypes.element.isRequired,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	content: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.element.isRequired
	]),
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	confirmLabel: PropTypes.string,
	cancelLabel: PropTypes.string,
	scroll: PropTypes.oneOf(['paper','body']),
	sizeOnFullscreen: PropTypes.oneOf(['sm','md','lg']),
	closeOutsideClick: PropTypes.bool
}

export default AlertDialog