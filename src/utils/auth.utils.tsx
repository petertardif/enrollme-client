import { config } from '../config';

interface PostLoginProps {
	user_name: string;
	user_password: string;
}

export const AuthUtils = {
	postLogin(props: PostLoginProps) {
		const { user_name, user_password } = props;

		return fetch(`${config.API_BASE_URL}/authentication/login`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ user_name, user_password }),
		}).then((response) => {
			if (!response.ok) {
				return response.json().then((e) => Promise.reject(e));
			}
			return response.json();
		});
	},
	// postUser(user) {
	//   return fetch(`${config.API_BASE_URL}/users`, {
	//     method: 'POST',
	//     headers: {
	//       'Content-Type': 'Application/json'
	//     },
	//     body: JSON.stringify(user)
	//   })
	//     .then(response => {
	//       if (!response.ok) {
	//         return response.json().then(e => Promise.reject(e));
	//       }
	//         return response.json()
	//     })
	// }
};
