/**
 * @author Sat Nguyen
 * @create  2021-07-26 10:43:30
 * @description Support feature chat and call
 */

import { Icon_Global_GoBack, Icon_Global_Heart, Icon_Noti_Call, Icon_Noti_Send } from "/public/icon/iconGlobal";
import React, { useEffect, useState } from "react";

import { ContextData } from "/global/contextData";
import IconUserInfo from "/public/icon/icon_user_info.png";
import Image from "next/image";
import LayoutFullView from "/components/layout/LayoutFullView";
import { io } from "socket.io-client";

const mediaConstraints = {
	audio: true,
	video: {
		width: 720,
		height: 480,
		facingMode: "user",
	},
};
const iceServers = {
	iceServers: [
		{
			urls: "stun:pg-stun.teknix.vn:5349",
		},
		{
			urls: "turn:pg-turn.teknix.vn:3479?transport=udp",
			credential: "somepassword",
			username: "guest",
		},
		{
			urls: "turn:pg-turn.teknix.vn:3479?transport=tcp",
			credential: "somepassword",
			username: "guest",
		},
	],
};
var socketClient = io("https://pg-stream.teknix.vn", { transports: ["websocket"] });
const userId = typeof ContextData.loginInfo !== "undefined" ? ContextData.loginInfo.userId : "";
var clientId = "";
var requestId = "";
var roomId = "";
var rtcPeerConnection = null;
var isRoomCreator = false;
var myStream = null;
var myVideo = {};
var remoteVideo = {};
console.log("====================================Chat: ContextData");
console.log(ContextData);
console.log("====================================");

