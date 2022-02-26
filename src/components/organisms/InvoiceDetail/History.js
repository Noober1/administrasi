import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useState } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { blue, green } from '@mui/material/colors';
import { tools } from '../../../lib';
import useLocalization from '../../../lib/useLocalization';

const History = forwardRef((props, ref) => {

	const {default: defaultText, components: {invoiceDetailDialog}} = useLocalization()
	const [open, setopen] = useState(false)

	const closeDialog = () => setopen(false)
	const openDialog = () => setopen(true)

	useImperativeHandle(ref, () => ({
        openDialog,
		closeDialog
    }));

	return (
		<Dialog
			open={open}
			scroll="paper"
			onClose={closeDialog}
			fullWidth={true}
			maxWidth="sm"
		>
			<DialogTitle className='pb-0'>
				{invoiceDetailDialog.paymentHistoryButtonText}
			</DialogTitle>
			<DialogContent className='px-1 py-0'>
				{props.data.length > 0 ?
					<List>
						{props.data.map(item => (
							<ListItem key={item.id}>
								<ListItemAvatar>
									<Avatar sx={{
										bgcolor:item.paymentMethod == 'transfer' ? green[500] : blue[500]
									}}>
										{item.paymentMethod == 'transfer' ? <SendIcon/> : <AccountBalanceWalletIcon/>}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									className='capitalize'
									primary={`${tools.dateFormatting(item.date.verification,'d M y', defaultText.nameOfMonths)} - ${tools.rupiahFormatting(item.nominal || 0)}`}
									secondary={`${item.paymentMethod} - ${item.payer}`}
								/>
							</ListItem>
						))}
					</List> : 
					<Typography align='center' className='capitalize py-5'>
						{invoiceDetailDialog.emptyPaymentHistory}
					</Typography>
				}
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>{defaultText.closeText}</Button>
			</DialogActions>
		</Dialog>
	)
})

export default History