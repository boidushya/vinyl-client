import React from "react";
import "styles/globals.scss";
import type { AppProps } from "next/app";
import { AlertProvider } from "store/alertStore";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AlertProvider>
			<Component {...pageProps} />
		</AlertProvider>
	);
}

export default MyApp;
