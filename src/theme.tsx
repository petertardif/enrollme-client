import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#0076BD',
		},
		secondary: {
			main: '#5F2467',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#fff',
		},
	},
});

export default theme;
