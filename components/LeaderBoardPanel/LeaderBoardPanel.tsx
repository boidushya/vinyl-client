import React, { useEffect, useState } from "react";
import LeaderBoardProfile from "components/Profile/LeaderBoardProfile";
import useGameStore from "store/gameStore";
import { socket } from "utils/webSocket";
import { useRouter } from "next/router";

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

	const {roomId,setWinners} =useGameStore();
  	const [users, setUsers]=useState<any>();
    const router=useRouter();

	useEffect(()=>{},[users])
	
	socket.on('updated-score-board',async(result)=>{
		 const scores:any = await Object.values(result)[0];
		
		const data = await scores.map((score: any) => {
			return ({ 
				username: score[0],
				score: score[1]
			})
		})

		await data.sort((a:any,b:any)=>b.score-a.score)

		setUsers(data);
		//console.log(data);
		
	});

	socket.on("game-end", async(result) => {

		if(users){
			const winners=users.slice(0,3);

		const winner_data=winners.map((winner:any,idx:number)=>{
			return({
				name:winner.username,
				rank:idx+1,
				score:winner.score
			})
		})

		setWinners(winner_data);
		console.log(winner_data,"winners");
		router.push("/results")
		}
		

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
