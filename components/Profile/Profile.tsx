import React from "react";
import Identicon from "react-identicons";
import { FiEdit2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import useModal from "store/modalStore";
import Button from "components/Button/Button";

interface ProfileProps {
	// change with user id
	username: string;
	isEditable?: boolean;
	isKickable?: boolean;
}

// TODO
// - admin id
// admin username

const isAdmin = true;
const currentUsername = "mavn";

const Profile: React.FC<ProfileProps> = ({
	username,
	isEditable = false,
	isKickable = false,
}) => {
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
						className="w-max py-2 justify-self-end ml-auto text-sm"
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
						className="w-max py-2 justify-self-end ml-auto text-sm bg-red-800 hover:bg-red-700 focus:bg-red-900"
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
				className={`flex flex-col gap-3 items-center 
				${showKickButton && "hover:text-red-600 hover:opacity-80"} 
				${showEditButton && "hover:text-green-500 hover:opacity-80"} 
			}`}
				onClick={onClick}
			>
				<div className="bg-white p-3 rounded-full flex justify-center items-center w-24 h-24">
					<Identicon
						string={username}
						size={52}
						padding={0}
						bg="#ffffff"
					/>
				</div>

				<div className="flex gap-1 items-center justify-center">
					<div>
						<p>{username}</p>
					</div>

					<div>
						{showKickButton && <IoMdClose className="pt-1" />}
					</div>
					<div>{showEditButton && <FiEdit2 />}</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