const TextChat = () => {
	const [listRequest, setListRequest] = useState([]);
	const [txtChat, setTxtChat] = useState("");
	const [msgArray, setMessageArr] = useState({
		id: null,
		imageUrl: null,
		imageAlt: null,
		title: null,
		createdAt: null,
		messages: [],
	});
	const [flagCall, setFlagCall] = useState(false);

	useEffect(() => {
		// * Listen event my socket id
		socketClient.on("id", (id) => {
			clientId = id;
			var params = {
				userId: userId,
				userName: JSON.parse(window.localStorage.userInfo).display_name,
				partnerId: id,
			};
			socketClient.emit("user_id", JSON.stringify(params));
		});

		// * Listen event list id connecting to server
		socketClient.on("list_id", (listId) => {
			console.log("====================================chat: list_id");
			console.log(listId);
			console.log("====================================");
			if (listId.length > 1) {
				setListRequest(JSON.parse(listId));
			}
		});

		// * Listen event chat
		socketClient.on("chat", (data) => {
			handleDateReceived(JSON.parse(data));
		});

		// * Listen event request call: A -> B
		socketClient.on("request_call", (data) => {
			// TODO: Show icon accept and reject call

			var msg = JSON.parse(data);
			requestId = msg.clientId;

			// ! Simulator accept request call
			var params = {
				clientId: clientId,
				requestId: msg.clientId,
				userId: userId,
			};
			socketClient.emit("accept_call", JSON.stringify(params));
		});

		// * Listen event reject call
		socketClient.on("reject_call", (data) => {
			var msg = JSON.parse(data);
			// TODO: Show popup partner reject call
		});

		// * Listen event accept call: B -> A
		socketClient.on("accept_call", async () => {
			var params = {
				clientId: clientId,
				requestId: requestId,
				userId: userId,
				roomId: roomId,
			};
			socketClient.emit("room_create", JSON.stringify(params));
			setFlagCall(true);

			await setLocalStream(mediaConstraints);
			isRoomCreator = true;
		});

		// * Listen event room create: A -> B
		socketClient.on("room_created", async (data) => {
			var msg = JSON.parse(data);
			var params = {
				clientId: clientId,
				requestId: requestId,
				userId: userId,
				roomId: msg.roomId,
			};
			socketClient.emit("room_join", JSON.stringify(params));
			roomId = msg.roomId;
			setFlagCall(true);

			await setLocalStream(mediaConstraints);
			socketClient.emit("start_call", msg.roomId);
		});

		// * Listen event start call: Server to A - B
		socketClient.on("start_call", async () => {
			if (isRoomCreator) {
				rtcPeerConnection = new RTCPeerConnection(iceServers);
				addLocalTracks(rtcPeerConnection);
				rtcPeerConnection.ontrack = setOnTrack;
				rtcPeerConnection.onicecandidate = sendIceCandidate;
				await createOffer(rtcPeerConnection);
			}
		});

		// * Listen event create offer of WebRTC
		socketClient.on("webrtc_offer", async (event) => {
			if (!isRoomCreator) {
				rtcPeerConnection = new RTCPeerConnection(iceServers);
				addLocalTracks(rtcPeerConnection);
				rtcPeerConnection.ontrack = setOnTrack;
				rtcPeerConnection.onicecandidate = sendIceCandidate;
				rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
				await createAnswer(rtcPeerConnection);
			}
		});

		// * Listen event ice candidate of WebRTC
		socketClient.on("webrtc_ice_candidate", (event) => {
			var candidate = new RTCIceCandidate({
				sdpMLineIndex: event.label,
				candidate: event.candidate,
			});
			rtcPeerConnection.addIceCandidate(candidate);
		});

		// * Listen event answer call
		socketClient.on("webrtc_answer", (event) => {
			rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
		});
	}, []);

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event get realtime send message
	 * @returns {String} [Format -> HH:MM:ss - DD/MM/YYYY]
	 */
	function handleDateTime() {
		var date = new Date();
		var data =
			date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " - " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
		return data;
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event handle receive message from partner
	 */
	function handleDateReceived(msg) {
		requestId = msg.clientId;
		var dateReceived = {
			imageUrl: "https://placeimg.com/140/140/any", // TODO: Update avt chat according to user info
			imageAlt: "Sat Nguyen", // * Support flitter data in database
			messageText: msg.data.messageText,
			createdAt: handleDateTime(),
			isMyMessage: false,
		};

		var arr = { ...msgArray };
		if (arr.id === null) {
			arr.id = msg.clientId;
			arr.imageUrl = Logo;
			arr.imageAlt = msg.clientId;
			arr.title = null;
			arr.createdAt = handleDateTime();
		}

		arr.messages.push(dateReceived);
		setMessageArr(arr);
		console.log(msgArray);
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event get media of user
	 */
	async function setLocalStream(mediaConstraints) {
		let media = null;
		try {
			media = await navigator.mediaDevices.getUserMedia(mediaConstraints);
		} catch (error) {
			alert("The device could not be found. Please check your webcam !");
		}

		myStream = media;
		myVideo.current.srcObject = media;
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event add local track to peer in WebRTC
	 */
	function addLocalTracks(peer) {
		myStream.getTracks().forEach((track) => {
			peer.addTrack(track, myStream);
		});
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event get media of partner
	 */
	function setOnTrack(event) {
		remoteVideo.current.srcObject = event.streams[0];
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event authentication WebRTC
	 */
	function sendIceCandidate(event) {
		if (event.candidate) {
			socketClient.emit("webrtc_ice_candidate", {
				roomId,
				label: event.candidate.sdpMLineIndex,
				candidate: event.candidate.candidate,
			});
		}
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event create a offer support communication between client
	 */
	async function createOffer(peer) {
		let sessionDescription = null;
		try {
			sessionDescription = await peer.createOffer();
			peer.setLocalDescription(sessionDescription);
		} catch (error) {
			console.error(error);
		}

		socketClient.emit("webrtc_offer", {
			type: "webrtc_offer",
			sdp: sessionDescription,
			roomId,
		});
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event answer call from partner
	 */
	async function createAnswer(peer) {
		let sessionDescription = null;
		try {
			sessionDescription = await peer.createAnswer();
			peer.setLocalDescription(sessionDescription);
		} catch (error) {
			console.error(error);
		}

		socketClient.emit("webrtc_answer", {
			type: "webrtc_answer",
			sdp: sessionDescription,
			roomId,
		});
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event input data message
	 */
	function onChangeText(e) {
		setTxtChat(e.target.value);

		if (e.key === "Enter") {
			onClickSend();
		}
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event handle button send message text
	 */
	function onClickSend() {
		var dataSend = {
			imageUrl: null,
			imageAlt: null,
			messageText: txtChat,
			createdAt: handleDateTime(),
			isMyMessage: true,
		};

		var msg = { ...msgArray };
		if (msg.id === null) {
			msg.id = clientId;
			msg.imageUrl = Logo;
			msg.imageAlt = clientId;
			msg.title = null;
			msg.createdAt = handleDateTime();
		}

		msg.messages.push(dataSend);
		setMessageArr(msg);
		console.log(msgArray);

		var params = {
			clientId: clientId,
			requestId: requestId,
			data: dataSend,
			userId: userId,
		};
		socketClient.emit("chat", JSON.stringify(params));

		setTxtChat("");
	}

	/**
	 * @author sat.nguyen
	 * @create 31/07/2021
	 * @description Process event handle button call
	 */
	function onClickCall() {
		roomId = userId + "_" + clientId;
		var params = {
			clientId: clientId,
			requestId: requestId,
			userId: userId,
		};
		socketClient.emit("request_call", JSON.stringify(params));
	}

	// TODO: Simulator event end save content message to database
	function onClickSaveDB() {
		var params = {
			clientId: "123",
			requestId: "abc",
			data: msgArray,
		};
		socketClient.emit("chat_db", JSON.stringify(params));
	}

	function handleRejectCall() {
		var params = {
			clientId: clientId,
			requestId: requestId,
			userId: userId,
		};
		socketClient.emit("reject_call", JSON.stringify(params));
	}

	const MessageList = () => {
		var messItem = null;
		var msg = { ...msgArray };
		var messages = msg.messages;
		messItem = messages.map((message, index) => {
			return <MessageItem key={index} data={message} />;
		});
		return <>{messItem}</>;
	};

	const MessageItem = (params) => {
		var message = params.data;
		var isMyMessage = message.isMyMessage;
		return (
			<>
				{isMyMessage === true ? (
					<div className="mb-2 max-w-3/4 flex items-center justify-end mr-0 ml-auto ">
						<div className="text-body-small rounded-xl bg-primary_6 text-white py-2.5 px-4">{message.messageText}</div>
					</div>
				) : (
					<>
						<div className="max-w-3/4 flex items-center mb-2 ">
							<div className=" flex min-w-[1.75rem] min-h-[1.75rem]">
								<Image src={IconUserInfo} width={28} height={28} />
							</div>

							<div className="ml-3 ">
								<div className="text-body-small rounded-xl bg-gray_12 text-gray_2 py-2.5 px-4">{message.messageText}</div>
							</div>
						</div>
						<time className="caption-1 text-gray_4 opacity-60">{message.createdAt}</time>
					</>
				)}
			</>
		);
	};

	const HeaderChat = () => {
		const [selectedId, setSelectedId] = useState([]);

		function handleSelectChange(event) {
			setSelectedId(event.target.value);
			requestId = event.target.value;
		}

		return (
			<div className="p-3.5 items-center flex justify-between bg-primary_6">
				<div className="flex items-center">
					<button className="back flex w-10 h-10 items-center justify-center border-1 border-opacity-20 border-white rounded-full mr-4">
						<Icon_Global_GoBack />
					</button>
					<div className="meta-chat ">
						<div className="text-white capitalize font-semibold text-medium mb-1">{clientId}</div>
						<div className=" caption-2 text-black font-normal">
							<select value={selectedId} onChange={handleSelectChange}>
								{listRequest.map((items, index) => (
									<option value={items.partnerId}>{items.partnerId}</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<button onClick={onClickCall} className="call flex p-2.5">
					<Icon_Noti_Call />
				</button>
			</div>
		);
	};

	const ToastChat = ({ acctivity, status, time }) => {
		return (
			<div className="p-3.5   items-center flex justify-between bg-primary_12">
				<div className="flex items-center">
					<button className="back flex w-10 h-10 items-center justify-center  bg-white rounded-full mr-4">
						<Icon_Global_Heart />
					</button>
					<div className="meta-chat ">
						<div className=" text-gray_4 text-label-bold capitalize font-semibold text-medium mb-1">Đi dự tiệc</div>
						<div className=" caption-1 text-orange_6 font-normal">Chờ bắt đầu</div>
					</div>
				</div>
				<time className="time bg-primary_6 rounded-md text-white  px-2 py-1 text-large">19:59</time>
			</div>
		);
	};

	const InputChat = ({ value, onChangeText, send }) => {
		return (
			<div className=" border-t bg-white flex sticky bottom-[85px] items-center border-black border-opacity-10 py-2 px-5">
				<input
					className="w-full pr-2 text-body-small  outline-none"
					type="text"
					placeholder="Nhập tin nhắn"
					value={value}
					onChange={(e) => onChangeText(e)}
				/>
				<div className=" w-10 h-10 flex items-center justify-end">
					<button className="flex items-center" onClick={send}>
						<Icon_Noti_Send />
					</button>
				</div>
			</div>
		);
	};

	const HeaderCall = () => {
		return (
			<div className="p-3.5 items-center flex justify-between bg-primary_6">
				<div className="flex items-center">
					<button className="back flex w-10 h-10 items-center justify-center border-1 border-opacity-20 border-white rounded-full mr-4">
						<Icon_Global_GoBack />
					</button>
					<div className="meta-chat ">
						<div className="text-white capitalize font-semibold text-medium mb-1">{clientId}</div>
						<div className=" caption-2 text-black font-normal"></div>
					</div>
				</div>
				<button className="call flex p-2.5">
					<Icon_Global_GoBack />
				</button>
			</div>
		);
	};

	return (
		<div className="flex h-screen flex-col">
			{flagCall === true ? (
				<div>
					<HeaderCall />
					<div className="w-40 h-40">
						<video ref={myVideo} autoPlay />
					</div>
					<div className="w-40 h-40">
						<video ref={remoteVideo} autoPlay />
					</div>
				</div>
			) : (
				<>
					<div className="sticky z-10 top-0">
						<HeaderChat />
						<ToastChat name={requestId} time={onClickCall} />
					</div>
					<div className="flex-1 p-5 overflow-auto">
						<MessageList />
					</div>
					<InputChat value={txtChat} onChangeText={onChangeText} send={onClickSend} />
				</>
			)}
		</div>
	);
};

export default TextChat;

TextChat.Layout = LayoutFullView;
