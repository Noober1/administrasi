import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleIcon from '@mui/icons-material/People';
import { Divider, List, ListItemButton } from '@mui/material';
import useLocalization from '../../../lib/useLocalization';
import { useRouter } from 'next/router';
import { Link, Tooltip } from '../../atoms';
import PropTypes from 'prop-types'

const Menus = ({menuOpen}) => {
	const strings = useLocalization()
	const router = useRouter()

	const MenuLink = ({link,text,icon}) => {
		const listLink = (<Link noLinkStyle={true} href={link}>
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
				<MainListItems/>
			</List>
			<Divider/>
			<List className="p-0">
				<SecondaryListItems/>
			</List>
			<Divider/>
		</>
	)
}

Menus.propTypes = {
	menuOpen: PropTypes.bool
}

export default Menus