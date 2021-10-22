import * as React from 'react';
import { IconButton } from '@mui/material/';
import { MenuList, Menu, MenuItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import { LogoutButtonWithDialog } from '..';
import useLocalization from '../../../lib/useLocalization';
import { Tooltip, Link } from '../../atoms';

const MenuDropdown = () => {
	const strings = useLocalization()
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

  return (
	<div>
		<Tooltip
			title={strings.appBar.toggleMiniMenu}
			placement="left"
			arrow
		>
			<IconButton
				color="inherit"
				id="menu-dropdown-button"
				aria-controls="basic-menu"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<MoreVertIcon/>
			</IconButton>
		</Tooltip>
		<Menu
			id="menu-dropdown-menu"
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			MenuListProps={{
				'aria-labelledby': 'menu-dropdown-button',
			}}
		>
			<MenuList
				dense
				className="p-0"
			>
				<MenuItem>
					<ListItemIcon>
						<SettingsIcon fontSize="small" />
					</ListItemIcon>
					<Link href="/settings" noLinkStyle>
						<ListItemText>
							{strings.appBar.settingMiniMenuText}
						</ListItemText>
					</Link>
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<LanguageIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>
						{strings.about.officialWebsiteText}
					</ListItemText>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<InfoIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>
						{strings.about.findUsText}
					</ListItemText>
				</MenuItem>
				<Divider />
				<LogoutButtonWithDialog>
					<MenuItem>
						<ListItemIcon>
							<LogoutIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>
							{strings.default.alertLogoutText}
						</ListItemText>
					</MenuItem>
				</LogoutButtonWithDialog>
			</MenuList>
		</Menu>
		</div>
	);
}

export default MenuDropdown