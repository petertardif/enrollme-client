export const config = {
	API_BASE_URL:
		process.env.REACT_APP_API_BASE_URL ||
		`https://communitytoolbox.herokuapp.com/api`,
	REACT_APP_TOKEN_KEY: 'enrollme-auth-token',
	// REACT_APP_BASKET_KEY: 'community-toolbox-basket',
};
