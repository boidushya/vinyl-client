import React from "react";
import Profile from "components/Profile/Profile";

interface PlayerGridPanelProps {}

const PlayerGridPanel: React.FC<PlayerGridPanelProps> = ({}) => {
	const usernames = [
		"admin",
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

	const admin = "admin";

	return (
		<div className="bg-[#27273E] rounded-xl flex items-center flex-col gap-9 py-9 h-full">
			<h2 className="text-xl font-semibold">Players</h2>
			<div className="grid grid-cols-4 gap-12">
				{usernames.map(username => {
					if (username == admin) {
						return (
							<Profile
								username={username}
								key={username}
								isEditable
							/>
						);
					}
					return (
						<Profile
							username={username}
							key={username}
							isKickable
						/>
					);
				})}
			</div>
		</div>
	);
};

export default PlayerGridPanel;
