// use this 
// import { useState, useEffect, useRef } from "react"
// import { useParams } from "react-router-dom"
// import BASE_URL from "../../../api/BaseUrl"
// export default function ChatPage() {
//   const { chatId } = useParams()
//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState("")
//   // const [jobseekerName, setJobseekerName] = useState("") 
//   const messagesEndRef = useRef(null)

//   useEffect(() => {
//     fetchMessages()
//   }, [])

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   const fetchMessages = async () => {
//     const token = localStorage.getItem("token")
//     try {
//       const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (response.status === 204) {
//         setMessages([])
//         return
//       }

//       if (response.ok) {
//         const data = await response.json()
//         setMessages(data)

//         // if (data.length > 0) {
//         //   setJobseekerName(data[0].name)
//         // }
//       }

      
//     } catch (error) {
//       console.error("Error fetching messages:", error)
//     }
//   }

//   const sendMessage = async () => {
//     if (!message.trim()) return

//     const token = localStorage.getItem("token")

//     try {
//       const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       })

//       if (response.ok) {
//         const newMessage = await response.json()
//         setMessages((prevMessages) => [...prevMessages, newMessage])
//         setMessage("")
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     }
//   }

//   // Assuming the first message will have the sender's name
//   const senderName = messages.length > 0 ? messages[0].senderName : ""

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-200">
//       <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
//         <header className="bg-green-500 text-white p-4 shadow-md">
//           <h1 className="text-xl font-semibold">Chat</h1>
//         </header>
//         <div className="h-96 overflow-y-auto p-4 space-y-4">
//           {messages.length === 0 ? (
//             <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
//           ) : (
//             <>
//               {/* Show sender name at the top */}
//               <div className="text-lg font-semibold text-gray-700">{senderName}</div>
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${msg.sender === "Employer" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
//                       msg.sender === "jobseeker"
//                         ? "bg-green-500 text-white rounded-br-none"
//                         : "bg-blue-100 text-gray-800 rounded-bl-none"
//                     }`}
//                   >
//                     <p>{msg.content}</p>
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="bg-white p-4 shadow-lg">
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message"
//               className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// first one without websocket
// import { useState, useEffect, useRef } from "react"
// import { useParams, useNavigate, useLocation } from "react-router-dom"
// import BASE_URL from "../../../api/BaseUrl"

// export default function EmployerChatPage() {
//   const { chatId } = useParams()
//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState("")
//   const messagesEndRef = useRef(null)
//   const navigate = useNavigate()
//   const location = useLocation();
//   const name = location.state?.name || "Unknown";
//   const startVideoCall = async () => {
//     const roomID = chatId
//     const token = localStorage.getItem("token")
//     try {
//       await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: `Join the video call: /video-call?roomID=${roomID}` }),
//       })

//       // Fetch messages to update the chat
//       fetchMessages()
//     } catch (error) {
//       console.error("Error sending video call link:", error)
//     }
//   }

//   useEffect(() => {
//     fetchMessages()
//     const intervalId = setInterval(fetchMessages, 5000)
//     return () => clearInterval(intervalId)
//   }, []) // Removed unnecessary chatId dependency

//   const fetchMessages = async () => {
//     const token = localStorage.getItem("token")
//     try {
//       const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.ok) {
//         const data = await response.json()
//         setMessages(data)
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error)
//     }
//   }

//   const sendMessage = async () => {
//     if (!message.trim()) return
//     const token = localStorage.getItem("token")
//     try {
//       const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       })
//       if (response.ok) {
//         setMessage("")
//         fetchMessages()
//       }
//     } catch (error) {
//       console.error("Error sending message:", error)
//     }
//   }

//   const handleJoinCall = (roomID) => {
//     navigate(`/video-call?roomID=${roomID}&role=employer`)
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-200">
//       <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
//         <header className="bg-black text-white p-4 shadow-md flex justify-between items-center">
//           <h1 className="text-xl font-semibold">{name}</h1>
//           <button
//             onClick={startVideoCall}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
//           >
//             Start Video Call
//           </button>
//         </header>
//         <div className="h-96 overflow-y-auto p-4 space-y-4">
//         {messages.length === 0 ? (
//             <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
//           ) : (
//           messages.map((msg) => (
//             <div key={msg.id} className={`flex ${msg.sender === "Employer" ? "justify-end" : "justify-start"}`}>
//               <div
//                 className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
//                   msg.sender === "jobseeker"
//                     ? "bg-black text-white rounded-br-none"
//                     : "bg-blue-100 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 {msg.content.startsWith("Join the video call:") ? (
//                   <button
//                     onClick={() => handleJoinCall(msg.content.split("roomID=")[1])}
//                     className="text-blue-500 underline"
//                   >
//                     Join Video Call
//                   </button>
//                 ) : (
//                   <p>{msg.content}</p>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="bg-white p-4 shadow-lg">
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type a message"
//               className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-black text-white p-2 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Client } from "@stomp/stompjs";
// import PropTypes from "prop-types";

// const ChatRoom = () => {
//   const location = useLocation();
//   const { chatId, userId, senderType } = location.state || {};

//   const [client, setClient] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!chatId || !userId || !senderType) {
//       console.error("Missing chatId, userId, or senderType");
//       return;
//     }
  
//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000, 
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");
  
//         const subscription = stompClient.subscribe(`/topic/chatroom`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });
  
//         setClient(stompClient);
  
