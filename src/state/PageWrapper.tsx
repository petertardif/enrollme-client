import { createContext, useContext } from 'react';

export const AppContext = createContext({
	courses: {},
});

export const PageWrapper = ({ children }: any) => {
	return (
		<AppContext.Provider
			value={{
				courses: {},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppState = () => useContext(AppContext);
