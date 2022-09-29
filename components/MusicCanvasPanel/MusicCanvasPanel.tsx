/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import ReactHowler from "react-howler";
import { MdVolumeUp, MdVolumeOff, MdPlayArrow } from "react-icons/md";

interface MusicCanvasPanelProps {}

const MusicCanvasPanel: React.FC<MusicCanvasPanelProps> = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);

	let icon;
	if (!isPlaying) {
		icon = <MdPlayArrow />;
	} else {
		if (isMuted) icon = <MdVolumeOff />;
		else icon = <MdVolumeUp />;
	}

	const ALBUM_ART =
		"https://i.scdn.co/image/ab67616d0000b273c79b600289a80aaef74d155d";
	const MUSIC_URL =
		"https://listen.rezo.live/preview/886/e3a103cb56c3fda02b23d528f3eacde1_96_p.mp4";

	const NAME = "bla__ _____";

	return (
		<div className="bg-[#27273E] rounded-xl flex items-center justify-center flex-col gap-9 py-9 h-full overflow-hidden">
			<ReactHowler src={MUSIC_URL} playing={isPlaying} mute={isMuted} />
			<img
				src={ALBUM_ART}
				alt=""
				width={100}
				height={100}
				className="blur-xl w-72 h-72"
			/>
			<p className="font-bold text-2xl mt-8">{NAME}</p>

			<button
				className="p-4 rounded-full bg-[#4d4d79]"
				onClick={() => {
					if (!isPlaying) setIsPlaying(true);
					else setIsMuted(!isMuted);
				}}
			>
				{icon}
			</button>
		</div>
	);
};

export default MusicCanvasPanel;