//         // Unsubscribe when unmounting
//         return () => {
//           console.log("Unsubscribing from chatroom...");
//           subscription.unsubscribe(); // ✅ Now it's used
//         };
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });
  
//     stompClient.activate();
  
//     // Cleanup: Deactivate WebSocket & Unsubscribe
//     return () => {
//       console.log("Disconnecting WebSocket...");
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, senderType]);
  

//   const sendMessage = () => {
//     if (client && message.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         senderType,
//         message,
//         timestamp: new Date().toISOString(),
//       };
//       client.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" }
//       });
//             setMessage("");
//     }
//   };

//   return (
//     <div className="mt-32">
//       <h2>Chat Room {chatId}</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.senderType} {msg.senderId}:</strong> {msg.message}
//           </p>
//         ))}
//       </div>
//       <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// ChatRoom.propTypes = {
//   chatId: PropTypes.string,
//   userId: PropTypes.string,
//   senderType: PropTypes.string,
// };

// export default ChatRoom;

// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Client } from "@stomp/stompjs";
// import PropTypes from "prop-types";

// const ChatRoom = () => {
//   const location = useLocation();
//   const { chatId, userId, senderType } = location.state || {};

//   const [client, setClient] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!chatId || !userId || !senderType) {
//       console.error("Missing chatId, userId, or senderType");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");
//         const subscription = stompClient.subscribe(`/topic/chatroom`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });
//         setClient(stompClient);
//         return () => subscription.unsubscribe();
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, senderType]);

//   const sendMessage = () => {
//     if (client && message.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         senderType,
//         message,
//         timestamp: new Date().toISOString(),
//       };
//       client.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });
//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>
//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${
//               msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//             }`}
//           >
//             <p className="text-sm">{msg.message}</p>
//             <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center mt-4">
//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border rounded-l-lg focus:outline-none"
//         />
//         <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-r-lg">Send</button>
//       </div>
//     </div>
//   );
// };

// ChatRoom.propTypes = {
//   chatId: PropTypes.string,
//   userId: PropTypes.string,
//   senderType: PropTypes.string,
// };

// export default ChatRoom;


// works well with websocket
// import { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { Client } from "@stomp/stompjs";

// const ChatRoom = () => {
//   const location = useLocation();
//   const { chatId, userId, senderType } = location.state || {};

//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!chatId || !userId || !senderType) {
//       console.error("Missing chatId, userId, or senderType");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");
//         const subscription = stompClient.subscribe(`/topic/chatroom`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });

//         clientRef.current = stompClient;

//         // Cleanup function for unsubscribe
//         return () => {
//           subscription.unsubscribe();
//         };
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       stompClient.deactivate();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (clientRef.current && message.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         senderType,
//         message,
//         timestamp: new Date().toISOString(),
//       };
//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });
//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>
//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${
//               msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//             }`}
//           >
//             <p className="text-sm">{msg.message}</p>
//             <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center mt-4">
//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border rounded-l-lg focus:outline-none"
//         />
//         <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-r-lg">Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;

// import { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { Client } from "@stomp/stompjs";
// import EmojiPicker from "emoji-picker-react";  // Import Emoji Picker

// const ChatRoom = () => {
//   const location = useLocation();
//   const { chatId, userId, senderType } = useMemo(() => location.state || {}, [location.state]);

//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Emoji picker visibility

//   useEffect(() => {
//     if (!chatId || !userId || !senderType) {
//       console.error("Missing chatId, userId, or senderType");
//       return;
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");
//         const subscription = stompClient.subscribe(`/topic/chatroom`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });

//         clientRef.current = stompClient;

//         return () => {
//           subscription.unsubscribe();
//         };
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       clientRef.current = null;
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, senderType]);

//   const sendMessage = () => {
//     if (clientRef.current && message.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         senderType,
//         message,
//         timestamp: new Date().toISOString(),
//       };
//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });
//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   const handleEmojiClick = (emojiData) => {
//     setMessage((prevMessage) => prevMessage + emojiData.emoji); // Append selected emoji
//   };

//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>
//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${
//               msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//             }`}
//           >
//             <p className="text-sm">{msg.message}</p>
//             <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//           </div>
//         ))}
//       </div>
      
//       <div className="relative">
//         {showEmojiPicker && (
//           <div className="absolute bottom-12 left-0">
//             <EmojiPicker onEmojiClick={handleEmojiClick} />
//           </div>
//         )}
//       </div>

//       <div className="flex items-center mt-4">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className="bg-yellow-500 text-white px-3 py-2 rounded-l-lg"
//         >
//           😊
//         </button>
//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border focus:outline-none"
//         />
//         <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-r-lg">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;

// one on one without emoji
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { Client } from "@stomp/stompjs";

// const ChatRoom = () => {
//   const location = useLocation();
//   const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state]);

//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!chatId || !userId || !receiverId || !senderType) {
//       console.error("Missing chatId, userId, receiverId, or senderType");
//       return;
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Subscribe to private queue
//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });

//         clientRef.current = stompClient;

//         return () => {
//           subscription.unsubscribe();
//         };
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       clientRef.current = null;
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, receiverId, senderType]);

//   const sendMessage = () => {
//     if (clientRef.current && message.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         receiverId,
//         senderType,
//         message,
//         timestamp: new Date().toISOString(),
//       };
//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });
//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>
//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${
//               msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//             }`}
//           >
//             <p className="text-sm">{msg.message}</p>
//             <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center mt-4">
//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border focus:outline-none"
//         />
//         <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-r-lg">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { Client } from "@stomp/stompjs";
// import EmojiPicker from "emoji-picker-react";
// import { Smile } from "lucide-react"; // Emoji button icon

