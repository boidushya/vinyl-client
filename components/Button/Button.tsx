import React from "react";

interface ButtonProps {
	children: React.ReactNode | string;
	onClick: () => void;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return (
		<button
			className={`flex items-center px-4 font-bold text-white bg-[#7463F4] hover:bg-[#6052ca] focus:bg-[#5242cd] ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
