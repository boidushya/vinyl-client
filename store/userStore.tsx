import create from "zustand";
import socketIOClient from "socket.io-client";

type User = {
	id: undefined | string;
	isAdmin: boolean;
	username: string;
	setAdmin: (isAdmin: boolean) => void;
	updateUsername: (name: string) => void;
};

const useUserStore = create<User>(set => ({
	id: undefined,
	username: "mavn",
	isAdmin: false,
	setAdmin: (isAdmin: boolean) => {
		set((state: User) => ({ ...state, isAdmin: isAdmin }));
	},
	updateUsername: (username: string) => {
		set((state: User) => ({ ...state, username: username }));
	},
}));

const socket = socketIOClient("http://localhost:5000");
export const useSocketInstanceStore = create(set => ({
	socket: socket,
}));

export default useUserStore;
