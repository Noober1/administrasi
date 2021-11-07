import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { selectNoPersistConfig, setSnackbarMessage, setSnackbarOpen } from '../../../lib/redux/slices/noPersistConfigSlice';
import { Alert } from '@mui/material';

export default function MainSnackbar() {
	const dispatch = useDispatch()
	const { mainSnackbar } = useSelector(selectNoPersistConfig)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') return;
		dispatch(setSnackbarOpen(false))
	};

	const handleExited = () => {
		dispatch(setSnackbarMessage('No message'))
	};

	return (
		<Snackbar
			open={mainSnackbar.open}
			anchorOrigin={{
				horizontal: mainSnackbar.position.horizontal,
				vertical: mainSnackbar.position.vertical
			}}
			autoHideDuration={6000}
			onClose={handleClose}
			TransitionProps={{ onExited: handleExited }}
			// message={mainSnackbar.message}
			action={
				<>
					<IconButton
						aria-label="close"
						color="inherit"
						sx={{ p: 0.5 }}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				</>
			}
		>
			<Alert variant="filled" severity={mainSnackbar.severity} sx={{ width: '100%', maxWidth: '500px' }}>
				{mainSnackbar.message}
			</Alert>
		</Snackbar>
	);
}