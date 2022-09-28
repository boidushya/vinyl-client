import axios from "axios";

export const HOST = "https://api.vinyl.rezo.live";

export const BASE_URL = `${HOST}/`;

const API = axios.create({ baseURL: BASE_URL });

export default API;

/**
 * /questions/create
 *
 * {
 * 		track_ids: []
 * 		room_id:
 * }
 *
 * /questions/fetch
 *
 * {
 * 		room_id
 * }
 */
