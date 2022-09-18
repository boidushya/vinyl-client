import React from "react";
import Head from "next/head";
import Podium from "components/Podium/Podium";

const data = [
	{
		id: "1tfjiELNrwYAJeafRYlT9RwOIiB",
		name: "mavn",
		rank: 1,
		score: 490,
	},
	{
		id: "1tfjiFoinFrbdLWlPI52dRLhNlB",
		name: "zysus",
		rank: 2,
		score: 300,
	},
	{
		id: "1tfjiDIAS8f2UYgV9ynCqWi7rZu",
		name: "player3",
		rank: 3,
		score: 200,
	},
];

const Results = () => {
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
			<main className="container relative mx-auto p-8">
				<h2
					className="text-4xl font-bold text-center w-full p-9"
					style={{
						fontFamily: "syne",
					}}
				>
					Winners
				</h2>
				<Podium players={data} />
			</main>
		</>
	);
};

export default Results;