// const ChatRoom = () => {
//   const location = useLocation();
//   const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state]);

//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Emoji Picker State

//   useEffect(() => {
//     if (!chatId || !userId || !receiverId || !senderType) {
//       console.error("Missing chatId, userId, receiverId, or senderType");
//       return;
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Subscribe to private queue
//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });

//         clientRef.current = stompClient;

//         return () => {
//           subscription.unsubscribe();
//         };
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       clientRef.current = null;
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, receiverId, senderType]);

//   const sendMessage = () => {
//     if (clientRef.current && message.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         receiverId,
//         senderType,
//         message,
//         timestamp: new Date().toISOString(),
//       };
//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });
//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   // Function to handle emoji selection
//   const handleEmojiSelect = (emojiObject) => {
//     setMessage((prevMessage) => prevMessage + emojiObject.emoji);
//     setShowEmojiPicker(false); // Hide emoji picker after selection
//   };

//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>
      
//       {/* Chat Messages */}
//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${
//               msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//             }`}
//           >
//             <p className="text-sm">{msg.message}</p>
//             <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//           </div>
//         ))}
//       </div>

//       {/* Emoji Picker */}
//       {showEmojiPicker && (
//         <div className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg">
//           <EmojiPicker onEmojiClick={handleEmojiSelect} />
//         </div>
//       )}

//       {/* Input & Send Button */}
//       <div className="flex items-center mt-4 relative">
//         {/* Emoji Picker Button */}
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
//         >
//           <Smile size={20} />
//         </button>

//         {/* Message Input */}
//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border focus:outline-none"
//         />

//         {/* Send Button */}
//         <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-r-lg">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { Client } from "@stomp/stompjs";
// import EmojiPicker from "emoji-picker-react";
// import { Smile } from "lucide-react"; 

// const ChatRoom = () => {
//   const location = useLocation();
//   const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state]);

//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false); 

//   useEffect(() => {
//     if (!chatId || !userId || !receiverId || !senderType) {
//       console.error("Missing chatId, userId, receiverId, or senderType");
//       return;
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Subscribe to chat-specific queue
//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });

//         clientRef.current = stompClient;

//         return () => {
//           subscription.unsubscribe();
//         };
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       clientRef.current = null;
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, receiverId, senderType]);

//   const sendMessage = () => {
//     if (clientRef.current && message.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         receiverId,
//         senderType,
//         message,
//         timestamp: new Date().toISOString(),
//       };
//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });
//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   const handleEmojiSelect = (emojiObject) => {
//     setMessage((prevMessage) => prevMessage + emojiObject.emoji);
//     setShowEmojiPicker(false);
//   };

//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>

//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${
//               msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//             }`}
//           >
//             <p className="text-sm">{msg.message}</p>
//             <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//           </div>
//         ))}
//       </div>

//       {showEmojiPicker && (
//         <div className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg">
//           <EmojiPicker onEmojiClick={handleEmojiSelect} />
//         </div>
//       )}

//       <div className="flex items-center mt-4 relative">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
//         >
//           <Smile size={20} />
//         </button>

//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border focus:outline-none"
//         />

//         <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-r-lg">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;





// import { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation,useNavigate} from "react-router-dom";
// import { Client } from "@stomp/stompjs";
// import EmojiPicker from "emoji-picker-react";
// import { Smile, Video } from "lucide-react";
// import {useAuth} from "../../../contexts/AuthContexts";

// const ChatRoom = () => {
//   const location = useLocation();
//   const {userRole} = useAuth();
//   const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state]);
// const navigate = useNavigate();
//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   useEffect(() => {
//     if (!chatId || !userId || !receiverId || !senderType) {
//       console.error("Missing chatId, userId, receiverId, or senderType");
//       return;
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");
        
//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });

//         clientRef.current = stompClient;

//         return () => {
//           subscription.unsubscribe();
//         };
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       clientRef.current = null;
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, receiverId, senderType]);

//   const sendMessage = (msgContent) => {
//     if (clientRef.current && msgContent.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         receiverId,
//         senderType,
//         message: msgContent,
//         timestamp: new Date().toISOString(),
//       };
//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });
//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   const handleEmojiSelect = (emojiObject) => {
//     setMessage((prevMessage) => prevMessage + emojiObject.emoji);
//     setShowEmojiPicker(false);
//   };

//   const createVideoCall = () => {
//     const roomID = `${chatId}-${Date.now()}`;
//     const videoCallLink = `${window.location.origin}/video-call?roomID=${roomID}`;
//     sendMessage(`Join the video call: ${videoCallLink}`);
//   };
//   const handleJoinCall = (roomID) => {
//     navigate(`/video-call?roomID=${roomID}&role=${userRole}`)
//   }
//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>

//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${
//               msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//             }`}
//           >
//             {msg.message.startsWith("Join the video call:") ? (
//               // <a href={msg.message.split("Join the video call: ")[1]} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
//               //   {msg.message}
//               // </a>
//                <button
//                onClick={() => handleJoinCall(msg.message.split("roomID=")[1])}
//                className="text-white underline"
//              >
//                Join meeting now
//              </button>
//             ) : (
//               <p className="text-sm">{msg.message}</p>
//             )}
//             <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//           </div>
//         ))}
//       </div>

