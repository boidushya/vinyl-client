import React, { useEffect, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import socketIOClient from "socket.io-client"
import {socket} from "../../utils/webSocket";

interface ChatProps {}

type Chat = {
	text: string;
	time: string;
	username: string;
	correct:boolean;
};

const Chat: React.FC<ChatProps> = () => {
	const [chats, setChats] = useState<Chat[]>([]);

	socket.on("message", (data: any) => {
		console.log(data, "Data from chat window");
		console.log(data,"Data");
		setChats([...chats, data]);
	});

	socket.on("getUsers", (data: any) => {
		console.log(data, "users data");
	});

	return (
		chats && (
			<div className="grow h-full flex flex-col justify-end">
				{chats.map((chat, idx) => (
					<ChatBubble
						comment={chat.text}
						username={chat.username}
						correct={chat.correct}
						key={idx}
					/>
				))}
			</div>
		)
	);
};

export default Chat;
