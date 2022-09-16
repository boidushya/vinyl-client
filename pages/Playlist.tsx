import Image from "next/image";
import React from "react";

interface PlaylistProps {
	id: string;
	playlistName: string;
	playlistCover: string;
}

// TODO
// - setPlaylist on click

const Playlist: React.FC<PlaylistProps> = ({
	id,
	playlistName,
	playlistCover,
}) => {
	return (
		<div className="flex gap-4 justify-center items-center">
			<span>
				<Image src={playlistCover} alt="" width={100} height={100} />
			</span>

			<div className="p-4">{playlistName}</div>
		</div>
	);
};

export default Playlist;