//       {showEmojiPicker && (
//         <div className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg">
//           <EmojiPicker onEmojiClick={handleEmojiSelect} />
//         </div>
//       )}

//       <div className="flex items-center mt-4 relative">
//         <button onClick={() => setShowEmojiPicker((prev) => !prev)} className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300">
//           <Smile size={20} />
//         </button>

//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border focus:outline-none"
//         />

//         <button onClick={() => sendMessage(message)} className="bg-green-500 text-white px-4 py-2">
//           Send
//         </button>

//         <button onClick={createVideoCall} className="bg-red-500 text-white px-4 py-2 ml-2 rounded">
//           <Video size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;

// import { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Client } from "@stomp/stompjs";
// import EmojiPicker from "emoji-picker-react";
// import { Smile, Video } from "lucide-react";
// import { useAuth } from "../../../contexts/AuthContexts";
// import BASE_URL from "../../../api/BaseUrl";
// const ChatRoom = () => {
//   const location = useLocation();
//   const { userRole } = useAuth();
//   const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state]);

//   const navigate = useNavigate();
//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]); // Holds all messages (previous + new)
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   // ✅ Fetch previous messages from the backend
//   useEffect(() => {
//     const fetchPreviousMessages = async () => {
//       try {
//         if (!chatId) return;
//         const token = localStorage.getItem('token');

//         const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });  
//                 if (!response.ok) throw new Error("Failed to fetch chat history");

//         const data = await response.json();
//         setMessages(data); // Store previous messages in state
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };

//     fetchPreviousMessages();
//   }, [chatId]);

//   // ✅ WebSocket Connection & Listening for new messages
//   useEffect(() => {
//     if (!chatId || !userId || !receiverId || !senderType) {
//       console.error("Missing chatId, userId, receiverId, or senderType");
//       return;
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Subscribe to message queue
//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]); // Append new messages to state
//         });

//         clientRef.current = stompClient;

//         return () => subscription.unsubscribe();
//       },
//       onStompError: (frame) => {
//         console.error("WebSocket Error:", frame.headers["message"], frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       clientRef.current = null;
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, receiverId, senderType]);

//   // ✅ Send message through WebSocket
//   const sendMessage = (msgContent) => {
//     if (clientRef.current && msgContent.trim() !== "") {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         receiverId,
//         senderType,
//         message: msgContent,
//         timestamp: new Date().toISOString(),
//       };

//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });

//       setMessages([...messages, chatMessage]); // Add the message to UI instantly
//       setMessage("");
//     }
//   };

//   // ✅ Handle Emoji Selection
//   const handleEmojiSelect = (emojiObject) => {
//     setMessage((prevMessage) => prevMessage + emojiObject.emoji);
//     setShowEmojiPicker(false);
//   };

//   // ✅ Create and send a video call link
//   const createVideoCall = () => {
//     const roomID = `${chatId}-${Date.now()}`;
//     const videoCallLink = `${window.location.origin}/video-call?roomID=${roomID}`;
//     sendMessage(`Join the video call: ${videoCallLink}`);
//   };

//   // ✅ Navigate to Video Call
//   const handleJoinCall = (roomID) => {
//     navigate(`/video-call?roomID=${roomID}&role=${userRole}`);
//   };

//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>

//       {/* Chat Messages */}
//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-500">No messages yet.</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-2 rounded-lg max-w-xs ${
//                 msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//               }`}
//             >
//               {msg.message.startsWith("Join the video call:") ? (
//                 <button
//                   onClick={() => handleJoinCall(msg.message.split("roomID=")[1])}
//                   className="text-white underline"
//                 >
//                   Join meeting now
//                 </button>
//               ) : (
//                 <p className="text-sm">{msg.message}</p>
//               )}
//               <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Emoji Picker */}
//       {showEmojiPicker && (
//         <div className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg">
//           <EmojiPicker onEmojiClick={handleEmojiSelect} />
//         </div>
//       )}

//       {/* Message Input & Controls */}
//       <div className="flex items-center mt-4 relative">
//         <button onClick={() => setShowEmojiPicker((prev) => !prev)} className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300">
//           <Smile size={20} />
//         </button>

//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border focus:outline-none"
//         />

//         <button onClick={() => sendMessage(message)} className="bg-green-500 text-white px-4 py-2">
//           Send
//         </button>

//         <button onClick={createVideoCall} className="bg-red-500 text-white px-4 py-2 ml-2 rounded">
//           <Video size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;


// import { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import { Client } from "@stomp/stompjs";
// import EmojiPicker from "emoji-picker-react";
// import { Smile, Video, Paperclip } from 'lucide-react';
// import { useAuth } from "../../../contexts/AuthContexts";
// import BASE_URL from "../../../api/BaseUrl";

// export default function ChatRoom() {
//   const navigate = useNavigate();
//     const location = useLocation();

//   const { userRole } = useAuth();
//   const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state]);

//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     const fetchPreviousMessages = async () => {
//       try {
//         if (!chatId) return;
//         const token = localStorage.getItem('token');

//         const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });  
//         if (!response.ok) throw new Error("Failed to fetch chat history");

//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };

//     fetchPreviousMessages();
//   }, [chatId]);

//   useEffect(() => {
//     if (!chatId || !userId || !receiverId || !senderType) {
//       console.error("Missing chatId, userId, receiverId, or senderType");
//       return;
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });

//         clientRef.current = stompClient;

