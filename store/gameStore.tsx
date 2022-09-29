import create from "zustand";
import { Playlist } from "types/Playlist";
import { Song, Track } from "types/Track";
import axios from "axios";
import useSpotifyStore from "./spotifyAuthStore";
import { createQuestion, fetchQuestions } from "api/gameRequests";

type Game = {
	roomId: string | undefined;
	rounds: number;
	playlist: Playlist | undefined;
	tracks: Track[];
	currentTrack: Song | undefined;
	setCurrentTrack: (currentTrack: Song) => void;
	setRounds: (round: number) => void;
	setPlaylist: (playlist: Playlist) => void;
	setTracks: (tracks: Track[]) => void;
	setRoomId: (roomId: string) => void;
	start: () => void;
};

const useGameStore = create<Game>((set, get) => ({
	roomId: undefined,
	rounds: 10,
	playlist: undefined,
	currentTrack: undefined,
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
	setRoomId: (roomId: string) => {
		set((state: Game) => ({ ...state, roomId: roomId }));
	},
	setCurrentTrack: (song: Song) => {
		set((state: Game) => ({ ...state, currentTrack: song }));
	},
	start: async () => {
		try {
			const tracksHref = get().playlist?.href;
			const response = await axios.get(tracksHref!, {
				headers: {
					Authorization: `Bearer ${
						useSpotifyStore.getState().accessToken
					}`,
				},
			});

			const roomId = get().roomId;
			const rounds = get().rounds;
			const data = response.data;
			let track_ids = data.items.map(
				(item: { track: { id: string } }) => {
					return item.track.id;
				}
			);

			// just send selected tracks

			track_ids = track_ids.slice(0, rounds);

			console.log({
				roomId,
				rounds,
				track_ids,
			});

			// TODO : understand create questions
			// TODO : just

			if (roomId) {
				const res = await createQuestion(roomId, track_ids);
				console.log(res.data,"Data from create questioons");
			} else {
				console.error("Room Id not defined");
			}
		} catch (error) {
			console.error(error);
		}
	},
	fetchQuestion: async () => {
		const roomId = get().roomId;

		// TODO : fetch question

		if (roomId) {
			const questions = await fetchQuestions(roomId);
			console.log(questions);
		} else {
			console.error("Room Id not defined");
		}
	},
}));

export default useGameStore;