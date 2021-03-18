import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import NavBarSimple from './NavBarSimple';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function ForgotPassword() {
	const classes = useStyles();

	return (
		<>
			<NavBarSimple />
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Forgot Password
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Reset Password
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='/signin' variant='body2'>
									I remember my password!
								</Link>
							</Grid>
							<Grid item>
								<Link href='/signup' variant='body2'>
									{'I need an account'}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</>
	);
}
