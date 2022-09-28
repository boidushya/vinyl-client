import React, { useEffect, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import socketIOClient from "socket.io-client"
import {socket} from "../../utils/webSocket";

interface ChatProps {}

const chats = [
	{
		id: "Sfsd",
		username: "mavn",
		comment: "testesag gawgaweg gaeeg age gaeg",
	},
	{
		id: "fasd",
		username: "mavn",
		comment: "testesag gawgaweg gaeeg age gaeg",
	},

	{
		id: "faf",
		username: "mavn",
		comment: "testesag gawgaweg gaeeg age gaeg",
	},
	{
		id: "fa",
		username: "mavn",
		comment: "testesag gawgaweg gaeeg age gaeg fasdfa dfasdfsdfdfad",
	},
];

const Chat: React.FC<ChatProps> = () => {
	
	socket.on("message",(data:any)=>{
		console.log(data,"Data from chat window")
	})

	return (
		<div className="grow h-full flex flex-col justify-end">
			{chats.map(chat => (
				<ChatBubble
					comment={chat.comment}
					username={chat.username}
					id={chat.id}
					key={chat.id}
				/>
			))}
		</div>
	);
};

export default Chat;
