type Props = {
	onClick: () => void;
};

export const Button = ({ onClick }: Props) => {
	return <button onClick={onClick}>Click Me</button>;
};
