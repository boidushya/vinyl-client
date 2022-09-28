import create from "zustand";
import { Playlist } from "types/Playlist";
import { Track } from "types/Track";

type Game = {
	rounds: number;
	playlist: Playlist | undefined;
	tracks: Track[];
	setRounds: (round: number) => void;
	setPlaylist: (playlist: Playlist) => void;
	setTracks: (tracks: Track[]) => void;
	start: () => void;
};

const initialize = () => {};

const useGameStore = create<Game>((set, get) => ({
	rounds: 10,
	playlist: undefined,
	tracks: [],
	setRounds: (round: number) => {
		set((state: Game) => ({ ...state, round: round }));
	},
	setPlaylist: (playlist: Playlist) => {
		set((state: Game) => ({ ...state, playlist: playlist }));
	},
	setTracks: (tracks: Track[]) => {
		set((state: Game) => ({ ...state, tracks: tracks }));
	},
	start: async () => {},
}));

export default useGameStore;
