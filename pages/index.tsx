import React, { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import {
	uniqueNamesGenerator,
	Config,
	adjectives,
	animals,
} from "unique-names-generator";
import useSound from "use-sound";

import socketIOClient from "socket.io-client";
import Link from "next/link";

import { socket } from "utils/webSocket";
import useGameStore from "store/gameStore";

const SONG_URL = [
	{
		name: "Welcome To New York",
		image: "https://i.scdn.co/image/ab67616d0000b273c79b600289a80aaef74d155d",
		url: "/886/18558d9295def6bed481f35be0cc4a25_96_p.mp4",
	},
	{
		name: "Blank Space",
		image: "https://i.scdn.co/image/ab67616d0000b273c79b600289a80aaef74d155d",
		url: "/886/e3a103cb56c3fda02b23d528f3eacde1_96_p.mp4",
	},
	{
		name: "Style",
		image: "https://i.scdn.co/image/ab67616d0000b273c79b600289a80aaef74d155d",
		url: "/886/7b2cc3871825b7ce835fd26a35c8b71c_96_p.mp4",
	},
	{
		name: "Out Of The Woods",
		image: "https://i.scdn.co/image/ab67616d0000b273c79b600289a80aaef74d155d",
		url: "/886/439619854c16f1aa9d436cdc0da07566_96_p.mp4",
	},
];

const SELECTED_SONG = SONG_URL[Math.floor(Math.random() * SONG_URL.length)];

const Home: NextPage = () => {
	const [selectedSong, setSelectedSong] = useState(SELECTED_SONG);
	const [songIsLoading, setSongIsLoading] = useState(true);
	const songName = selectedSong.name;
	const { setRoomId } = useGameStore();
	const [isMuted, setIsMuted] = useState(true);
	const [isTyping, setIsTyping] = useState(false);
	const [roomVal, setRoomVal] = useState("");

	const router = useRouter();

	const [play, { sound }] = useSound(
		`${process.env.NEXT_PUBLIC_REZONANCE_URL}${selectedSong.url}`,
		{
			volume: 0.5,
			onload: () => {
				setSongIsLoading(false);
			},
		}
	);

	useEffect(() => {
		if (sound) {
			isMuted ? sound.pause() : play();
			sound.loop(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMuted]);

	const keyboardMap: { key: string; action: () => void }[] = [
		{
			key: " ",
			action: () => {
				setIsMuted(isMuted ? false : true);
			},
		},
	];

	const keyboardEvents = (e: KeyboardEvent) => {
		keyboardMap.forEach(
			item =>
				e.key.toLocaleLowerCase() === item.key.toLocaleLowerCase() &&
				!isTyping &&
				item.action()
		);
	};

	useEffect(() => {
		window.addEventListener("keydown", keyboardEvents);
		return () => window.removeEventListener("keydown", keyboardEvents);
	});

	//const socket = socketIOClient("http://localhost:5000");

	//const socket=useSocketInstanceStore((state:any)=>state.socket)

	const config: Config = {
		dictionaries: [adjectives, animals],
	};

	const characterName: string = uniqueNamesGenerator(config);

	const joinRoom = (e: any) => {
		e.preventDefault();
		console.log("in join");
		socket.emit("joinRoom", {
			username: characterName,
			room: roomVal,
		});

		// socket.on("message",(data:any) => {
		// 	console.log(data,"Data from message event");
		// })

		socket.on("roomUsers", (data: any) => {
			console.log(data);
		});

		router.push("/game");
	};

	const createNewRoom = (e: any) => {
		e.preventDefault();
		// console.log(nanoid(6), characterName);

		// const roomId = nanoid(6);
		// socket.emit("joinRoom", {
		// 	username: characterName,
		// 	room: roomId,
		// });

		// setRoomId(roomId);
		router.push("/join");
	};

	return (
		<div className="relative grid min-h-screen place-items-center">
			<Head>
				<title>Vinyl - Hangman for audiophiles</title>
				<meta
					name="description"
					content="Vinyl - Hangman for audiophiles"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main
				className={`grid w-full h-full p-8 place-items-center bg-hero ${
					!isMuted ? `bg-hero__playing` : ``
				}`}
			>
				<div className="grid space-y-12 place-items-center">
					<h1 className="relative text-[#FF3AF3] text-9xl text-stroke font-heading select-none ">
						Vinyl
						<span className="text-[#F7D146] text-stroke absolute -left-2 -top-1">
							Vinyl
						</span>
						<span className="absolute text-white text-stroke -left-4 -top-2">
							Vinyl
						</span>
					</h1>
					{/* <p className="text-purple-200">Guess the song ✨</p> */}
					<div className="grid gap-4 place-items-center">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 text-violet-300"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
									/>
								</svg>
							</div>
							<input
								onChange={e => setRoomVal(e.target.value)}
								onFocus={() => setIsTyping(true)}
								onBlur={() => setIsTyping(false)}
								value={roomVal}
								type="text"
								autoComplete="off"
								autoCorrect="off"
								className="w-64 bg-slate-900 outline-none text-purple-100 text-sm rounded-lg block p-2.5 pl-10 pr-16 focus:ring-violet-300 focus:ring-opacity-40 ring-0 focus:ring-2"
								placeholder="Enter Game Code"
							/>
							<button
								className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-indigo-700 rounded-r-lg hover:bg-indigo-600 focus:bg-indigo-800"
								onClick={e => joinRoom(e)}
							>
								Join
							</button>
						</div>
						<div className="flex items-center justify-center gap-4">
							<span className="w-12 h-0.5 bg-white opacity-10 rounded-full" />
							<h1 className="translate-x-0.5 relative text-[#FF3AF3] text-xl text-stroke font-heading select-none">
								or
								<span className="text-[#F7D146] text-stroke absolute -left-0.5 -top-0.5">
									or
								</span>
								<span className="absolute text-white text-stroke -left-1 -top-1">
									or
								</span>
							</h1>
							<span className="w-12 h-0.5 bg-white opacity-10 rounded-full" />
						</div>
						{/* <Link href="/join"> */}
						<button
							className="relative py-2.5 px-5  flex items-center font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:bg-indigo-700"
							onClick={e => createNewRoom(e)}
						>
							Create new game
						</button>
						{/* </Link> */}
					</div>
				</div>
			</main>
			<div className="absolute bottom-0 right-0 px-8 py-4 text-sm text-opacity-50 select-none text-violet-200">
				{isMuted ? `Press [SPACE]` : `Now Playing`}:{" "}
				<span
					suppressHydrationWarning
					className="cursor-pointer hover:underline"
				>
					{songName}
				</span>
				{songIsLoading ? (
					// <svg
					// 	xmlns="http://www.w3.org/2000/svg"
					// 	fill="none"
					// 	viewBox="0 0 24 24"
					// 	strokeWidth={1.5}
					// 	stroke="currentColor"
					// 	className="inline w-5 h-5 ml-1 align-middle cursor-wait"
					// >
					// 	<path
					// 		strokeLinecap="round"
					// 		strokeLinejoin="round"
					// 		d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
					// 	/>
					// </svg>
					<>
						<svg
							version="1.1"
							id="L9"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							fill="currentColor"
							viewBox="20 20 60 60"
							enable-background="new 0 0 0 0"
							xmlSpace="preserve"
							className="inline w-5 h-5 ml-1 align-middle cursor-wait"
						>
							<path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
								<animateTransform
									attributeName="transform"
									attributeType="XML"
									type="rotate"
									dur="1s"
									from="0 50 50"
									to="360 50 50"
									repeatCount="indefinite"
								/>
							</path>
						</svg>
					</>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						onClick={() => {
							setIsMuted(!isMuted);
						}}
						className="inline w-5 h-5 ml-1 align-middle cursor-pointer"
					>
						{isMuted ? (
							<>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
								/>
							</>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						)}
					</svg>
				)}
			</div>
		</div>
	);
};

export default Home;
