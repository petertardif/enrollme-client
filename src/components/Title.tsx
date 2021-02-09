import { Typography } from '@material-ui/core';

type Props = {
	children: string;
};

export default function Title({ children }: Props) {
	return (
		<Typography component='h2' variant='h6' color='primary' gutterBottom>
			{children}
		</Typography>
	);
}
