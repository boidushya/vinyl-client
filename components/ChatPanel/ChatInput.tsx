import Button from "components/Button/Button";
import React from "react";

interface ChatInputProps {}

const ChatInput: React.FC<ChatInputProps> = () => {
	return (
		<div>
			<div className="flex">
				<input className="bg-[#404065] text-[#E5D4FF] outline-none w-full py-3 px-6 rounded-bl-lg" />
				<Button
					className="rounded-none rounded-br-lg"
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
