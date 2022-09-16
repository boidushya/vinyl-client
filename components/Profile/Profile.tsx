import React from "react";
import Identicon from "react-identicons";
import Image from "next/image";

interface ProfileProps {
	username: string;
}

const Profile: React.FC<ProfileProps> = ({ username }) => {
	return (
		<div className="flex flex-col gap-3 items-center">
			<div className="bg-white p-3 rounded-full flex justify-center items-center w-28 h-28">
				<Identicon
					string={username}
					size={60}
					padding={0}
					bg="#ffffff"
				/>
			</div>

			<div>
				<p>{username}</p>
			</div>
		</div>
	);
};

export default Profile;
