import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menus from '../../organisms/dashboard/listItems';
import Chart from '../../organisms/dashboard/Chart';
import Deposits from '../../organisms/dashboard/Deposits.js';
import Orders from '../../organisms/dashboard/Orders';
import { ButtonSwitchLanguage, ButtonToggleDarkMode, Copyright, SpinnerBackdrop, Tooltip } from '../../atoms';
import PropTypes from 'prop-types'
import useLocalization from '../../../lib/useLocalization';
import useFetchApi from '../../../lib/useFetchApi';
import { Avatar, Button } from '@mui/material';
import { MenuDropdown } from '../../organisms';
import { useSelector } from 'react-redux';
import { clearAuthToken, selectAuth } from '../../../lib/redux/slices/authSlice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { hideSpinner, selectNoPersistConfig, setProfile } from '../../../lib/redux/slices/noPersistConfigSlice';
import { useUpdateEffect } from 'react-use';
import ReplayIcon from '@mui/icons-material/Replay';
import { selectConfig, togglePanelOpen } from '../../../lib/redux/slices/configSlice';


const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7)
		}),
	},
  }),
);

const Panel = ({children}) => {
	
	const strings = useLocalization()
	const dispatch = useDispatch()
	const router = useRouter()
	const noPersistConfig = useSelector(selectNoPersistConfig)
	const auth = useSelector(selectAuth)

	// const [open, setOpen] = useState(true);
	const { panelOpen:open } = useSelector(selectConfig)
	const [loadingAuth, setloadingAuth] = useState(true)
	const [loadingProfile, setloadingProfile] = useState(true)
	const [refreshProfile, setrefreshProfile] = useState(0)

	const [profileData, loadingFetchProfile, fetchProfileError, errorMessage, errorData] = useFetchApi('/auth/profile' + refreshProfile, {
		url: '/auth/profile',
		headers:{
			"Authorization" : `Bearer ${auth.authToken}`
		}
	})
	const loading = (loadingAuth || loadingProfile || !noPersistConfig.profile)
	
	const toggleDrawer = () => {
		dispatch(togglePanelOpen())
	};

	const retryProfileFetchError = () => {
		setrefreshProfile(refreshProfile + 1)
	}

	useEffect(() => {
		if (auth) {
            if (auth.authToken == null) {
                router.push('/')
            } else {
                setloadingAuth(false)
				dispatch(hideSpinner())
            }
        }
	}, [auth])

	if (process.env.NODE_ENV === 'development') {
		useEffect(() => {
			console.log('Components > Panel : profile initialization',noPersistConfig.profile)
		}, [noPersistConfig.profile])
	}

	useEffect(() => {
		if (!fetchProfileError) {
			setloadingProfile(false)
			dispatch(setProfile(profileData))
		}
	}, [profileData])

	useEffect(() => {
		if (errorData) {
			if(errorData.status == 403) {
				dispatch(clearAuthToken())
			}
		}
	}, [errorData])

	// if (fetchProfileError) {
	if (fetchProfileError) {
		if(errorData) {
			if(errorData.status == 403) {
				return <SpinnerBackdrop />
			}
		}

		return(
			<Box className="flex h-screen items-center justify-between">
				<div className="mx-auto grid grid-cols-1">
					<div className="mx-auto mb-5">
						<img src="/error.png" alt="Error" className="h-40 m-0"/>
					</div>
					<Typography variant="h5" gutterBottom>
						{strings.default.anErrorOccured}: {errorMessage}
					</Typography>
					<div className="mx-auto">
						<Button variant="contained" color="primary" onClick={retryProfileFetchError} startIcon={<ReplayIcon/>}>
							{strings.default.retryText}
						</Button>
					</div>
				</div>
			</Box>
			// <div>
			// 	{strings.default.anErrorOccured}: {errorMessage}
			// </div>
		)
	}

	if (loading) {
		return <SpinnerBackdrop />
	}

	return (
		<Box className="flex">
			<AppBar position="absolute" open={open}>
				<Toolbar className="pr-6">
					<Tooltip
						title={strings.appBar.showMenuTooltipText}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							className="mr-9"
							sx={{
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
					</Tooltip>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }}
					>
						{process.env.NEXT_PUBLIC_COMPANY_NAME}
					</Typography>
					<Tooltip
						title={strings.appBar.notificationTooltipText}
					>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
									<NotificationsIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<ButtonSwitchLanguage />
					<ButtonToggleDarkMode variant="icon"/>
					<MenuDropdown/>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<Toolbar
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						px: [1]
					}}
				>
					<div className="w-full text-left flex overflow-hidden items-center">
						<Avatar
							className="mr-6 bg-blue-500 font-bold"
						>
							TS
						</Avatar>
						<Typography width="100%" className="overflow-hidden overflow-ellipsis text-base capitalize" >
							{noPersistConfig.profile.fullName || ''}
						</Typography>
					</div>
					<Tooltip
						title={strings.appBar.hideMenuTooltipText}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Tooltip>
				</Toolbar>
				<Divider />
				<Menus
					menuOpen={open}
				/>
			</Drawer>
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
						? theme.palette.grey[100]
						: theme.palette.grey[900],
					flexGrow: 1,
					height: '100vh',
					overflow: 'auto',
				}}
			>
				<Toolbar />
				<Container maxWidth="xl" className="mx-auto p-3">
					<Grid container spacing={1}>
						<Grid item xs={12} md={12} lg={12} xl={8}>
							{children}
						</Grid>
					</Grid>
					<Copyright sx={{ pt: 4 }} />
				</Container>
			</Box>
		</Box>
	);
}

Panel.propTypes = {
	children: PropTypes.element.isRequired
}

export default Panel