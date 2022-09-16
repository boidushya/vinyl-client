import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Profile from "components/Profile/Profile";
import Button from "components/Button/Button";

interface GameSettingPanelProps {}

const username = "admin";

const GameSettingPanel: React.FC<GameSettingPanelProps> = () => {
	const [rounds, setRounds] = useState<number>(10);

	const handleRoundChange = (value: number | number[]) => {
		if (Array.isArray(value)) setRounds(value[0]);
		else setRounds(value);
	};

	const startGame = () => {};
	return (
		<div className="flex flex-col gap-5 pt-9 h-full">
			<h2 className="text-xl font-semibold">Settings</h2>
			<div className="flex justify-center items-center p-4">
				<Profile username={username} isEditable />
			</div>
			<div>
				<h2 className="text-lg font-medium">
					No. Of Rounds ({rounds})
				</h2>
				<div className="mx-1 pt-2">
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
			<div className="justify-self-end mt-auto">
				<Button onClick={startGame} className="w-full">
					Start Game
				</Button>
			</div>
		</div>
	);
};

export default GameSettingPanel;
