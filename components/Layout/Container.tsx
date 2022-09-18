import React from "react";

interface ContainerProps {
	left: React.ReactNode;
	children: React.ReactNode;
	right: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
	left,
	children,
	right,
}) => {
	return (
		<main className="container box-border flex h-screen mx-auto gap-9 py-9">
			<div className="w-1/4 h-full">{left}</div>
			<div className="w-1/2 h-full grow">{children}</div>
			<div className="w-1/4 h-full">{right}</div>
		</main>
	);
};

export default Container;
