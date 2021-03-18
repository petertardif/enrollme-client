import './App.css';
import '@fontsource/roboto';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ForgotPassword from './components/ForgotPassword';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/forgotpassword'>
						<ForgotPassword />
					</Route>
					<Route path='/signin'>
						<SignIn />
					</Route>
					<Route path='/signup'>
						<SignUp />
					</Route>
					<Route path='/'>
						<HomePage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
