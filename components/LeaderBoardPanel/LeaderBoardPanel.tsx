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
		<div className="flex flex-col h-full gap-5 py-9">
			<h2 className="text-xl font-semibold">Leaderboard</h2>
			<div className="flex flex-col gap-4">
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
