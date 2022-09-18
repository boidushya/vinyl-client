import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

export type Type = "confetti" | "money";

export interface Props {
	type?: Type;
	onDestroy?: (...args: any[]) => any;
	className?: string;
}

const Celebrate = ({ className, type, onDestroy }: Props): JSX.Element => {
	const [destroy, setDestroy] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			if (onDestroy) onDestroy();
			setDestroy(true);
		}, 3.5 * 1000);

		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const Particle = ({ index }: { index: number }): JSX.Element => {
		return (
			<div
				className={`
          uik-celebrate__particle
          uik-celebrate__particle--${index}
        `}
			/>
		);
	};

	return (
		<div
			className={`
        uik-celebrate
        uik-celebrate--${type || "confetti"}
        ${destroy ? "uik-celebrate--destroy" : ""}
        ${className || ""}
      `}
		>
			{(() => {
				let output: Array<JSX.Element> = [];

				for (let i = 0; i < 150; i++) {
					output.push(<Particle key={i} index={i} />);
				}

				return output;
			})()}
		</div>
	);
};

class Container {
	id: string;
	root: HTMLElement | null;

	constructor(id: string) {
		this.id = id;
		this.root = null;
	}

	getElement = () => {
		return document.getElementById(this.id);
	};

	create = () => {
		let el = this.getElement();

		if (!el) {
			el = document.createElement("div");
			el.id = this.id;
			document.body.appendChild(el);
		}

		this.root = el;
	};

	render = (children: JSX.Element) => {
		if (!this.root) this.create();
		if (this.root) createRoot(this.root).render(children);
	};

	destroy = () => {
		if (!this.root) return;
		this.root.remove();
		this.root = null;
	};
}

const container = new Container("uik-celebrate-container");

const drop = (type?: Type) => {
	container.render(<Celebrate onDestroy={container.destroy} type={type} />);
};

export const dropConfetti = () => {
	drop("confetti");
};
