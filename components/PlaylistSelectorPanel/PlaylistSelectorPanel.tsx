import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ScaleLoader } from "react-spinners";
import Playlist from "components/Playlist/Playlist";
import Button from "components/Button/Button";
import useSpotifyStore, {
	getAccessTokenFromRedirectUrl,
	spotifyAuthorize,
} from "store/spotifyAuthStore";

interface PlaylistSelectorPanelProps {}

const PlaylistSelectorPanel: React.FC<PlaylistSelectorPanelProps> = ({}) => {
	const { asPath } = useRouter();
	const {
		getPlaylists,
		setAccessToken,
		isConnected,
		playlists,
		loading,
		setLoading,
		setConnected,
	} = useSpotifyStore();

	useEffect(() => {
		const params = asPath.split("#")[1];
		if (params) {
			setLoading(true);
			const accessToken = getAccessTokenFromRedirectUrl(params);
			setAccessToken(accessToken);
			getPlaylists();
			setLoading(false);
			setConnected(true);
		}
	}, [asPath, getPlaylists, setAccessToken, setConnected, setLoading]);

	return (
		<div className="flex flex-col h-full gap-5 pt-9">
			<h2 className="pb-4 text-xl font-semibold">Playlist</h2>
			{loading ? (
				<div className="h-full flex justify-center items-center w-full">
					<ScaleLoader color="#ffffff" loading={loading} />
				</div>
			) : (
				<div className="h-full overflow-y-scroll overflow-x-hidden pr-4">
					<div className="grid grid-cols-3 gap-4">
						{playlists.map(playlist => (
							<Playlist playlist={playlist} key={playlist.id} />
						))}
					</div>
				</div>
			)}

			{!isConnected && (
				<div className="flex flex-col gap-4 mt-auto mb-10 text-center justify-self-end">
					<p>Play with your playlist</p>

					<Button
						onClick={() => {
							spotifyAuthorize();
						}}
						className="w-full"
					>
						Connect with Spotify
					</Button>
				</div>
			)}
		</div>
	);
};

export default PlaylistSelectorPanel;
