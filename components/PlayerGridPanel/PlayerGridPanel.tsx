import React from "react";
import Profile from "components/Profile/Profile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useAlert from "store/alertStore";

interface PlayerGridPanelProps {}

const PlayerGridPanel: React.FC<PlayerGridPanelProps> = ({}) => {
	const { success } = useAlert();
	const usernames = [
		"admin",
		"Test",
		"hello",
		"this is name",
		// "kialde",
		// "loda",
		// "lassan",
		// "bakchod",
		// "react",
		// "angular",
		// "vue",
		// "lorem ipsum",
	];

	const admin = "admin";

	return (
		<div className="bg-[#27273E] rounded-xl flex items-center flex-col gap-9 py-9 h-full">
			<h2 className="text-xl font-semibold">Players</h2>
			<div className="grid grid-cols-4 gap-9 grow">
				{usernames.map(username => {
					if (username == admin) {
						return (
							<Profile
								username={username}
								key={username}
								isEditable
							/>
						);
					}
					return (
						<Profile
							username={username}
							key={username}
							isKickable
						/>
					);
				})}
			</div>
			<div className="w-full px-9 text-center justify-self-end mt-auto">
				<h3>Invite Friends</h3>
				<CopyToClipboard
					text="https://www.npmjs.com/"
					onCopy={() => {
						success("Copied to Clipboard");
					}}
				>
					<div
						data-tip
						data-for="copy-clipboard"
						className="block px-6 text-align py-4 bg-[#404065] hover:bg-[#383857] focus:bg-[#343459] w-full rounded-md mt-4 font-medium"
					>
						<span> https://www.npmjs.com/</span>
					</div>
				</CopyToClipboard>
			</div>
		</div>
	);
};

export default PlayerGridPanel;
