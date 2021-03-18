import { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			margin: theme.spacing(1),
		},
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
			width: '60vw',
		},
	})
);

export default function CoursesListFilterModal() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Tooltip title='Filter list'>
				<IconButton onClick={handleOpen} aria-label='filter list'>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id='transition-modal-title'>Filters</h2>
						<p id='transition-modal-description'>
							Select the appropriate filters
						</p>
						<Button
							size='small'
							className={classes.button}
							startIcon={<CloseIcon />}
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							color='primary'
							size='small'
							className={classes.button}
							startIcon={<SaveIcon />}
						>
							Save
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
