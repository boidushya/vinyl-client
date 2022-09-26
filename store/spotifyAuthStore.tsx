import Router, { useRouter } from "next/router";
import create from "zustand";

const CLIENT_ID = "61ffd01eb83d470da2b2289dc34d6871";
const REDIRECT_URL = "http://localhost:3000/join";
const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com/authorize";
const SCOPE_DELIMITER = "%20";
const SCOPES = ["playlist-read-private", "playlist-read-collaborative"];
const SCOPES_URL_PARAMS = SCOPES.join(SCOPE_DELIMITER);

export const spotifyAuthorize = () => {
	const redirectUrl = `${SPOTIFY_AUTH_BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`;

	Router.push(redirectUrl);
};

export const getAccessTokenFromRedirectUrl = (url: string) => {
	// split between access_token, expires_on, token_type
	const params = url.split("&");

	// take the access_token and split by = and take the token value
	const accessToken = params[0].split("=")[1];
	return accessToken;
};

export const getPlaylists = () => {};

type Spotify = {
	accessToken: undefined | string;
	// getPlaylists: async () => {},
	setAccessToken: (accessToken: string) => void;
};

const useSpotifyStore = create<Spotify>(set => ({
	accessToken: undefined,
	setAccessToken: (accessToken: string) =>
		set((state: Spotify) => ({ ...state, accessToken: accessToken })),
}));

export default useSpotifyStore;
