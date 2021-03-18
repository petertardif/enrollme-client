import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		title: {
			flexGrow: 1,
		},
	})
);

export default function NavBarSimple() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						Enroll Me
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}