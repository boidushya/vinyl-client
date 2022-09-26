import React from "react";
import Image from "next/image";

interface PlaylistProps {
	id: string;
	name: string;
	imageUrl: string;
}

// TODO
// - setPlaylist on click

const Playlist: React.FC<PlaylistProps> = ({ id, name, imageUrl }) => {
	return (
		<div className="flex gap-4 flex-col items-center overflow-hidden rounded-lg">
			<div className="pt-2 h-24 w-24 rounded-sm overflow-hidden">
				<Image src={imageUrl} alt="" width={96} height={96} />
			</div>

			<div className="px-4 text-sm text-center">{name}</div>
		</div>
	);
};

export default Playlist;
