import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ScaleLoader } from "react-spinners";
import Playlist from "components/Playlist/Playlist";
import Button from "components/Button/Button";
import useModal from "store/modalStore";
import useSpotifyStore, {
	getAccessTokenFromRedirectUrl,
	spotifyAuthorize,
} from "store/spotifyAuthStore";
import { socket } from "utils/webSocket";
import { nanoid } from "nanoid";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";
import useGameStore from "store/gameStore";

interface PlaylistSelectorPanelProps {}

const PlaylistSelectorPanel: React.FC<PlaylistSelectorPanelProps> = ({}) => {
	const { asPath } = useRouter();
	const {
		getPlaylists,
		setAccessToken,
		isConnected,
		playlists,
		loading,
		setLoading,
		setConnected,
	} = useSpotifyStore();
	const setRoomId = useGameStore(state => state.setRoomId);
	const { showModal } = useModal();

	useEffect(() => {
		const params = asPath.split("#")[1];
		if (params) {
			setLoading(true);
			const accessToken = getAccessTokenFromRedirectUrl(params);
			setAccessToken(accessToken);
			getPlaylists();
			setLoading(false);
			setConnected(true);
		}
	}, [asPath, getPlaylists, setAccessToken, setConnected, setLoading]);

	const connectSpotify = () => {
		showModal(
			<div className="flex flex-col gap-6">
				<h5 className="font-medium">Enjoy your playlists</h5>
				<p className="text-base leading-relaxed">
					With less than a month to go before the European Union
					enacts new consumer privacy laws for its citizens, companies
					around the world are updating their terms of service
					agreements to comply.
				</p>

				<Button
					onClick={() => {
						spotifyAuthorize();
					}}
					className="w-full py-2 ml-auto text-sm justify-self-end"
				>
					Login with Spotify
				</Button>
			</div>
		);
	};

	const createNewRoom = () => {
		// create room
		const config: Config = {
			dictionaries: [names],
		};

		const characterName: string = uniqueNamesGenerator(config);

		const roomId = nanoid(6);
		socket.emit("joinRoom", {
			username: characterName,
			room: roomId,
		});

		setRoomId(roomId);
	};

	return (
		<div className="flex flex-col h-full gap-5 pt-9">
			<h2 className="pb-4 text-xl font-semibold">Playlist</h2>
			{loading ? (
				<div className="h-full flex justify-center items-center w-full">
					<ScaleLoader color="#ffffff" loading={loading} />
				</div>
			) : (
				<div className="h-full overflow-y-scroll overflow-x-hidden pr-4">
					<div className="grid grid-cols-3 gap-4">
						{playlists.map(playlist => (
							<Playlist playlist={playlist} key={playlist.id} />
						))}
					</div>
				</div>
			)}

			{/* <div>
				<pre>{JSON.stringify(accessToken, null, 2)}</pre>
			</div> */}
			{!isConnected ? (
				<div className="flex flex-col gap-4 mt-auto mb-10 text-center justify-self-end">
					<p>Play with your custom playlist</p>

					<Button onClick={connectSpotify} className="w-full">
						Connect with Spotify
					</Button>
				</div>
			) : (
				<Button onClick={createNewRoom} className="w-full">
					Create Room ID
				</Button>
			)}
		</div>
	);
};

export default PlaylistSelectorPanel;
