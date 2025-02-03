import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../api/BaseUrl";

export default function ChatPage() {
  const { chatId } = useParams(); // Get the chatId from the route parameters
  const [messages, setMessages] = useState([]); // Store the list of messages
  const [message, setMessage] = useState(""); // Store the input message content
  const [sender, setSender] = useState("jobseeker"); // Set sender type ("employer" or "applicant")

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
    <div className="container mx-auto mt-12 px-4 py-8 max-w-full">
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
                  msg.sender === "jobseeker" ? "text-blue-600" : "text-green-600"
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
