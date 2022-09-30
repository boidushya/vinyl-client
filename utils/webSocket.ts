import { io } from 'socket.io-client';
import { nanoid } from "nanoid";
import {
	uniqueNamesGenerator,
	Config,
	adjectives,
	animals,
} from "unique-names-generator";

const SOCKET_BASE_URL = "http://localhost:5000";

export function createNewSocketRoom(track_ids: any) {
	const config: Config = {
		dictionaries: [adjectives, animals],
		separator: "-",
	};

	const username: string = uniqueNamesGenerator(config);

	const room_id = nanoid(6);

	socket.emit("joinRoom", {
		username,
		room_id,
		type: "admin",
		track_ids,
	});

	return {
		name: username,
		roomId: room_id,
	};
}

export function joinSocketRoom(roomId: string) {
	const config: Config = {
		dictionaries: [adjectives, animals],
	};

	const characterName: string = uniqueNamesGenerator(config);
	console.log("in join");
	socket.emit("joinRoom", {
		username: characterName,
		room_id: roomId,
	});

	socket.on("roomUsers", (data: any) => {
		console.log(data);
	});

	return {
		name: characterName,
		roomId: roomId,
	};
};
export const socket = io(SOCKET_BASE_URL);