import { useState } from 'react';
import { getComparator, stableSort } from './courseslist.utils';
import clsx from 'clsx';
import {
	createStyles,
	lighten,
	makeStyles,
	Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import CoursesListFilterModal from './CoursesListFilterModal';
import { useQuery, gql } from '@apollo/client';

const COURSES = gql`
	query GetCourses {
		courses {
			id
			course_code
			course_name
			course_desc
			course_level
			college_credits
			department
			hs_credits
			hs_department
			culturally_relevant
		}
	}
`;

interface Data {
	id: number;
	course_code: number;
	course_name: string;
	course_desc: string;
	course_level: string;
	college_credits: number;
	department: string;
	hs_credits: number;
	hs_department: string;
	culturally_relevant: boolean;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: HeadCell[] = [
	{
		id: 'course_name',
		numeric: false,
		disablePadding: true,
		label: 'Course Name',
	},
	{
		id: 'course_code',
		numeric: true,
		disablePadding: false,
		label: 'Course Code',
	},
	{
		id: 'college_credits',
		numeric: true,
		disablePadding: false,
		label: 'College Credits',
	},
	{
		id: 'department',
		numeric: false,
		disablePadding: false,
		label: 'Department',
	},
	{
		id: 'hs_department',
		numeric: false,
		disablePadding: false,
		label: 'HS Department',
	},
];

interface EnhancedTableProps {
	classes: ReturnType<typeof useStyles>;
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property: keyof Data) => (
		event: React.MouseEvent<unknown>
	) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const useToolbarStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1),
		},
		highlight:
			theme.palette.type === 'light'
				? {
						color: theme.palette.secondary.main,
						backgroundColor: lighten(theme.palette.secondary.light, 0.85),
				  }
				: {
						color: theme.palette.text.primary,
						backgroundColor: theme.palette.secondary.dark,
				  },
		title: {
			flex: '1 1 auto',
		},
		textField: {
			width: '35vw',
		},
	})
);

interface EnhancedTableToolbarProps {
	numSelected: number;
	searchTerm: string;
	setSearchTerm: (event: string) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const classes = useToolbarStyles();
	const { numSelected, searchTerm, setSearchTerm } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color='inherit'
					variant='subtitle1'
					component='div'
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant='h6'
					id='tableTitle'
					component='div'
				>
					Courses
				</Typography>
			)}
			<Typography className={classes.title}>
				<TextField
					className={classes.textField}
					id='outlined-search'
					label='Search'
					type='search'
					variant='outlined'
					size='small'
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
			</Typography>
			{numSelected > 0 ? (
				<Tooltip title='Delete'>
					<IconButton aria-label='delete'>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<CoursesListFilterModal />
			)}
		</Toolbar>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
		},
		paper: {
			width: '100%',
			marginBottom: theme.spacing(2),
		},
		table: {
			minWidth: 750,
		},
		visuallyHidden: {
			border: 0,
			clip: 'rect(0 0 0 0)',
			height: 1,
			margin: -1,
			overflow: 'hidden',
			padding: 0,
			position: 'absolute',
			top: 20,
			width: 1,
		},
	})
);

export default function EnhancedTable() {
	const classes = useStyles();
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<keyof Data>('course_name');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selected, setSelected] = useState<string[]>([]);
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(20);
	const { loading, error, data } = useQuery(COURSES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const searchedCourses = data.courses.filter((course: any) =>
		course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = data.courses.map((n: any) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	};

	const isSelected = (id: string) => selected.indexOf(id) !== -1;

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, data.courses.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'medium'}
						aria-label='enhanced table'
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={data.courses.length}
						/>
						<TableBody>
							{stableSort(searchedCourses, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id.toString());
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.id.toString())}
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.course_name}
											selected={isItemSelected}
										>
											<TableCell padding='checkbox'>
												<Checkbox
													checked={isItemSelected}
													inputProps={{ 'aria-labelledby': labelId }}
												/>
											</TableCell>
											<TableCell
												component='th'
												id={labelId}
												scope='row'
												padding='none'
											>
												{row.course_name}
											</TableCell>
											<TableCell align='right'>{row.course_code}</TableCell>
											<TableCell align='center'>
												{row.college_credits}
											</TableCell>
											<TableCell align='left'>{row.department}</TableCell>
											<TableCell align='left'>{row.hs_department}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[20, 50, 100]}
					component='div'
					count={searchedCourses.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label='Dense padding'
			/>
		</div>
	);
}
