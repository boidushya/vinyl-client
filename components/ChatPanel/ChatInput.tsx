import Button from "components/Button/Button";
import React from "react";

interface ChatInputProps {}

const ChatInput: React.FC<ChatInputProps> = () => {
	return (
		<div>
			<div className="flex">
				<input className="bg-[#404065] text-[#E5D4FF] outline-none w-full p-4 px-9 rounded-l-lg" />
				<Button
					className="rounded-r-lg"
					onClick={() => {
						console.log("cc");
					}}
				>
					Send
				</Button>
			</div>
		</div>
	);
};

export default ChatInput;
