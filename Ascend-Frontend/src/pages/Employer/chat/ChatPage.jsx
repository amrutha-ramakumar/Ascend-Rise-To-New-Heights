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



import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import BASE_URL from "../../../api/BaseUrl"

export default function EmployerChatPage() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation();
  const name = location.state?.name || "Unknown";
  const startVideoCall = async () => {
    const roomID = chatId
    const token = localStorage.getItem("token")
    try {
      await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: `Join the video call: /video-call?roomID=${roomID}` }),
      })

      // Fetch messages to update the chat
      fetchMessages()
    } catch (error) {
      console.error("Error sending video call link:", error)
    }
  }

  useEffect(() => {
    fetchMessages()
    const intervalId = setInterval(fetchMessages, 5000)
    return () => clearInterval(intervalId)
  }, []) // Removed unnecessary chatId dependency

  const fetchMessages = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const sendMessage = async () => {
    if (!message.trim()) return
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${BASE_URL}/api/chat/${chatId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })
      if (response.ok) {
        setMessage("")
        fetchMessages()
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleJoinCall = (roomID) => {
    navigate(`/video-call?roomID=${roomID}&role=employer`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <header className="bg-black text-white p-4 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-semibold">{name}</h1>
          <button
            onClick={startVideoCall}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Start Video Call
          </button>
        </header>
        <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
          ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "Employer" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                  msg.sender === "jobseeker"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-blue-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content.startsWith("Join the video call:") ? (
                  <button
                    onClick={() => handleJoinCall(msg.content.split("roomID=")[1])}
                    className="text-blue-500 underline"
                  >
                    Join Video Call
                  </button>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            </div>
          ))
        )}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-white p-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white p-2 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

