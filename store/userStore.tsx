import create from "zustand";
import generateName from "utils/generateName";

type User = {
	id: undefined | string;
	username: string;
	updateUsername: (name: string) => void;
};

const useUserStore = create<User>(set => ({
	id: undefined,
	username: generateName(),
	updateUsername: (username: string) =>
		set((state: User) => ({ ...state, username: username })),
}));

export default useUserStore;
