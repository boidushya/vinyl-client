import Button from "components/Button/Button";
import React, { useState } from "react";
import socketIOClient from "socket.io-client";
import { useSocketInstanceStore } from "store/userStore";
import {socket} from "../../utils/webSocket";

interface ChatInputProps {}

const ChatInput: React.FC<ChatInputProps> = () => {

	const [message,setMessage]=useState("");

	//const socket = socketIOClient("http://localhost:5000");
	// const socket=useSocketInstanceStore((state:any)=>state.socket)
	const onSendButtonClickHandler=(e:any)=>{
		e.preventDefault();
		socket.emit("chatMessage",{
			questionId:"6qnM0XXPZOINWA778uNqQ9",
			message
		});
		setMessage("");
	}

	const onEnterKeyDown = (e: any) => {
		if (e.keyCode == 13) {
			e.preventDefault();
			socket.emit("chatMessage", {
				questionId:"6qnM0XXPZOINWA778uNqQ9",
				message
			});
			setMessage("");
		}
	};

	return (
		<div>
			<div className="flex">
				<input
					className="bg-[#404065] text-[#E5D4FF] outline-none w-full py-3 px-6 rounded-bl-lg"
					onChange={e => setMessage(e.target.value)}
					value={message}
					onKeyDown={e => onEnterKeyDown(e)}
				/>
				<Button
					className="rounded-none rounded-br-lg"
					onClick={(e: any) => onSendButtonClickHandler(e)}
				>
					Send
				</Button>
			</div>
		</div>
	);
};

export default ChatInput;
