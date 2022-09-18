import { Player } from "./PodiumStep";
import PodiumStep from "./PodiumStep";

interface PodiumProps {
	readonly players: Player[];
}

const Podium: React.FC<PodiumProps> = ({ players }) => {
	const podium = [1, 0, 2] // first second third positions
		.reduce(
			(podiumOrder, position) => [...podiumOrder, players[position]],
			[] as readonly Player[]
		)
		.filter(Boolean);

	return (
		<div
			className="grid grid-flow-col-dense gap-8 justify-center justify-items-center place-content-center content-end items-end"
			style={{ height: 500 }}
		>
			{podium.map((Player, index) => (
				<PodiumStep
					key={Player.id}
					podium={podium}
					player={Player}
					index={index}
				/>
			))}
		</div>
	);
};

export default Podium;
