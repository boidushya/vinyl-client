import React from "react";
import Identicon from "react-identicons";
import { FiEdit2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import useModal from "store/modalStore";
import Button from "components/Button/Button";
import useUserStore from "store/userStore";

interface ProfileProps {
	// change with user id
	username: string;
	isEditable?: boolean;
	isKickable?: boolean;
}

const currentUsername = "mavn";

const Profile: React.FC<ProfileProps> = ({
	username,
	isEditable = false,
	isKickable = false,
}) => {
	const { isAdmin } = useUserStore();

	const showEditButton =
		isEditable && (isAdmin || username === currentUsername);

	const showKickButton = isAdmin && isKickable;

	const { showModal } = useModal();

	const onClick = () => {
		console.log(showEditButton, showKickButton);
		if (isEditable && username === currentUsername) {
			showModal(
				<div className="flex flex-col gap-4">
					<h5 className="font-medium">What should we call you?</h5>
					<input
						type="text"
						autoComplete="off"
						autoCorrect="off"
						className="w-full bg-slate-900 outline-none text-purple-100 text-base rounded-lg block p-2.5 px-6 focus:ring-violet-300 focus:ring-opacity-40 ring-0 focus:ring-2"
						placeholder="Bruno Mars"
					/>
					<Button
						onClick={() => {}}
						className="py-2 ml-auto text-sm w-max justify-self-end"
					>
						Save Changes
					</Button>
				</div>
			);
		} else if (isKickable) {
			showModal(
				<div className="flex flex-col gap-4">
					<h5 className="font-medium">Are You Sure?</h5>
					<p>
						The player will be removed from the game. <br />
						Non incididunt irure anim qui enim pariatur irure.
					</p>
					<Button
						onClick={() => {}}
						className="py-2 ml-auto text-sm bg-red-800 w-max justify-self-end hover:bg-red-700 focus:bg-red-900"
					>
						Kick Player
					</Button>
				</div>
			);
		}
	};

	return (
		<div>
			<div
				className={`flex flex-col gap-3 items-center cursor-pointer text-violet-100 group
				${showKickButton && "hover:text-red-200"}
				${showEditButton && "hover:text-green-200"}
			}`}
				onClick={onClick}
			>
				<div className="relative flex items-center justify-center w-20 h-20 p-1 rounded-full bg-violet-100">
					<Identicon
						string={username}
						size={36}
						padding={0}
						bg="rgb(237 233 254)"
					/>
					{/* <div className="absolute hidden w-full h-full bg-red-900 rounded-full bg-opacity-80 place-items-center group-hover:grid"></div> */}
					<div
						className={`absolute hidden w-full h-full ${
							showKickButton ? `bg-red-900` : ``
						} ${
							showEditButton ? `bg-green-900` : ``
						} rounded-full bg-opacity-80 place-items-center group-hover:grid`}
					>
						{showKickButton && (
							<IoMdClose
								size={32}
								className="mt-0.5"
								strokeWidth={12}
							/>
						)}
						{showEditButton && <FiEdit2 size={24} />}
					</div>
				</div>

				<div className="relative flex items-center justify-center gap-1">
					<div>
						<p
							className={`font-semibold ${
								showEditButton ? `text-green-300` : ``
							}`}
						>
							{username}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
