import React from "react";
import Profile from "components/Profile/Profile";

interface PlayerGridPanelProps {}

const PlayerGridPanel: React.FC<PlayerGridPanelProps> = ({}) => {
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
		<div className="bg-[#27273E] rounded-xl flex items-center flex-col gap-9 py-9 h-full">
			<h2 className="text-xl font-semibold">Players</h2>
			<div className="grid grid-cols-4 gap-12">
				{usernames.map(username => (
					<Profile username={username} key={username} />
				))}
			</div>
		</div>
	);
};

export default PlayerGridPanel;
