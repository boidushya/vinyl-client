import React from "react";
import Playlist from "components/Playlist/Playlist";
import Button from "components/Button/Button";
import useModal from "store/modalStore";

interface PlaylistSelectorPanelProps {}

const playlists = [
	{
		id: "fadf",
		playlistName: "Playlist one",
		playlistCover: "https://picsum.photos/200",
	},
	{
		id: "fssa",
		playlistName: "Playlist two",
		playlistCover: "https://picsum.photos/200",
	},
];

const PlaylistSelectorPanel: React.FC<PlaylistSelectorPanelProps> = ({}) => {
	const startGame = () => {
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
					onClick={() => {}}
					className="w-full py-2 justify-self-end ml-auto text-sm"
				>
					Login with Spotify
				</Button>
			</div>
		);
	};

	const { showModal } = useModal();

	return (
		<div className="flex flex-col gap-5 pt-9 h-full">
			<h2 className="text-xl font-semibold pb-4">Playlist</h2>
			<div className="flex gap-4 flex-col">
				{playlists.map(playlist => (
					<Playlist
						id={playlist.id}
						key={playlist.id}
						playlistCover={playlist.playlistCover}
						playlistName={playlist.playlistName}
					/>
				))}
			</div>
			<div className="justify-self-end mt-auto flex flex-col gap-4 text-center1">
				<p>Play with your custom playlist</p>
				<Button onClick={startGame} className="w-full">
					Connect with Spotify
				</Button>
			</div>
		</div>
	);
};

export default PlaylistSelectorPanel;