import React, { useState } from "react";
import Image from "next/image";
import useGameStore from "store/gameStore";
import { Playlist } from "types/Playlist";

interface PlaylistProps {
	playlist: Playlist;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist }) => {
	const { setPlaylist, playlist: gamePlaylist } = useGameStore();
	const isSelected = gamePlaylist?.id == playlist.id;

	return (
		<div
			className={`flex gap-3 flex-col items-center overflow-hidden rounded-lg cursor-pointer ${
				isSelected && "bg-[#343459] border-[#4d4d79] border-4"
			}`}
			onClick={() => {
				setPlaylist(playlist);
			}}
		>
			<div className={`h-24 w-24 overflow-hidden rounded-t-md `}>
				<Image src={playlist.imageUrl} alt="" width={96} height={96} />
			</div>

			<div className={`px-2 pb-3 text-sm text-center rounded-b-md `}>
				{playlist.name}
			</div>
		</div>
	);
};

export default Playlist;