//         return () => subscription.unsubscribe();
//       },
//       onStompError: (frame) => {
//         console.error("WebSocket Error:", frame.headers["message"], frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       clientRef.current = null;
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, receiverId, senderType]);

//   const sendMessage = (msgContent, fileUrl = '', fileType = '') => {
//     if (clientRef.current && (msgContent.trim() !== "" || fileUrl)) {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         receiverId,
//         senderType,
//         message: msgContent,
//         fileUrl,
//         fileType,
//         timestamp: new Date().toISOString(),
//       };

//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });

//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   const handleEmojiSelect = (emojiObject) => {
//     setMessage((prevMessage) => prevMessage + emojiObject.emoji);
//     setShowEmojiPicker(false);
//   };

//   const createVideoCall = () => {
//     const roomID = `${chatId}-${Date.now()}`;
//     const videoCallLink = `${window.location.origin}/video-call?roomID=${roomID}`;
//     sendMessage(`Join the video call: ${videoCallLink}`);
//   };

//   const handleJoinCall = (roomID) => {
//     navigate(`/video-call?roomID=${roomID}&role=${userRole}`);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const uploadFile = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${BASE_URL}/api/files/upload`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) throw new Error('File upload failed');

//       const fileUrl = await response.text();
//       sendMessage('', fileUrl, file.type);
//       setFile(null);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col w-[400px] h-[600px] p-4 bg-gray-100 mx-auto mt-24 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Chat Room {chatId}</h2>

//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded shadow">
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-500">No messages yet.</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-2 rounded-lg max-w-xs ${
//                 msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//               }`}
//             >
//               {msg.fileUrl ? (
//                 msg.fileType.startsWith('image/') ? (
//                   <img src={msg.fileUrl || "/placeholder.svg"} alt="Shared image" className="max-w-full h-auto" />
//                 ) : (
//                   <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                     Download File
//                   </a>
//                 )
//               ) : msg.message.startsWith("Join the video call:") ? (
//                 <button
//                   onClick={() => handleJoinCall(msg.message.split("roomID=")[1])}
//                   className="text-white underline"
//                 >
//                   Join meeting now
//                 </button>
//               ) : (
//                 <p className="text-sm">{msg.message}</p>
//               )}
//               <p className="text-xs text-gray-500 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//             </div>
//           ))
//         )}
//       </div>

//       {showEmojiPicker && (
//         <div className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg">
//           <EmojiPicker onEmojiClick={handleEmojiSelect} />
//         </div>
//       )}

//       <div className="flex items-center mt-4 relative">
//         <button onClick={() => setShowEmojiPicker((prev) => !prev)} className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300">
//           <Smile size={20} />
//         </button>

//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border focus:outline-none"
//         />

//         <label htmlFor="file-upload" className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300">
//           <Paperclip size={20} />
//         </label>
//         <input
//           id="file-upload"
//           type="file"
//           onChange={handleFileChange}
//           className="hidden"
//         />

//         <button onClick={() => file ? uploadFile() : sendMessage(message)} className="bg-green-500 text-white px-4 py-2">
//           Send
//         </button>

//         <button onClick={createVideoCall} className="bg-red-500 text-white px-4 py-2 ml-2 rounded">
//           <Video size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }

// this is correct but image download is not possible here 

// import { useState, useEffect, useRef, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Client } from "@stomp/stompjs";
// import EmojiPicker from "emoji-picker-react";
// import { Smile, Video, Paperclip ,Download} from 'lucide-react';
// import { useAuth } from "../../../contexts/AuthContexts";
// import BASE_URL from "../../../api/BaseUrl";

// export default function ChatRoom() {
//   const navigate = useNavigate();
//     const location = useLocation();

//   const { userRole } = useAuth();
//   const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state]);

//   const clientRef = useRef(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     const fetchPreviousMessages = async () => {
//       try {
//         if (!chatId) return;
//         const token = localStorage.getItem('token');

//         const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });  
//         if (!response.ok) throw new Error("Failed to fetch chat history");

//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };

//     fetchPreviousMessages();
//   }, [chatId]);

//   useEffect(() => {
//     if (!chatId || !userId || !receiverId || !senderType) {
//       console.error("Missing chatId, userId, receiverId, or senderType");
//       return;
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.");
//       return;
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, receivedMessage]);
//         });

//         clientRef.current = stompClient;

//         return () => subscription.unsubscribe();
//       },
//       onStompError: (frame) => {
//         console.error("WebSocket Error:", frame.headers["message"], frame.body);
//       },
//     });

//     stompClient.activate();

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       clientRef.current = null;
//       stompClient.deactivate();
//     };
//   }, [chatId, userId, receiverId, senderType]);

//   const sendMessage = (msgContent, fileUrl = '', fileType = '') => {
//     if (clientRef.current && (msgContent.trim() !== "" || fileUrl)) {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         receiverId,
//         senderType,
//         message: msgContent,
//         fileUrl,
//         fileType,
//         timestamp: new Date().toISOString(),
//       };

//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       });

//       setMessages([...messages, chatMessage]);
//       setMessage("");
//     }
//   };

//   const handleEmojiSelect = (emojiObject) => {
//     setMessage((prevMessage) => prevMessage + emojiObject.emoji);
//     setShowEmojiPicker(false);
//   };

//   const createVideoCall = () => {
//     const roomID = `${chatId}-${Date.now()}`;
//     const videoCallLink = `${window.location.origin}/video-call?roomID=${roomID}`;
//     sendMessage(`Join the video call: ${videoCallLink}`);
//   };

