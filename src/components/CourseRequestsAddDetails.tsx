import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
) {
	return { name, calories, fat, carbs, protein };
}

const currencies = [
	{
		value: 'USD',
		label: '$',
	},
	{
		value: 'EUR',
		label: '€',
	},
	{
		value: 'BTC',
		label: '฿',
	},
	{
		value: 'JPY',
		label: '¥',
	},
];

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CourseRequestsAddDetails() {
	const classes = useStyles();
	const [currency, setCurrency] = useState('EUR');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrency(event.target.value);
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} size='small' aria-label='a dense table'>
				<TableHead>
					<TableRow>
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align='right'>Calories</TableCell>
						<TableCell align='right'>Fat&nbsp;(g)</TableCell>
						<TableCell align='right'>Carbs&nbsp;(g)</TableCell>
						<TableCell align='right'>Protein&nbsp;(g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							<TableCell align='right'>{row.calories}</TableCell>
							<TableCell align='right'>{row.fat}</TableCell>
							<TableCell align='right'>{row.carbs}</TableCell>
							<TableCell align='right'>
								<TextField
									id='standard-select-currency'
									select
									label='Select'
									value={currency}
									onChange={handleChange}
									helperText='Please select your currency'
								>
									{currencies.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								{row.protein}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
