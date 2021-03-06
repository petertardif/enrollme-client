import { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import NavBarSimple from './NavBarSimple';
import { AuthUtils } from '../utils/auth.utils';
import { TokenUtils } from '../utils/token.utils';

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

export default function SignIn() {
	const classes = useStyles();
	const [error, setError] = useState(null);

	const handleLoginSuccess = (userId: number) => {
		UserApiService.getUser(userId)
			.then((user) =>
				this.setState({
					user,
					isLoggedIn: true,
				})
			)
			.then(() => {
				history.push('/');
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	};

	const handleSubmitJwtAuth = (event: any) => {
		event.preventDefault();
		const { user_name, user_password } = event.target;

		AuthUtils.postLogin({
			user_name: user_name.value,
			user_password: user_password.value,
		})
			.then((response) => {
				user_name.value = '';
				user_password.value = '';
				TokenUtils.saveAuthToken(response.authToken);
				handleLoginSuccess(response.userId);
			})
			.catch((response) => {
				setError(response.error);
			});
	};

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
						Sign in
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleSubmitJwtAuth}
					>
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
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='/forgotpassword' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href='/signup' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</>
	);
}
