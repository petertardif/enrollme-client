import { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ListSubheader } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import { ExpandMore } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	})
);

export function MainListItems() {
	const classes = useStyles();
	const [subopen, setSubOpen] = useState(false);

	const handleClick = () => {
		setSubOpen(!subopen);
	};
	return (
		<div>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<SchoolIcon />
				</ListItemIcon>
				<ListItemText primary='Students' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary='Instructors' />
			</ListItem>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<PostAddIcon />
				</ListItemIcon>
				<ListItemText primary='Course Requests' />
				{subopen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={subopen} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary='Add Courses' />
					</ListItem>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<ListIcon />
						</ListItemIcon>
						<ListItemText primary='Current List' />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				<ListItemText primary='Reports' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<AttachMoneyIcon />
				</ListItemIcon>
				<ListItemText primary='Finances' />
			</ListItem>
		</div>
	);
}

export function SecondaryListItems() {
	return (
		<div>
			<ListSubheader inset>Saved reports</ListSubheader>
			<ListItem button>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				<ListItemText primary='Current year' />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				<ListItemText primary='Last year' />
			</ListItem>
		</div>
	);
}
