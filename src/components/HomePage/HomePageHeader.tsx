import clsx from 'clsx';
import { AppBar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { MenuItem } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
}));

interface Props {
	anchorEl: null | HTMLButtonElement;
	setAnchorEl: (event: HTMLButtonElement | null) => void;
	open: boolean;
	setOpen: (arg0: boolean) => void;
	auth: boolean;
}

export default function HomePageHeader(props: Props) {
	const { anchorEl, setAnchorEl, open, setOpen, auth } = props;

	const classes = useStyles();
	const openAccount = Boolean(anchorEl);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar
			position='absolute'
			className={clsx(classes.appBar, open && classes.appBarShift)}
		>
			<Toolbar className={classes.toolbar}>
				<IconButton
					edge='start'
					color='inherit'
					aria-label='open drawer'
					onClick={handleDrawerOpen}
					className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					component='h1'
					variant='h6'
					color='inherit'
					noWrap
					className={classes.title}
				>
					Enroll Me
				</Typography>
				<IconButton color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				{/* user account button */}
				{auth && (
					<div>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={openAccount}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Account</MenuItem>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>Sign out</MenuItem>
						</Menu>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
}
