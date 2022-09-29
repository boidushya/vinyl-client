import React from "react";
import Profile from "components/Profile/Profile";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useAlert from "store/alertStore";
import useSpotifyStore from "store/spotifyAuthStore";
import useGameStore from "store/gameStore";
import Button from "components/Button/Button";
import { createNewSocketRoom } from "utils/webSocket";
import axios from "axios";

interface PlayerGridPanelProps {}

const PlayerGridPanel: React.FC<PlayerGridPanelProps> = ({}) => {
	const { success } = useAlert();
	const { isConnected } = useSpotifyStore();
	const { roomId, setRoomId,playlist,rounds } = useGameStore();
	const usernames = [
		"mavn",
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

	const createNewRoom = async () => {
		try {
			const tracksHref = playlist?.href;
			const response = await axios.get(tracksHref!, {
				headers: {
					Authorization: `Bearer ${
						useSpotifyStore.getState().accessToken
					}`,
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

				console.log(track_ids,"trackss");

				const roomId = createNewSocketRoom(track_ids);

				setRoomId(roomId);

			}	
		catch(err) {
			console.log(err);
		}
		
			
	};

	let CallToAction;

	if (!isConnected)
		CallToAction = <div>Connect to spotify to choose the track</div>;
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
				<h3>
					Select the playlist, Share the Join Code with your friends
					and Play!
				</h3>

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

	const admin = "mavn";

	return (
		<div className="bg-[#27273E] rounded-xl flex items-center flex-col gap-9 py-9 h-full">
			<h2 className="text-xl font-semibold">Players</h2>
			<div className="flex flex-wrap justify-center gap-9">
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
			<div className="w-full mt-auto mb-1 text-center px-9 justify-self-end">
				{CallToAction}
			</div>
		</div>
	);
};

export default PlayerGridPanel;
