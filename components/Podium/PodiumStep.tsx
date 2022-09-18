import Profile from "components/Profile/Profile";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Player {
	id: string;
	name: string;
	rank: number;
	score: number;
}

interface Props {
	readonly podium: Player[];
	readonly player: Player;
	readonly index: number;
}

export default function PodiumStep({ podium, player, index }: Props) {
	return (
		<div className="flex flex-col items-center">
			<motion.div
				custom={index}
				initial="hidden"
				animate="visible"
				variants={{
					visible: () => ({
						opacity: 1,
						transition: {
							delay: 0.3 + (podium.length - player.rank),
							duration: 0.75,
						},
					}),
					hidden: { opacity: 0 },
				}}
				className="mb-4 self-center"
			>
				<Profile username={player.name} />
			</motion.div>
			<motion.div
				custom={index}
				initial="hidden"
				animate="visible"
				variants={{
					visible: () => ({
						height:
							300 *
								((podium.length - player.rank) /
									podium.length) +
							100,
						opacity: 2,
						transition: {
							delay: 0.3 + (podium.length - player.rank),
							duration: 2,
							ease: "backInOut",
						},
					}),
					hidden: { opacity: 0, height: 0 },
				}}
				className="bg-indigo-600 flex w-28 shadow-lg place-content-center"
				style={{
					filter: `opacity(${
						0.7 + (podium.length - player.rank) / podium.length
					})`,
				}}
			>
				<span className="self-end mb-4 text-white font-semibold">
					{player.score}
				</span>
			</motion.div>
		</div>
	);
}
