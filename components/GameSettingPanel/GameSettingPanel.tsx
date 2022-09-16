import React from "react";
import Profile from "components/Profile/Profile";
import Button from "components/Button/Button";

interface GameSettingPanelProps {}

const username = "admin";

const GameSettingPanel: React.FC<GameSettingPanelProps> = () => {
	const startGame = () => {};
	return (
		<div className="flex flex-col gap-5 pt-9 h-full">
			<h2 className="text-xl font-semibold">Settings</h2>
			<div className="flex justify-center items-center p-4">
				<Profile username={username} isEditable />
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
