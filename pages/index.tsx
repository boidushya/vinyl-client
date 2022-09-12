import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<div className="min-h-screen grid place-items-center">
			<Head>
				<title>Vinyl - Hangman for audiophiles</title>
				<meta
					name="description"
					content="Vinyl - Hangman for audiophiles"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="h-full w-full grid place-items-center bg-hero p-8">
				<div className="space-y-8 grid place-items-center">
					<h1 className="relative text-[#FF3AF3] text-9xl text-stroke font-heading select-none ">
						Vinyl
						<span className="text-[#F7D146] text-stroke absolute -left-2 -top-1">
							Vinyl
						</span>
						<span className="text-white text-stroke absolute -left-4 -top-2">
							Vinyl
						</span>
					</h1>
					<p className="text-purple-200">Guess the song ✨</p>
					<div className="grid place-items-center gap-4">
						<div className="relative">
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
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
								type="text"
								className="w-64 bg-slate-900 outline-none text-purple-100 text-sm rounded-lg block p-2.5 px-10 focus:ring-violet-300 focus:ring-opacity-40 ring-0 focus:ring-2"
								placeholder="Enter Game Code"
							/>
							<button className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-indigo-700 rounded-r-lg hover:bg-indigo-600 focus:bg-indigo-800">
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
								<span className="text-white text-stroke absolute -left-1 -top-1">
									or
								</span>
							</h1>
							<span className="w-12 h-0.5 bg-white opacity-10 rounded-full" />
						</div>
						<button className="py-2.5 px-5  flex items-center font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:bg-indigo-700">
							Create new game
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
