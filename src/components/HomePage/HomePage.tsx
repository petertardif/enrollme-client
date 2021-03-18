import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Link } from '@material-ui/core';
import CourseRequestsStepper from '../CourseRequestsStepper';
import Copyright from '../Copyright';
import HomePageHeader from './HomePageHeader';
import HomePageLeftDrawer from './HomePageLeftDrawer';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 800,
	},
}));

export default function HomePage() {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const [auth, setAuth] = useState(true);
	const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<HomePageHeader
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
				open={open}
				setOpen={setOpen}
				auth={auth}
			/>
			<HomePageLeftDrawer open={open} setOpen={setOpen} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='lg' className={classes.container}>
					<Grid container spacing={3}>
						{/* CourseRequestsStepper */}
						<Grid item xs={12} md={12} lg={12}>
							<Paper className={fixedHeightPaper}>
								<CourseRequestsStepper />
							</Paper>
						</Grid>
						{/* Recent Deposits */}
						{/* <Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}><Deposits /></Paper>
						</Grid> */}
						{/* Recent Orders */}
						{/* <Grid item xs={12}>
							<Paper className={classes.paper}>
								<CourseRequestsList />
							</Paper>
						</Grid> */}
					</Grid>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
}
