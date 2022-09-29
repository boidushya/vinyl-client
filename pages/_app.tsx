import React, { useEffect } from "react";
import "styles/globals.scss";
import "styles/celebrate.scss";
import type { AppProps } from "next/app";
import { AlertProvider } from "store/alertStore";
import { ModalProvider } from "store/modalStore";
import { useSocketInstanceStore } from "store/userStore";
import socketIOClient from "socket.io-client";

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
