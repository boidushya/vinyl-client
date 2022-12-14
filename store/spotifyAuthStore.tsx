import Router, { useRouter } from "next/router";
import create from "zustand";
import axios from "axios";
import { Playlist } from "types/Playlist";

const CLIENT_ID = "61ffd01eb83d470da2b2289dc34d6871";
const REDIRECT_URL = "https://vinyl-client.vercel.app/join";
const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com/authorize";
const SCOPE_DELIMITER = "%20";
const SCOPES = ["playlist-read-private", "playlist-read-collaborative"];
const SCOPES_URL_PARAMS = SCOPES.join(SCOPE_DELIMITER);

export const spotifyAuthorize = () => {
	const redirectUrl = `${SPOTIFY_AUTH_BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=false`;

	Router.push(redirectUrl);
};

export const getAccessTokenFromRedirectUrl = (url: string) => {
	// split between access_token, expires_on, token_type
	const params = url.split("&");

	// take the access_token and split by = and take the token value
	const accessToken = params[0].split("=")[1];

	return accessToken;
};

type Spotify = {
	isConnected: boolean;
	loading: boolean;
	accessToken: undefined | string;
	playlists: Playlist[];
	setLoading: (loading: boolean) => void;
	setConnected: (isConnected: boolean) => void;
	getPlaylists: () => void;
	setAccessToken: (accessToken: string) => void;
};

const useSpotifyStore = create<Spotify>((set, get) => ({
	isConnected: false,
	accessToken: undefined,
	playlists: [],
	loading: false,
	setConnected: (isConnected: boolean) =>
		set((state: Spotify) => ({ ...state, isConnected: isConnected })),
	setLoading: (loading: boolean) =>
		set((state: Spotify) => ({ ...state, loading: loading })),
	getPlaylists: async () => {
		try {
			const response = await axios.get(
				"https://api.spotify.com/v1/me/playlists",
				{
					headers: { Authorization: `Bearer ${get().accessToken}` },
				}
			);
			const data = response.data;

			const playlists: Playlist[] = data.items.map((item: any) => ({
				id: item.id,
				imageUrl:
					item.images.length > 0
						? item.images[0].url
						: "https://seed-mix-image.spotifycdn.com/v6/img/artist/3bWIy9AUrQdiNeS62Bp3OP/en/large",
				name: item.name,
				href: item.tracks.href,
			}));

			set({ playlists: playlists });
		} catch (error) {
			console.error(error, "Couldn't fetch playlists");
		}
	},
	setAccessToken: (accessToken: string) => {
		set((state: Spotify) => ({ ...state, accessToken: accessToken }));
	},
}));

export default useSpotifyStore;
