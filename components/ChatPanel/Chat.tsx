import React, { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import socketIOClient from "socket.io-client"
import {socket} from "../../utils/webSocket";

interface ChatProps {}

interface Ichat{
	text:string,
	time:string,
	username:string
}

// const chats = [
// 	{
// 		id: "Sfsd",
// 		username: "mavn",
// 		comment: "testesag gawgaweg gaeeg age gaeg",
// 	},
// 	{
// 		id: "fasd",
// 		username: "mavn",
// 		comment: "testesag gawgaweg gaeeg age gaeg",
// 	},

// 	{
// 		id: "faf",
// 		username: "mavn",
// 		comment: "testesag gawgaweg gaeeg age gaeg",
// 	},
// 	{
// 		id: "fa",
// 		username: "mavn",
// 		comment: "testesag gawgaweg gaeeg age gaeg fasdfa dfasdfsdfdfad",
// 	},
// ];

const Chat: React.FC<ChatProps> = () => {

	const [chats,setChats]=useState<Ichat[]>([]);
	
	socket.on("message",(data:any)=>{
		console.log(data,"Data from chat window")
		setChats([...chats,data]);
	})

	socket.on("getUsers",(data:any) => {
		console.log(data,"users data");
	})


	return (
		chats&&
		<div className="grow h-full flex flex-col justify-end">
			{chats.map((chat,idx) => (
				<ChatBubble
					comment={chat.text}
					username={chat.username}
					key={idx}
				/>
			))}
		</div>
	);
};

export default Chat;
