import React from "react";

interface ChatBubbleProps {
	username: string;
	comment: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
	username,
	comment,
}) => {
	return (
		<div className="px-6 py-4 border-t-2 border-opacity-25 border-t-gray-600">
			<p className="mb-1 text-sm font-bold text-opacity-75 text-violet-200">
				<span className="text-opacity-100 text-violet-200">
					{username}
				</span>{" "}
				guessed
			</p>
			<p className="text-base leading-snug text-gray-50">{comment}</p>
		</div>
	);
};
