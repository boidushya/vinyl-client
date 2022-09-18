import React from "react";
import LeaderBoardProfile from "components/Profile/LeaderBoardProfile";

interface LeaderBoardPanelProps {}

const users = [
	{
		id: "dfads",
		username: "mavn",
		score: 242,
	},
	{
		id: "fs",
		username: "mavn",
		score: 242,
	},
	{
		id: "dffdaads",
		username: "mavn",
		score: 242,
	},
	{
		id: "fas",
		username: "mavn",
		score: 242,
	},
];

const LeaderBoardPanel: React.FC<LeaderBoardPanelProps> = ({}) => {
	return (
		<div className="flex flex-col gap-5 py-9 h-full">
			<h2 className="text-xl font-semibold">Leader Board</h2>
			<div className="flex gap-4 flex-col">
				{users.map(user => (
					<LeaderBoardProfile
						key={user.id}
						id={user.id}
						username={user.username}
						score={user.score}
						isWinning
					/>
				))}
			</div>
		</div>
	);
};

export default LeaderBoardPanel;
