import create from "zustand";
import { Playlist } from "types/Playlist";
import { Song, Track } from "types/Track";
import axios from "axios";
import useSpotifyStore from "./spotifyAuthStore";
import { Player } from "types/Player";

type Game = {
	roomId: string | undefined;
	rounds: number;
	playlist: Playlist | undefined;
	tracks: Track[];
	currentTrack: Song | undefined;
	questionId: string | undefined;
	winners: Player[] | undefined;
	myName: string | undefined;
	setMyName: (name: string) => void;
	setWinners: (winners: Player[]) => void;
	setQuestionId: (questionId: string) => void;
	setCurrentTrack: (currentTrack: Song) => void;
	setRounds: (round: number) => void;
	setPlaylist: (playlist: Playlist) => void;
	setTracks: (tracks: Track[]) => void;
	setRoomId: (roomId: string) => void;
};

const useGameStore = create<Game>((set, get) => ({
	roomId: undefined,
	rounds: 10,
	playlist: undefined,
	currentTrack: undefined,
	tracks: [],
	questionId: undefined,
	myName: undefined,
	winners: [
		{
			name: "dummy_player_change_later_1",
			rank: 1,
			score: 490,
		},
		{
			name: "dummy_player_change_later_2",
			rank: 2,
			score: 300,
		},
		{
			name: "dummy_player_change_later_3",
			rank: 3,
			score: 200,
		},
	],
	setMyName: (name: string) => {
		set((state: Game) => ({ ...state, myName: name }));
	},
	setWinners: (winners: Player[]) => {
		set((state: Game) => ({ ...state, winners: winners }));
	},
	setQuestionId: (questionId: string) => {
		set((state: Game) => ({ ...state, questionId: questionId }));
	},
	setRounds: (round: number) => {
		set((state: Game) => ({ ...state, round: round }));
	},
	setPlaylist: (playlist: Playlist) => {
		set((state: Game) => ({ ...state, playlist: playlist }));
	},
	setTracks: (tracks: Track[]) => {
		set((state: Game) => ({ ...state, tracks: tracks }));
	},
	setRoomId: (roomId: string) => {
		set((state: Game) => ({ ...state, roomId: roomId }));
	},
	setCurrentTrack: (song: Song) => {
		set((state: Game) => ({ ...state, currentTrack: song }));
	},
}));

export default useGameStore;