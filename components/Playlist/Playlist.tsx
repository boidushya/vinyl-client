import React from "react";
import Image from "next/image";

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
		<div className="flex gap-2 items-center bg-[#27273E] overflow-hidden rounded-lg h-24 hover:bg-[#333351]">
			<div className="pt-2">
				<Image src={playlistCover} alt="" width={96} height={96} />
			</div>

			<div className="px-4 ">{playlistName}</div>
		</div>
	);
};

export default Playlist;
