import React, { useState } from "react";
import Profile from "components/Profile/Profile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useAlert from "store/alertStore";
import useSpotifyStore from "store/spotifyAuthStore";
import useGameStore from "store/gameStore";
import Button from "components/Button/Button";
import { createNewSocketRoom, socket } from "utils/webSocket";
import axios from "axios";

interface PlayerGridPanelProps {}

const PlayerGridPanel: React.FC<PlayerGridPanelProps> = ({}) => {
	const { success, error } = useAlert();
	const { isConnected, accessToken } = useSpotifyStore();
	const { roomId, setRoomId, playlist, rounds, setMyName } = useGameStore();

	const [userNames, setUserNames] = useState<string[]>([]);

	socket.on("player-joined", (playerName: string) => {
		console.log("a new player joined ", playerName);
		setUserNames([...userNames, playerName]);
	});

	const createNewRoom = async () => {
		try {
			const tracksHref = playlist?.href;

			if (tracksHref) {
				const response = await axios.get(tracksHref!, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const data = response.data;

				let track_ids = data.items.map(
					(item: { track: { id: string } }) => {
						return item.track.id;
					}
				);

				// just send selected tracks
				track_ids = track_ids.slice(0, rounds);
				console.log(track_ids);

				const { roomId, name } = createNewSocketRoom(track_ids);
				setRoomId(roomId);
				setMyName(name);
			} else {
				error("Select a Playlist");
			}
		} catch (err) {
			console.log(err, "Could not create room");
		}
	};

	let CallToAction;

	if (!isConnected) CallToAction = <div></div>;
	else if (roomId === undefined)
		CallToAction = (
			<>
				<h3>Select the playlist and create game room.</h3>

				<Button onClick={createNewRoom} className="w-full mt-4">
					Create Room ID
				</Button>
			</>
		);
	else {
		CallToAction = (
			<>
				<h3>Share the Join Code with your friends and Play!</h3>

				<CopyToClipboard
					text={roomId}
					onCopy={() => {
						success("Join Code Copied to Clipboard");
					}}
				>
					<div
						data-tip
						data-for="copy-clipboard"
						className="block px-4 py-3 text-align bg-[#4d4d79] hover:bg-[#414165] focus:bg-[#343459] w-full rounded-md mt-4 font-bold text-lg"
					>
						<span>{roomId}</span>
					</div>
				</CopyToClipboard>
			</>
		);
	}

	return (
		<div className="bg-[#27273E] rounded-xl flex items-center flex-col gap-9 p-9 h-full">
			<h2 className="text-xl font-semibold">Players</h2>
			{userNames.length === 0 && (
				<p>🎵 Connect to spotify to choose the track 🎵</p>
			)}
			<div className="grid grid-cols-4 gap-9">
				{userNames.map(username => (
					<Profile username={username} key={username} />
				))}
			</div>
			<div className="w-full mt-auto mb-1 text-center px-9 justify-self-end">
				{CallToAction}
			</div>
		</div>
	);
};

export default PlayerGridPanel;