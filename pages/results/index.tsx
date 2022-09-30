import React, { useEffect } from "react";
import Head from "next/head";
import Podium from "components/Podium/Podium";
import { dropConfetti } from "components/Celebrate/Celebrate";
import useGameStore from "store/gameStore";

const Results = () => {
	const winners = useGameStore(state => state.winners);

	useEffect(() => {
		dropConfetti();
	}, []);

	return (
		<>
			<Head>
				<title>Winners | Vinyl - Hangman for audiophiles</title>
				<meta
					name="description"
					content="Vinyl - Hangman for audiophiles"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main
				className="bg-hero h-screen flex justify-center items-center"
				onClick={() => dropConfetti()}
			>
				<div className="container relative mx-auto p-9">
					<Podium players={winners!} />
					<h2
						className="text-4xl font-bold text-center w-full p-9"
						style={{
							fontFamily: "syne",
						}}
					>
						Winners
					</h2>
				</div>
			</main>
		</>
	);
};

export default Results;
