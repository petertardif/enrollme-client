import { useState } from 'react';

export const Input = () => {
	const [name, setName] = useState<string>('');
	return <input value={name} onChange={(e) => setName(e.target.value)} />;
};
