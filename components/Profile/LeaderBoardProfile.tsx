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
		<div className="flex justify-between items-center">
			<div className="flex gap-4  items-center">
				<div className="bg-white p-3 rounded-full flex justify-center items-center w-9 h-9">
					<Identicon
						string={username}
						size={20}
						padding={0}
						bg="#ffffff"
					/>
				</div>
				<p>{username}</p>
			</div>
			<p>{score}</p>
		</div>
	);
};
export default LeaderBoardProfile;
