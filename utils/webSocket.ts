import { io } from 'socket.io-client';
import { nanoid } from "nanoid";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

const SOCKET_BASE_URL = "http://localhost:5000";

export function createNewSocketRoom() {
	const config: Config = {
		dictionaries: [names],
	};

	const characterName: string = uniqueNamesGenerator(config);

	const roomId = nanoid(6);
	socket.emit("joinRoom", {
		username: characterName,
		room: roomId,
	});

	return roomId;
}

export const socket = io(SOCKET_BASE_URL);