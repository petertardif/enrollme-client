import clsx from 'clsx';
import { Drawer } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { List } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
	MainListItems,
	SecondaryListItems,
} from './HomePageLeftDrawerListItems';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: 240,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
}));

interface Props {
	open: boolean;
	setOpen: (arg0: boolean) => void;
}

export default function HomePageLeftDrawer(props: Props) {
	const { open, setOpen } = props;
	const classes = useStyles();

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Drawer
			variant='permanent'
			classes={{
				paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
			}}
			open={open}
		>
			<div className={classes.toolbarIcon}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				<MainListItems />
			</List>
			<Divider />
			<List>
				<SecondaryListItems />
			</List>
		</Drawer>
	);
}
