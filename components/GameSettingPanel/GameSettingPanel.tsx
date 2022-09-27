import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Profile from "components/Profile/Profile";
import Button from "components/Button/Button";
import useUserStore from "store/userStore";
import useGameStore from "store/gameStore";

interface GameSettingPanelProps {}

const GameSettingPanel: React.FC<GameSettingPanelProps> = () => {
	const handleRoundChange = (value: number | number[]) => {
		if (Array.isArray(value)) setRounds(value[0]);
		else setRounds(value);
	};

	const username = useUserStore(state => state.username);
	const { rounds, setRounds } = useGameStore();

	const startGame = () => {};

	return (
		<div className="flex flex-col h-full gap-5 pt-9">
			<h2 className="text-xl font-semibold">Settings</h2>
			<div className="flex items-center justify-center p-4">
				<Profile username={username} isEditable />
			</div>
			<div>
				<h2 className="text-lg font-medium">
					No. Of Rounds ({rounds})
				</h2>
				<div className="pt-2 mx-1">
					<Slider
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
				<Button onClick={startGame} className="w-full">
					Start Game
				</Button>
			</div>
		</div>
	);
};

export default GameSettingPanel;
