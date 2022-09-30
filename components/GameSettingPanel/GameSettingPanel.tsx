import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Button from "components/Button/Button";
import useGameStore from "store/gameStore";
import { socket } from "utils/webSocket";

interface GameSettingPanelProps {}

const GameSettingPanel: React.FC<GameSettingPanelProps> = () => {
	const router = useRouter();
	const { rounds, setRounds, roomId, playlist } = useGameStore();
	const [gameRound, setGameRound] = useState(rounds);

	const handleRoundChange = (value: number | number[]) => {
		if (Array.isArray(value)) setGameRound(value[0]);
		else setGameRound(value);
	};

	const startGame = () => {
		setRounds(gameRound);
		router.push("/game");
		socket.emit("startGame", roomId);
	};

	return (
		<div className="flex flex-col h-full gap-5 pt-9">
			<h2 className="text-xl font-semibold">Settings</h2>
			<div>
				<h2 className="text-lg font-medium">
					No. Of Rounds ({gameRound})
				</h2>
				<div className="pt-2 mx-1">
					<Slider
						handleStyle={{
							background: "white",
						}}
						dotStyle={{
							borderColor: "#abaeb4",
							background: "#abaeb4",
						}}
						activeDotStyle={{
							borderColor: "#c5c9cd",
							background: "#c5c9cd",
						}}
						railStyle={{
							background: "rgb(100 116 139)",
						}}
						min={5}
						max={25}
						defaultValue={10}
						marks={{ 5: 5, 10: 10, 15: 15, 20: 20, 25: 25 }}
						step={null}
						onChange={handleRoundChange}
					/>
				</div>
			</div>
			<div className="mt-auto mb-10 justify-self-end">
				<Button
					onClick={startGame}
					className={`w-full ${
						(!playlist || roomId === undefined) &&
						"bg-slate-400 hover:bg-slate-400"
					}`}
					disabled={false}
				>
					Start Game
				</Button>
			</div>
		</div>
	);
};

export default GameSettingPanel;
