import React from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

interface ChatPanelProps {}

const ChatPanel: React.FC<ChatPanelProps> = () => {
	return (
		<div className="flex flex-col gap-5 bg-[#27273E] h-full rounded-md">
			<div className="flex flex-col justify-end h-full">
				<Chat />
				<ChatInput />
			</div>
		</div>
	);
};

export default ChatPanel;
