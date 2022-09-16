import React from "react";
import Playlist from "components/Playlist/Playlist";

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

export const PlaylistSelectorPanel: React.FC<
	PlaylistSelectorPanelProps
> = ({}) => {
	return (
		<div className="p-6 flex flex-col gap-5">
			<h2 className="text-xl font-semibold">Playlist</h2>
			<div className="flex gap-4 flex-col">
				{playlists.map(playlist => (
					<Playlist
						id={playlist.id}
						key={playlist.id}
						playlistCover={playlist.playlistCover}
						playlistName={playlist.playlistName}
					/>
				))}
				{/* {JSON.stringify(playlists)} */}
			</div>
		</div>
	);
};
