import React from "react";

interface ButtonProps {
	children: React.ReactNode | string;
	onClick: (e:any) => any;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return (
		<button
			className={`flex items-center justify-center px-4 py-3 font-bold text-white  bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:bg-indigo-700 ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
