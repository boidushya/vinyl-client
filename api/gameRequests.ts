import { socket } from "utils/webSocket";
import API from "./api";

export async function fetchQuestions(room_id: string) {
	try {
		const res = await API.post("/questions/fetch", {
			room_id,
		});

		return res.data;
	} catch (error) {
		console.error(error);
	}
}

export async function createQuestion(room_id: string, track_ids: string[]) {
	try {
		const res = await API.post("/questions/create", {
			room_id,
			track_ids,
		});

		return res.data;

		// socket.emit("tracksData", res.data);
	} catch (error) {
		console.error(error);
	}
}
