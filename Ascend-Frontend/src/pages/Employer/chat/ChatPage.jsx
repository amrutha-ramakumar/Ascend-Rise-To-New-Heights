// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import BASE_URL from "../../../api/BaseUrl";

// export default function ChatPage() {
//   const { applicationId } = useParams(); // Get the applicationId from the route
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMessages();
//   }, [applicationId]);

//   const fetchMessages = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/chats/${applicationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch chat messages.");
//       }

//       const data = await response.json();
//       setMessages(data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setError("Failed to load chat messages.");
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/chats/${applicationId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: newMessage }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message.");
//       }

//       const savedMessage = await response.json();
//       setMessages((prev) => [...prev, savedMessage]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setError("Failed to send message.");
//     }
//   };

//   return (
//     <div className="container mx-auto mt-20 px-4 py-8 max-w-full">
//       <h1 className="text-2xl font-bold mb-4">Chat with Applicant</h1>
//       <div className="chat-window border rounded-lg shadow-lg p-4">
//         <div className="messages overflow-y-auto max-h-96">
//           {messages.length > 0 ? (
//             messages.map((msg) => (
//               <div key={msg.id} className="message mb-2">
//                 <p>
//                   <strong>{msg.senderName}:</strong> {msg.content}
//                 </p>
//                 <span className="text-xs text-gray-500">{msg.timestamp}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No messages yet.</p>
//           )}
//         </div>
//         <div className="message-input mt-4">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="border rounded-lg w-full p-2"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//       {error && (
//         <div className="text-red-500 mt-2">
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import BASE_URL from "../../../api/BaseUrl";

// export default function ChatPage() {
//   const { applicationId } = useParams(); // Get the applicationId from the route
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMessages();
//   }, [applicationId]);

//   const fetchMessages = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/chats/${applicationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch messages");
//       }

//       const data = await response.json();
//       setMessages(data.messages); // assuming the response structure contains 'messages'
//     } catch (error) {
//       setError("Failed to load messages. Please try again."+error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/chats/${applicationId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: newMessage }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       setNewMessage(""); // Clear input after sending
//       fetchMessages(); // Refresh messages after sending
//     } catch (error) {
//       setError("Failed to send message. Please try again."+error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8 px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-6">Chat with Candidate</h1>
//       {error && <p className="text-red-600">{error}</p>}
      
//       <div className="bg-white shadow-lg rounded-lg p-4 space-y-4">
//         <div className="messages overflow-y-scroll max-h-80 mb-4">
//           {messages.length === 0 ? (
//             <p>No messages yet. Start the conversation!</p>
//           ) : (
//             messages.map((message, index) => (
//               <div key={index} className="message">
//                 <p><strong>{message.sender}: </strong>{message.text}</p>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="input-section flex items-center">
//           <input
//             type="text"
//             className="border w-full p-2 rounded-lg mr-4"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import BASE_URL from "../../../api/BaseUrl";
// import PropTypes from "prop-types";
// const ChatPage = ({ applicationId }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Replace with your backend base URL

//   // Fetch messages or create a chat dynamically
//   const fetchMessages = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/chats/${applicationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch messages");
//       }

//       const data = await response.json();
//       setMessages(data.messages || []); // Initialize with empty messages if no chat exists
//     } catch (error) {
//       setError("Failed to load messages. Please try again. " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle sending a new message
//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/chats/${applicationId}/messages`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ text: newMessage }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       const message = await response.json();
//       setMessages((prevMessages) => [...prevMessages, message]);
//       setNewMessage(""); // Clear the input field
//     } catch (error) {
//       setError("Failed to send the message. Please try again."+error);
//     }
//   };

//   // Load messages when the component mounts
//   useEffect(() => {
//     fetchMessages();
//   }, [applicationId]);

//   return (
//     <div className="chat-page container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Chat</h2>

//       {loading && <p>Loading messages...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Messages Display */}
//       <div className="messages overflow-y-scroll max-h-80 mb-4 p-2 border border-gray-300 rounded">
//         {messages.length === 0 ? (
//           <p>No messages yet. Start the conversation!</p>
//         ) : (
//           messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message p-2 mb-2 rounded ${
//                 message.sender === "employer" ? "bg-blue-100" : "bg-green-100"
//               }`}
//             >
//               <p>
//                 <strong>{message.sender}: </strong>
//                 {message.text}
//               </p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* New Message Input */}
//       <div className="new-message flex items-center">
//         <input
//           type="text"
//           className="flex-1 border border-gray-300 p-2 rounded mr-2"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button
//           className="bg-blue-500 text-white p-2 rounded"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };
// ChatPage.propTypes = {
//     applicationId: PropTypes.number.isRequired,
//   };
// export default ChatPage;


// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import BASE_URL from "../../../api/BaseUrl";

// export default function ChatPage() {
//   const { chatId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [sender, setSender] = useState("employer");  // Or "applicant" depending on who is logged in

//   useEffect(() => {
//     fetchMessages();
//   }, [chatId]);

//   const fetchMessages = async () => {
//     const token = localStorage.getItem("token");
//     const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setMessages(data);
//     }
//   };
// console.log(setSender);
//   const sendMessage = async () => {
//     const token = localStorage.getItem("token");

//     const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ sender, message }),
//     });

//     if (response.ok) {
//       const newMessage = await response.json();
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage("");  // Clear input field
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8 px-4 py-8 max-w-full">
//       <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Chat</h1>
//       <div className="bg-white p-4 rounded-lg shadow-lg">
//         <div className="messages overflow-auto max-h-96">
//           {messages.map((msg) => (
//             <div key={msg.id} className={`message ${msg.sender === "employer" ? "text-blue-600" : "text-green-600"}`}>
//               <strong>{msg.sender}:</strong> {msg.message}
//             </div>
//           ))}
//         </div>
//         <div className="mt-4">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             placeholder="Type your message..."
//           ></textarea>
//           <button onClick={sendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded-lg">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../api/BaseUrl";

export default function ChatPage() {
  const { chatId } = useParams(); // Get the chatId from the route parameters
  const [messages, setMessages] = useState([]); // Store the list of messages
  const [message, setMessage] = useState(""); // Store the input message content
  const [sender, setSender] = useState("employer"); // Set sender type ("employer" or "applicant")

  // Fetch messages when the component mounts or chatId changes
  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  // Function to fetch messages
  const fetchMessages = async () => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage
    try {
      const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        // No messages exist
        setMessages([]); // Set messages to an empty array
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setMessages(data); // Set the fetched messages
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
console.log(setSender);
  // Function to send a new message
  const sendMessage = async () => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    try {
      const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender, message }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessage]); // Append the new message
        setMessage(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4 py-8 max-w-full">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Chat</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {/* Message Display Section */}
        <div className="messages overflow-auto max-h-96">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message mb-2 ${
                  msg.sender === "employer" ? "text-blue-600" : "text-green-600"
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))
          )}
        </div>

        {/* Input Section for Sending Messages */}
        <div className="mt-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Update message state on input change
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Type your message..."
          ></textarea>
          <button
            onClick={sendMessage} // Trigger sendMessage function on click
            className="mt-2 bg-blue-500 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
