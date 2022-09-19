import create from "zustand";
import { Playlist } from "types/Playlist";
import { Track } from "types/Track";
import axios from "axios";
import useSpotifyStore from "./spotifyAuthStore";

type Game = {
	roomId: string | undefined;
	rounds: number;
	playlist: Playlist | undefined;
	tracks: Track[];
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
			const track_ids = data.items.map(
				(item: { track: { id: string } }) => {
					return item.track.id;
				}
			);
			console.log({
				roomId,
				rounds,
				track_ids,
			});
		} catch (error) {
			//errpr
		}
	},
}));

export default useGameStore;
