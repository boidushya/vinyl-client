import React from "react";
import "styles/globals.scss";
import type { AppProps } from "next/app";
import { AlertProvider } from "store/alertStore";
import { ModalProvider } from "store/modalStore";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AlertProvider>
			<ModalProvider>
				<Component {...pageProps} />
			</ModalProvider>
		</AlertProvider>
	);
}

export default MyApp;
