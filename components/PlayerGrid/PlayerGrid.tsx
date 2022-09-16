import React from "react";
import Profile from "components/Profile/Profile";

interface PlayerGridProps {}

const PlayerGrid: React.FC<PlayerGridProps> = ({}) => {
	const usernames = [
		"mavn",
		"Test",
		"hello",
		"this is name",
		"kialde",
		"loda",
		"lassan",
		"bakchod",
		"react",
		"angular",
		"vue",
		"lorem ipsum",
	];
	return (
		<div className="bg-[#27273E] p-6 rounded-xl flex items-center flex-col gap-7 h-full">
			<h2 className="text-xl font-semibold">Players</h2>
			<div className="grid grid-cols-4 gap-16">
				{usernames.map(username => (
					<Profile username={username} key={username} />
				))}
			</div>
		</div>
	);
};

export default PlayerGrid;
