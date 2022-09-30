import React from "react";
import Identicon from "react-identicons";

interface LeaderBoardProfileProps {
	id: string;
	username: string;
	score: number;
	isWinning: boolean;
}

const LeaderBoardProfile: React.FC<LeaderBoardProfileProps> = ({
	id,
	isWinning = false,
	score,
	username,
}) => {

	
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="flex items-center justify-center w-6 h-6 p-3 bg-white rounded-full">
					<Identicon
						string={username}
						size={11}
						padding={0}
						bg="#ffffff"
					/>
				</div>
				<p className="font-bold">{username}</p>
			</div>
			<p className="text-sm">{score}</p>
		</div>
	);
};
export default LeaderBoardProfile;
