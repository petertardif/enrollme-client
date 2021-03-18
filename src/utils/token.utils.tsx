import { config } from '../config';

interface BasicAuthTokenProps {
	userName: string;
	password: string;
}

export const TokenUtils = {
	saveAuthToken(token: string) {
		window.localStorage.setItem(config.REACT_APP_TOKEN_KEY, token);
	},
	getAuthToken() {
		return window.localStorage.getItem(config.REACT_APP_TOKEN_KEY);
	},
	clearAuthToken() {
		window.localStorage.removeItem(config.REACT_APP_TOKEN_KEY);
	},
	hasAuthToken() {
		return !!TokenUtils.getAuthToken();
	},
	makeBasicAuthToken(props: BasicAuthTokenProps) {
		const { userName, password } = props;
		return window.btoa(`${userName}:${password}`);
	},
};
