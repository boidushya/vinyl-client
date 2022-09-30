/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import ReactHowler from "react-howler";
import { ColorExtractor } from "react-color-extractor";
import { MdVolumeUp, MdVolumeOff, MdPlayArrow } from "react-icons/md";
import { socket } from "utils/webSocket";

interface MusicCanvasPanelProps {}
interface tracks{
	name:string
	url:string
	image:string
	question_id:string
}

const MusicCanvasPanel: React.FC<MusicCanvasPanelProps> = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [counter,setCounter] = useState(null);
	const [colors, setColors] = useState<String[]>([]);
	const [tracks,setTracks] = useState<tracks>();
	const playButtonRef = useRef(null);
	const [albumURL,setAlbumURL]=useState(null);
	const[albumImageUrl,setAlbumImageUrl]=useState('')

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

	socket.on("tracksData",(data:any) => {
		setTracks(data);
		setAlbumURL(data.url)
		setAlbumImageUrl(data.image);
		console.log(data,"tracks data ");
	})

	socket.on("counter",(data:any) => {
		setCounter(data);
		console.log(data,"Counter");
	})

	socket.on("game-end",()=>{
		console.log('end game');
	})

	const ALBUM_ART =
		tracks?.image
	const MUSIC_URL =
		tracks?.url;

	const NAME = "_____ _____";

	return (
		albumURL &&
		<>
			<ColorExtractor src={albumImageUrl} getColors={getColors} />
			<div
				className={`rounded-xl flex items-center justify-center flex-col gap-9 py-9 h-full overflow-hidden`}
				style={{
					background: `linear-gradient(${colors[0]}, ${colors[2]})`,
				}}
			>
				<ReactHowler
					src={albumURL}
					playing={isPlaying}
					mute={isMuted}
				/>

				<img
					src={albumImageUrl}
					alt=""
					width={100}
					height={100}
					className="blur-none w-80 h-80 rounded-lg"
				/>

				<p className="font-bold text-3xl my-1 text-center tracking-wider">
					{counter}
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
}

export default MusicCanvasPanel;