//   const handleJoinCall = (roomID) => {
//     navigate(`/video-call?roomID=${roomID}&role=${userRole}`);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const uploadFile = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${BASE_URL}/api/files/upload`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) throw new Error('File upload failed');

//       const fileUrl = await response.text();
//       sendMessage('', fileUrl, file.type);
//       setFile(null);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };
//   const handleDownload = async (fileUrl) => {
//     try {
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = fileUrl.split("/").pop(); 
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   };
  

//   return (
//     <div className="flex flex-col w-[600px] h-[600px] p-4 bg-gray-100 mx-auto mt-28 mb-4 rounded-lg shadow-xl border border-gray-300">
//   <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
//     Chat Room {chatId}
//   </h2>

//   <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded-lg shadow-inner border border-gray-200">
//     {messages.length === 0 ? (
//       <p className="text-center text-gray-500">No messages yet.</p>
//     ) : (
//       messages.map((msg, index) => (
//         <div
//           key={index}
//           className={`p-3 rounded-xl max-w-[75%] break-words shadow-md ${
//             msg.senderId === userId
//               ? "bg-blue-500 text-white self-end"
//               : "bg-gray-300 text-black self-start"
//           }`}
//         >
//           {msg.fileUrl ? (
//             msg.fileType.startsWith("image/") ? (
//               <img
//                 src={msg.fileUrl}
//                 alt="Uploaded"
//                 className="w-40 h-auto mt-2 rounded-lg shadow"
//               />
//             ) : (
//               <button
//                 onClick={() => handleDownload(msg.fileUrl)}
//                 className="bg-blue-600 text-white px-3 py-1 mt-2 rounded-lg hover:bg-blue-700"
//               >
//                 {msg.fileType} <Download/>
//               </button>
//             )
//           ) : msg.message.startsWith("Join the video call:") ? (
//             <button
//               onClick={() => handleJoinCall(msg.message.split("roomID=")[1])}
//               className="text-blue-200 underline hover:text-blue-300"
//             >
//               Join meeting now
//             </button>
//           ) : (
//             <p className="text-sm">{msg.message}</p>
//           )}
//           <p className="text-xs text-gray-400 text-right mt-1">
//             {new Date(msg.timestamp).toLocaleTimeString()}
//           </p>
//         </div>
//       ))
//     )}
//   </div>

//   {showEmojiPicker && (
//     <div className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg border border-gray-200">
//       <EmojiPicker onEmojiClick={handleEmojiSelect} />
//     </div>
//   )}

//   <div className="flex items-center mt-4 relative bg-white rounded-lg border border-gray-300 p-2 shadow-md">
//     <button
//       onClick={() => setShowEmojiPicker((prev) => !prev)}
//       className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
//     >
//       <Smile size={20} />
//     </button>

//     <input
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       placeholder="Type a message..."
//       className="flex-grow p-2 border-none focus:outline-none bg-transparent"
//     />

//     <label
//       htmlFor="file-upload"
//       className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300"
//     >
//       <Paperclip size={20} />
//     </label>
//     <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />

//     <button
//       onClick={() => (file ? uploadFile() : sendMessage(message))}
//       className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//     >
//       Send
//     </button>

//     <button
//       onClick={createVideoCall}
//       className="bg-red-500 text-white px-4 py-2 ml-2 rounded hover:bg-red-600"
//     >
//       <Video size={20} />
//     </button>
//   </div>
// </div>

//   );
// }

// import { useState, useEffect, useRef, useMemo } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import { Client } from "@stomp/stompjs"
// import EmojiPicker from "emoji-picker-react"
// import { Smile, Video, Paperclip, Download, X } from "lucide-react"
// import { useAuth } from "../../../contexts/AuthContexts"
// import BASE_URL from "../../../api/BaseUrl"

// export default function ChatRoom() {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const { userRole } = useAuth()
//   const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state])

//   const clientRef = useRef(null)
//   const [messages, setMessages] = useState([])
//   const [message, setMessage] = useState("")
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false)
//   const [file, setFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState(null)

//   useEffect(() => {
//     const fetchPreviousMessages = async () => {
//       try {
//         if (!chatId) return
//         const token = localStorage.getItem("token")

//         const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         })
//         if (!response.ok) throw new Error("Failed to fetch chat history")

//         const data = await response.json()
//         setMessages(data)
//       } catch (error) {
//         console.error("Error fetching chat history:", error)
//       }
//     }

//     fetchPreviousMessages()
//   }, [chatId])

//   useEffect(() => {
//     if (!chatId || !userId || !receiverId || !senderType) {
//       console.error("Missing chatId, userId, receiverId, or senderType")
//       return
//     }

//     if (clientRef.current) {
//       console.log("WebSocket already active. Skipping reactivation.")
//       return
//     }

//     const stompClient = new Client({
//       brokerURL: "ws://localhost:8080/ws/websocket",
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket")

//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body)
//           setMessages((prev) => [...prev, receivedMessage])
//         })

//         clientRef.current = stompClient

//         return () => subscription.unsubscribe()
//       },
//       onStompError: (frame) => {
//         console.error("WebSocket Error:", frame.headers["message"], frame.body)
//       },
//     })

//     stompClient.activate()

//     return () => {
//       console.log("Disconnecting WebSocket...")
//       clientRef.current = null
//       stompClient.deactivate()
//     }
//   }, [chatId, userId, receiverId, senderType])

