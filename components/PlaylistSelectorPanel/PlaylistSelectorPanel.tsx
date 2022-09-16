import React from "react";
import Playlist from "components/Playlist/Playlist";
import Button from "components/Button/Button";

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
	const startGame = () => {};
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