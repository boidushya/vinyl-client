import React from "react";
import Identicon from "react-identicons";
import { FiEdit2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

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
const currentUsername = "admin";

const Profile: React.FC<ProfileProps> = ({
	username,
	isEditable = false,
	isKickable = false,
}) => {
	const showEditButton =
		isEditable && (isAdmin || username === currentUsername);

	const showKickButton = isAdmin && isKickable;
	const onClick = () => {
		console.log(showEditButton, showKickButton);
		if (isEditable && username === currentUsername) {
			// edit modal
		} else if (isKickable) {
			// kick logic
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
