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
		<div className="flex gap-9">
			<div className="w-1/4">{left}</div>
			<div className="grow w-1/2">{children}</div>
			<div className="w-1/4">{right}</div>
		</div>
  );
};

export default Container;
