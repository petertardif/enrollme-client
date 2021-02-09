import { Typography, Link } from '@material-ui/core';

export default function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link
				color='inherit'
				href='https://www.github.com/petertardif'
				target='_blank'
				rel='noreferrer'
			>
				PJT Development
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
