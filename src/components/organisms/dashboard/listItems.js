import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { Divider, List, ListItemButton } from '@mui/material';
import useLocalization from '../../../lib/useLocalization';
import { useRouter } from 'next/router';
import { Link, Tooltip } from '../../atoms';
import PropTypes, { string } from 'prop-types'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNoPersistConfig } from '../../../lib/redux/slices/noPersistConfigSlice';

const Menus = ({menuOpen}) => {
	const strings = useLocalization()
	const { profile } = useSelector(selectNoPersistConfig)
	const router = useRouter()
	const firstRoute = '/' + router.pathname.split('/')[1] || '/'

	const [showAllMenu, setshowAllMenu] = useState(false)

	if (process.env.NODE_ENV == 'development') {
		useEffect(() => {
			console.log('Components > Panel > listItem: Router', router)
		}, [router])
		useEffect(() => {
			console.log('Components > Panel > listItem: Selecting profile from redux', profile)
		}, [profile])
	}

	const MenuLink = ({link,text,icon}) => {
		const listLink = (<Link noLinkStyle={true} href={link}>
			<ListItemButton
				selected={firstRoute == link}
			>
				<ListItemIcon>
					{icon}
				</ListItemIcon>
				<ListItemText className="capitalize">
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
				link="/class"
				text={strings.panel.menu.classListText}
				icon={<PeopleIcon />}
			/>
			<MenuLink
				link="/student"
				text={strings.panel.menu.studentListText}
				icon={<PersonIcon />}
			/>
		</div>
	)

	const AdminMenu = () => (
		<div>
			<MenuLink
				link="/payment"
				text={'menu admin 1'}
				icon={<AttachMoneyIcon />}
			/>
			<MenuLink
				link="/invoice"
				text={'menu admin 2'}
				icon={<FileCopyIcon />}
			/>
		</div>
	);

	const StudentMenu = () => (
		<div>
			<MenuLink
				link="/bill"
				text={strings.panel.menu.billText}
				icon={<AttachMoneyIcon />}
			/>
			<MenuLink
				link="/invoice"
				text={'menu siswa 2'}
				icon={<FileCopyIcon />}
			/>
		</div>
	);

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
			{(profile.accountType === 'admin' || showAllMenu) &&
				<>
				<List className="p-0">
					<MasterDataList/>
				</List>
				<Divider/>
				<List className="p-0">
					<SecondaryListItems/>
				</List>
				<Divider/>
				<List className="p-0">
					<AdminMenu/>
				</List>
				</>
			}
			{(profile.accountType === 'student' || showAllMenu) &&
				<>
				<List className="p-0">
					<StudentMenu/>
				</List>
				</>
			}
			{process.env.NODE_ENV == 'development' &&
				<List className="p-0">
					<MenuLink
							link="/test"
							text="Test Page"
							icon={<DeveloperModeIcon />}
						/>
						<ListItemButton onClick={() => setshowAllMenu(!showAllMenu)}>
							<ListItemIcon>
								<DeveloperModeIcon/>
							</ListItemIcon>
							<ListItemText>
								Show / hide all menu
							</ListItemText>
						</ListItemButton>
						
				</List>
			}
		</>
	)
}

Menus.propTypes = {
	menuOpen: PropTypes.bool
}

export default Menus