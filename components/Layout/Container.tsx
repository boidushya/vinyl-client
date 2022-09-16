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
		<main className="flex gap-9 container mx-auto py-9 h-screen box-border">
			<div className="w-1/4 h-full">{left}</div>
			<div className="grow w-1/2 h-full">{children}</div>
			<div className="w-1/4 h-full">{right}</div>
		</main>
  );
};

export default Container;