//   const sendMessage = (msgContent, fileUrl = "", fileType = "") => {
//     if (clientRef.current && (msgContent.trim() !== "" || fileUrl)) {
//       const chatMessage = {
//         chatId,
//         senderId: userId,
//         receiverId,
//         senderType,
//         message: msgContent,
//         fileUrl,
//         fileType,
//         timestamp: new Date().toISOString(),
//       }

//       clientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(chatMessage),
//         headers: { "content-type": "application/json" },
//       })

//       setMessages([...messages, chatMessage])
//       setMessage("")
//       setFile(null)
//       setPreviewUrl(null)
//     }
//   }

//   const handleEmojiSelect = (emojiObject) => {
//     setMessage((prevMessage) => prevMessage + emojiObject.emoji)
//     setShowEmojiPicker(false)
//   }

//   const createVideoCall = () => {
//     const roomID = `${chatId}-${Date.now()}`
//     const videoCallLink = `${window.location.origin}/video-call?roomID=${roomID}`
//     sendMessage(`Join the video call: ${videoCallLink}`)
//   }

//   const handleJoinCall = (roomID) => {
//     navigate(`/video-call?roomID=${roomID}&role=${userRole}`)
//   }

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0]
//     setFile(selectedFile)

//     if (selectedFile && selectedFile.type.startsWith("image/")) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result)
//       }
//       reader.readAsDataURL(selectedFile)
//     } else {
//       setPreviewUrl(null)
//     }
//   }

//   const uploadFile = async () => {
//     if (!file) return

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       const token = localStorage.getItem("token")
//       const response = await fetch(`${BASE_URL}/api/files/upload`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       })

//       if (!response.ok) throw new Error("File upload failed")

//       const fileUrl = await response.text()
//       sendMessage("", fileUrl, file.type)
//     } catch (error) {
//       console.error("Error uploading file:", error)
//     }
//   }

//   const handleDownload = async (fileUrl) => {
//     try {
//       const response = await fetch(fileUrl)
//       const blob = await response.blob()
//       const link = document.createElement("a")
//       link.href = URL.createObjectURL(blob)
//       link.download = fileUrl.split("/").pop()
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     } catch (error) {
//       console.error("Error downloading file:", error)
//     }
//   }

//   const clearFilePreview = () => {
//     setFile(null)
//     setPreviewUrl(null)
//   }

//   return (
//     <div className="flex flex-col w-[600px] h-[600px] p-4 bg-gray-100 mx-auto mt-28 mb-4 rounded-lg shadow-xl border border-gray-300">
//       <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Chat Room {chatId}</h2>

//       <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded-lg shadow-inner border border-gray-200">
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-500">No messages yet.</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-3 rounded-xl max-w-[75%] break-words shadow-md ${
//                 msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
//               }`}
//             >
//               {msg.fileUrl ? (
//                 msg.fileType.startsWith("image/") ? (
//                   <div className="relative group">
//                     <img
//                       src={msg.fileUrl || "/placeholder.svg"}
//                       alt="Uploaded"
//                       className="w-40 h-auto mt-2 rounded-lg shadow cursor-pointer"
//                       onClick={() => window.open(msg.fileUrl, "_blank")}
//                     />
//                     <button
//                       onClick={() => handleDownload(msg.fileUrl)}
//                       className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <Download size={16} />
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => handleDownload(msg.fileUrl)}
//                     className="bg-blue-600 text-white px-3 py-1 mt-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//                   >
//                     <span>{msg.fileType.split("/")[1].toUpperCase()}</span>
//                     <Download size={16} />
//                   </button>
//                 )
//               ) : msg.message.startsWith("Join the video call:") ? (
//                 <button
//                   onClick={() => handleJoinCall(msg.message.split("roomID=")[1])}
//                   className="text-blue-200 underline hover:text-blue-300"
//                 >
//                   Join meeting now
//                 </button>
//               ) : (
//                 <p className="text-sm">{msg.message}</p>
//               )}
//               <p className="text-xs text-gray-400 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//             </div>
//           ))
//         )}
//       </div>

//       {showEmojiPicker && (
//         <div className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg border border-gray-200">
//           <EmojiPicker onEmojiClick={handleEmojiSelect} />
//         </div>
//       )}

//       {previewUrl && (
//         <div className="relative mt-2 mb-2">
//           <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
//           <button onClick={clearFilePreview} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       <div className="flex items-center mt-4 relative bg-white rounded-lg border border-gray-300 p-2 shadow-md">
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
//         >
//           <Smile size={20} />
//         </button>

//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-grow p-2 border-none focus:outline-none bg-transparent"
//         />

//         <label htmlFor="file-upload" className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300">
//           <Paperclip size={20} />
//         </label>
//         <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />

//         <button
//           onClick={() => (file ? uploadFile() : sendMessage(message))}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Send
//         </button>

//         <button onClick={createVideoCall} className="bg-red-500 text-white px-4 py-2 ml-2 rounded hover:bg-red-600">
//           <Video size={20} />
//         </button>
//       </div>
//     </div>
//   )
// }


import { useState, useEffect, useRef, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Client } from "@stomp/stompjs"
import EmojiPicker from "emoji-picker-react"
import { Smile, Video, Paperclip, Download, X } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContexts"
import BASE_URL from "../../../api/BaseUrl"

