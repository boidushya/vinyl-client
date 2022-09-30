import React, { useState } from "react";
import LeaderBoardProfile from "components/Profile/LeaderBoardProfile";
import useGameStore from "store/gameStore";
import { socket } from "utils/webSocket";

interface LeaderBoardPanelProps {}



// const users = [
// 	{
// 		id: "dfads",
// 		username: "mavn",
// 		score: 242,
// 	},
// 	{
// 		id: "fs",
// 		username: "mavn",
// 		score: 242,
// 	},
// 	{
// 		id: "dffdaads",
// 		username: "mavn",
// 		score: 242,
// 	},
// 	{
// 		id: "fas",
// 		username: "mavn",
// 		score: 242,
// 	},
// ];

const LeaderBoardPanel: React.FC<LeaderBoardPanelProps> = ({}) => {

	const {roomId} =useGameStore();
  	const [users, setUsers]=useState<any>();

	
	socket.on('updated-score-board',(result)=>{
		 const scores:any = Object.values(result)[0];
		
		const data = scores.map((score: any) => {
			return ({ 
				username: score[0],
				score: score[1]
			})
		})

		setUsers(data);
		console.log(data);
		
	});
		// console.log(result,"updated score board")
	

	return (
		<div className="flex flex-col h-full gap-5 py-9">
			<h2 className="text-xl font-semibold">Leaderboard</h2>
			<div className="flex flex-col gap-4">
				{users && users.map((user: { username: string; score: number; }) => (
					<LeaderBoardProfile
						key={user.username}
						id={user.username}
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
