import create from "zustand";
import generateName from "utils/generateName";
import socketIOClient from "socket.io-client";

type User = {
	id: undefined | string;
	username: string;
	updateUsername: (name: string) => void;
};

const useUserStore = create<User>(set => ({
	id: undefined,
	username: "mavn",
	updateUsername: (username: string) =>
		set((state: User) => ({ ...state, username: username })),
}));

const socket=socketIOClient("http://localhost:5000")
export const useSocketInstanceStore=create(set=>({
	socket:socket	,
	
}))

export default useUserStore;
