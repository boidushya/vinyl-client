import React from "react";

interface ChatBubbleProps {
	id: string;
	username: string;
	comment: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
	username,
	comment,
}) => {
	return (
		<div className="border-t-[#E5D4FF20] border-t-2 px-9 py-5">
			<p className="text-[#E5D4FF]">{username} guessed</p>
			<p className="text-base">{comment}</p>
		</div>
	);
};
