import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import { Divider, List, ListItemButton } from '@mui/material';
import useLocalization from '../../../lib/useLocalization';
import { useRouter } from 'next/router';
import { Link, Tooltip } from '../../atoms';
import PropTypes from 'prop-types'
import { useEffect } from 'react';

const Menus = ({menuOpen}) => {
	const strings = useLocalization()
	const router = useRouter()
	const firstRoute = '/' + router.pathname.split('/')[1] || '/'

	if (process.env.NODE_ENV == 'development') {
		useEffect(() => {
			console.log('listItem > Router:', router)
			console.log(firstRoute)
		}, [router])
	}

	const MenuLink = ({link,text,icon}) => {
		const listLink = (<Link noLinkStyle={true} href={link}>
			<ListItemButton
				selected={firstRoute == link}
			>
				<ListItemIcon>
					{icon}
				</ListItemIcon>
				<ListItemText>
					{text}
				</ListItemText>
			</ListItemButton>
		</Link>)

		if (!menuOpen) {
			return (
				<Tooltip
					arrow
					title={text}
					placement="right"
				>
					{listLink}
				</Tooltip>
			)
		}

		return listLink
	}
	
	const MasterDataList = () => (
		<div>
			<MenuLink
				link="/student"
				text={strings.panel.menu.studentListText}
				icon={<PersonIcon />}
			/>
			<MenuLink
				link="/class"
				text={strings.panel.menu.classListText}
				icon={<PeopleIcon />}
			/>
		</div>
	)

	const SecondaryListItems = () => (
		<div>
			<MenuLink
				link="/payment"
				text={strings.panel.menu.paymentText}
				icon={<AttachMoneyIcon />}
			/>
			<MenuLink
				link="/invoice"
				text={strings.panel.menu.invoicesText}
				icon={<FileCopyIcon />}
			/>
		</div>
	);

	return(
		<>
			<List className="p-0">
				<MenuLink
					link="/dashboard"
					text={strings.panel.menu.dashboardText}
					icon={<DashboardIcon />}
				/>
			</List>
			<Divider/>
			<List className="p-0">
				<MasterDataList/>
			</List>
			<Divider/>
			<List className="p-0">
				<SecondaryListItems/>
			</List>
			<List className="p-0">
				{process.env.NODE_ENV == 'development' &&
					<MenuLink
						link="/test"
						text="Test Page"
						icon={<DashboardIcon />}
					/>
				}
			</List>
		</>
	)
}

Menus.propTypes = {
	menuOpen: PropTypes.bool
}

export default Menus