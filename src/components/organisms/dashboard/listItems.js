import { useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, List, ListItemButton } from '@mui/material';
import useLocalization from '../../../lib/useLocalization';
import { LogoutButtonWithDialog } from '..';
import { useRouter } from 'next/router';
import { Link } from '../../atoms';
import { string } from 'prop-types';

const Menus = () => {
	const strings = useLocalization()
	const router = useRouter()

	useEffect(() => {
		console.log(router)
	}, [router])

	const MenuLink = ({link,text,icon}) => (
		<Link noLinkStyle={true} href={link}>
			<ListItemButton
				selected={router.pathname == link}
			>
				<ListItemIcon>
					{icon}
				</ListItemIcon>
				<ListItemText>
					{text}
				</ListItemText>
			</ListItemButton>
		</Link>
	)
	
	const MainListItems = () => (
		<div>
			<MenuLink
				link="/dashboard"
				text={strings.panel.menu.dashboardText}
				icon={<DashboardIcon />}
			/>
			<MenuLink
				link="/student"
				text={strings.panel.menu.studentListText}
				icon={<PeopleIcon />}
			/>
		</div>
	)

	const SecondaryListItems = () => (
		<div>
			<ListItem button>
				<ListItemIcon>
					<AttachMoneyIcon />
				</ListItemIcon>
				<ListItemText primary={strings.panel.menu.paymentText} />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<FileCopyIcon />
				</ListItemIcon>
				<ListItemText primary={strings.panel.menu.invoicesText} />
			</ListItem>
		</div>
	);

	return(
		<>
			<List className="p-0">
				<MainListItems/>
			</List>
			<Divider/>
			<List className="p-0">
				<SecondaryListItems/>
			</List>
			<Divider/>
			<List>
				<LogoutButtonWithDialog>
					<ListItemButton>
						<ListItemIcon>
							<LogoutIcon/>
						</ListItemIcon>
						<ListItemText>
							<LogoutButtonWithDialog/>
						</ListItemText>
					</ListItemButton>
				</LogoutButtonWithDialog>
			</List>
		</>
	)
}

export default Menus