export default function ChatRoom() {
  const navigate = useNavigate()
  const location = useLocation()

  const { userRole } = useAuth()
  const { chatId, userId, receiverId, senderType } = useMemo(() => location.state || {}, [location.state])

  const clientRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [modalImage, setModalImage] = useState(null)

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        if (!chatId) return
        const token = localStorage.getItem("token")

        const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        if (!response.ok) throw new Error("Failed to fetch chat history")

        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error("Error fetching chat history:", error)
      }
    }

    fetchPreviousMessages()
  }, [chatId])

  useEffect(() => {
    if (!chatId || !userId || !receiverId || !senderType) {
      console.error("Missing chatId, userId, receiverId, or senderType")
      return
    }

    if (clientRef.current) {
      console.log("WebSocket already active. Skipping reactivation.")
      return
    }

    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws/websocket",
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket")

        const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
          const receivedMessage = JSON.parse(msg.body)
          setMessages((prev) => [...prev, receivedMessage])
        })

        clientRef.current = stompClient

        return () => subscription.unsubscribe()
      },
      onStompError: (frame) => {
        console.error("WebSocket Error:", frame.headers["message"], frame.body)
      },
    })

    stompClient.activate()

    return () => {
      console.log("Disconnecting WebSocket...")
      clientRef.current = null
      stompClient.deactivate()
    }
  }, [chatId, userId, receiverId, senderType])

  const sendMessage = (msgContent, fileUrl = "", fileType = "") => {
    if (clientRef.current && (msgContent.trim() !== "" || fileUrl)) {
      const chatMessage = {
        chatId,
        senderId: userId,
        receiverId,
        senderType,
        message: msgContent,
        fileUrl,
        fileType,
        timestamp: new Date().toISOString(),
      }

      clientRef.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
        headers: { "content-type": "application/json" },
      })

      setMessages([...messages, chatMessage])
      setMessage("")
      setFile(null)
      setPreviewUrl(null)
    }
  }

  const handleEmojiSelect = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji)
    setShowEmojiPicker(false)
  }

  const createVideoCall = () => {
    const roomID = `${chatId}-${Date.now()}`
    const videoCallLink = `${window.location.origin}/video-call?roomID=${roomID}`
    sendMessage(`Join the video call: ${videoCallLink}`)
  }

  const handleJoinCall = (roomID) => {
    navigate(`/video-call?roomID=${roomID}&role=${userRole}`)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreviewUrl(null)
    }
  }

  const uploadFile = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${BASE_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) throw new Error("File upload failed")

      const fileUrl = await response.text()
      sendMessage("", fileUrl, file.type)
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  const handleDownload = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileUrl.split("/").pop()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading file:", error)
    }
  }

  const clearFilePreview = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  const openImageModal = (imageUrl) => {
    setModalImage(imageUrl)
  }

  const closeImageModal = () => {
    setModalImage(null)
  }

  return (
    <div className="flex flex-col w-[600px] h-[600px] p-4 bg-gray-100 mx-auto mt-28 mb-4 rounded-lg shadow-xl border border-gray-300">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Chat Room {chatId}</h2>

      <div className="flex flex-col flex-grow space-y-2 overflow-y-auto p-4 bg-white rounded-lg shadow-inner border border-gray-200">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-[75%] break-words shadow-md ${
                msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
              }`}
            >
              {msg.fileUrl ? (
                msg.fileType.startsWith("image/") ? (
                  <div className="relative group">
                    <img
                      src={msg.fileUrl || "/placeholder.svg"}
                      alt="Uploaded"
                      className="w-40 h-auto mt-2 rounded-lg shadow cursor-pointer"
                      onClick={() => openImageModal(msg.fileUrl)}
                    />
                    <button
                      onClick={() => handleDownload(msg.fileUrl)}
                      className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDownload(msg.fileUrl)}
                    className="bg-blue-600 text-white px-3 py-1 mt-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <span>{msg.fileType.split("/")[1].toUpperCase()}</span>
                    <Download size={16} />
                  </button>
                )
              ) : msg.message.startsWith("Join the video call:") ? (
                <button
                  onClick={() => handleJoinCall(msg.message.split("roomID=")[1])}
                  className="text-blue-200 underline hover:text-blue-300"
                >
                  Join meeting now
                </button>
              ) : (
                <p className="text-sm">{msg.message}</p>
              )}
              <p className="text-xs text-gray-400 text-right mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
          ))
        )}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <div className="max-w-4xl max-h-4xl relative">
            <img src={modalImage || "/placeholder.svg"} alt="Full size" className="max-w-full max-h-full rounded-lg" />
            <button onClick={closeImageModal} className="absolute top-4 right-4 bg-white text-black rounded-full p-2">
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {showEmojiPicker && (
        <div className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg border border-gray-200">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}

      {previewUrl && (
        <div className="relative mt-2 mb-2">
          <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
          <button onClick={clearFilePreview} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center mt-4 relative bg-white rounded-lg border border-gray-300 p-2 shadow-md">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
        >
          <Smile size={20} />
        </button>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border-none focus:outline-none bg-transparent"
        />

        <label htmlFor="file-upload" className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300">
          <Paperclip size={20} />
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />

        <button
          onClick={() => (file ? uploadFile() : sendMessage(message))}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Send
        </button>

        <button onClick={createVideoCall} className="bg-red-500 text-white px-4 py-2 ml-2 rounded hover:bg-red-600">
          <Video size={20} />
        </button>
      </div>
    </div>
  )
}

