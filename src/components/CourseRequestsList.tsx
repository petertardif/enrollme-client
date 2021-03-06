import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import Title from './Title';
import { useQuery, gql } from '@apollo/client';

// Generate Order Data
function createData(
	id: number,
	date: string,
	name: string,
	shipTo: string,
	paymentMethod: string,
	amount: number
) {
	return { id, date, name, shipTo, paymentMethod, amount };
}

const COURSE_REQUESTS = gql`
	query GetCourses {
		courses {
			id
			course_code
			course_name
			course_desc
			course_level
			college_credits
			department
			culturally_relevant
		}
	}
`;

const rows = [
	createData(
		0,
		'16 Mar, 2019',
		'Elvis Presley',
		'Tupelo, MS',
		'VISA ⠀•••• 3719',
		312.44
	),
	createData(
		1,
		'16 Mar, 2019',
		'Paul McCartney',
		'London, UK',
		'VISA ⠀•••• 2574',
		866.99
	),
	createData(
		2,
		'16 Mar, 2019',
		'Tom Scholz',
		'Boston, MA',
		'MC ⠀•••• 1253',
		100.81
	),
	createData(
		3,
		'16 Mar, 2019',
		'Michael Jackson',
		'Gary, IN',
		'AMEX ⠀•••• 2000',
		654.39
	),
	createData(
		4,
		'15 Mar, 2019',
		'Bruce Springsteen',
		'Long Branch, NJ',
		'VISA ⠀•••• 5919',
		212.79
	),
];

function handleClick(e: React.MouseEvent) {
	e.preventDefault();
}

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export default function CourseRequestsList() {
	const classes = useStyles();
	const { loading, error, data } = useQuery(COURSE_REQUESTS);
	console.log(data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<Title>Course Requests</Title>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Course Name</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Ship To</TableCell>
						<TableCell>Payment Method</TableCell>
						<TableCell align='right'>Sale Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.shipTo}</TableCell>
							<TableCell>{row.paymentMethod}</TableCell>
							<TableCell align='right'>{row.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className={classes.seeMore}>
				<Link color='primary' href='#' onClick={handleClick}>
					See more orders
				</Link>
			</div>
		</>
	);
}
