/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import ReactHowler from "react-howler";
import { ColorExtractor } from "react-color-extractor";
import { MdVolumeUp, MdVolumeOff, MdPlayArrow } from "react-icons/md";

interface MusicCanvasPanelProps {}

const MusicCanvasPanel: React.FC<MusicCanvasPanelProps> = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [colors, setColors] = useState<String[]>([]);
	const playButtonRef = useRef(null);

	// useEffect(() => {
	// 	if (playButtonRef !== null && playButtonRef.current)
	// 		playButtonRef.current.click();
	// }, [playButtonRef]);

	let icon;
	if (!isPlaying) {
		icon = <MdPlayArrow size={24} />;
	} else {
		if (isMuted) icon = <MdVolumeOff size={24} />;
		else icon = <MdVolumeUp size={24} />;
	}

	const getColors = (imageColors: String[]) => {
		setColors(imageColors);
	};

	const playSong = () => {
		if (!isPlaying) setIsPlaying(true);
		else setIsMuted(!isMuted);
	};

	const ALBUM_ART =
		"https://i.scdn.co/image/ab67616d0000b273c79b600289a80aaef74d155d";
	const MUSIC_URL =
		"https://listen.rezo.live/preview/886/e3a103cb56c3fda02b23d528f3eacde1_96_p.mp4";

	const NAME = "_____ _____";

	return (
		<>
			<ColorExtractor src={ALBUM_ART} getColors={getColors} />
			<div
				className={`rounded-xl flex items-center justify-center flex-col gap-9 py-9 h-full overflow-hidden`}
				style={{
					background: `linear-gradient(${colors[0]}, ${colors[2]})`,
				}}
			>
				<ReactHowler
					src={MUSIC_URL}
					playing={isPlaying}
					mute={isMuted}
				/>

				<img
					src={ALBUM_ART}
					alt=""
					width={100}
					height={100}
					className="blur-none w-80 h-80 rounded-lg"
				/>

				<p className="font-bold text-3xl my-1 text-center tracking-wider">
					{NAME}
				</p>
				<button
					ref={playButtonRef}
					// onFocus={playSong}
					className={`p-4 rounded-full bg-[#ffffff50]`}
					onClick={() => {
						playSong();
					}}
				>
					{icon}
				</button>
			</div>
		</>
	);
};;;;;;;;;;;;;;

export default MusicCanvasPanel;
