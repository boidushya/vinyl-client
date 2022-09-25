import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { dropConfetti } from "components/Celebrate/Celebrate";
import socketIOClient from "socket.io-client";
import {nanoid} from "nanoid";
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const Home: NextPage = () => {
	const songName = "Jenny - Studio Killers";
	const [isMuted, setIsMuted] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [roomVal,setRoomVal] = useState("");

	const keyboardMap: { key: string; action: () => void }[] = [
		{
			key: "m",
			action: () => setIsMuted(isMuted ? false : true),
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

	const socket = socketIOClient("http://localhost:5000");

	const config: Config = {
		dictionaries: [names]
	}
	  
	const characterName: string = uniqueNamesGenerator(config); 
	
	console.log(characterName,"char");

	const joinRoom = (e:any) => {
		e.preventDefault();
		console.log("in join");
		socket.emit("joinRoom",{
			username:characterName,
			room:roomVal
		})	

		socket.on("message",(data) => {
			console.log(data,"Data from message event");
		})

		socket.on("roomUsers",(data) => {
			console.log(data);
		})
	}

	const createNewRoom = (e:any) => {
		e.preventDefault();5
		console.log(nanoid(6),characterName);

		socket.emit("joinRoom",{
			username:characterName,
			room:nanoid(6)
		})	

		socket.on("message",(data) => {
			console.log(data,"Data from message event");
		})
	}


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

			<main className="grid w-full h-full p-8 place-items-center bg-hero">
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
								onChange={(e) => setRoomVal(e.target.value)}
								onFocus={() => setIsTyping(true)}
								onBlur={() => setIsTyping(false)}
								value={roomVal}
								type="text"
								autoComplete="off"
								autoCorrect="off"
								className="w-64 bg-slate-900 outline-none text-purple-100 text-sm rounded-lg block p-2.5 pl-10 pr-16 focus:ring-violet-300 focus:ring-opacity-40 ring-0 focus:ring-2"
								placeholder="Enter Game Code"
							/>
							<button className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-indigo-700 rounded-r-lg hover:bg-indigo-600 focus:bg-indigo-800"
								onClick={(e) => joinRoom(e)}>
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
							<button className="relative py-2.5 px-5  flex items-center font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:bg-indigo-700"
							onClick={(e) => createNewRoom(e)}>
								Create new game
							</button>
						{/* </Link> */}
					</div>
				</div>
			</main>
			<div
				className="absolute bottom-0 right-0 px-8 py-4 text-sm text-opacity-50 select-none text-violet-200"
				onClick={() => dropConfetti()}
			>
				Now Playing:{" "}
				<span className="cursor-pointer hover:underline">
					{songName}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					onClick={() => setIsMuted(!isMuted)}
					className="inline w-4 h-4 ml-1 align-middle cursor-pointer"
				>
					{isMuted ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
						/>
					)}
				</svg>
			</div>
		</div>
	);
};

export default Home;
