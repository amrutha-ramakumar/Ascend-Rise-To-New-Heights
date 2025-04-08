

// import { useState, useEffect, useRef, useMemo } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import { Client } from "@stomp/stompjs"
// import EmojiPicker from "emoji-picker-react"
// import { Smile, Video, Paperclip, Download, X } from 'lucide-react'
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
//   const [modalImage, setModalImage] = useState(null)

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

//   const markMessagesAsRead = async (messageIds) => {
//     try {
//       if (!messageIds || messageIds.length === 0) return
      
//       const token = localStorage.getItem("token")
//       await fetch(`${BASE_URL}/api/messages/mark-read`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ messageIds }),
//       })
//     } catch (error) {
//       console.error("Error marking messages as read:", error)
//     }
//   }

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
//       // brokerURL: `ws://localhost:8080/ws/websocket`,
//       brokerURL: `wss://backend.amrutharamakumar.online/ws/websocket`,
//       reconnectDelay: 5000,
//       debug: (str) => console.log(str),
//       onConnect: () => {
//         console.log("Connected to WebSocket")

//         const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
//           const receivedMessage = JSON.parse(msg.body)
//           setMessages((prev) => [...prev, receivedMessage])
          
//           // Mark the message as read if it's from the other user
//           if (receivedMessage.senderId !== userId) {
//             markMessagesAsRead([receivedMessage.id])
//           }
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

//   useEffect(() => {
//     // Find unread messages that are not from the current user
//     const unreadMessages = messages.filter(msg => 
//       !msg.isRead && msg.senderId !== userId
//     )
    
//     if (unreadMessages.length > 0) {
//       const messageIds = unreadMessages.map(msg => msg.id)
//       markMessagesAsRead(messageIds)
      
//       // Update local state to mark messages as read
//       setMessages(prevMessages => 
//         prevMessages.map(msg => 
//           messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
//         )
//       )
//     }
//   }, [messages, userId])

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

//   const openImageModal = (imageUrl) => {
//     setModalImage(imageUrl)
//   }

//   const closeImageModal = () => {
//     setModalImage(null)
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
//                       onClick={() => openImageModal(msg.fileUrl)}
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
              
//               <div className="flex justify-between items-center mt-1">
//                 <p className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//                 {msg.senderId === userId && (
//                   <span className="text-xs ml-2">
//                     {msg.isRead ? (
//                       <span className="text-blue-200">Read</span>
//                     ) : (
//                       <span className="text-gray-300">Sent</span>
//                     )}
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Image Modal */}
//       {modalImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={closeImageModal}
//         >
//           <div className="max-w-4xl max-h-4xl relative">
//             <img src={modalImage || "/placeholder.svg"} alt="Full size" className="max-w-full max-h-full rounded-lg" />
//             <button onClick={closeImageModal} className="absolute top-4 right-4 bg-white text-black rounded-full p-2">
//               <X size={24} />
//             </button>
//           </div>
//         </div>
//       )}

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
import { Smile, Video, Paperclip, Download, X } from 'lucide-react'
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

  const markMessagesAsRead = async (messageIds) => {
    try {
      if (!messageIds || messageIds.length === 0) return
      
      const token = localStorage.getItem("token")
      await fetch(`${BASE_URL}/api/files/mark-read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageIds }),
      })
    } catch (error) {
      console.error("Error marking messages as read:", error)
    }
  }

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
      brokerURL: `ws://localhost:8080/ws/websocket`,
      // brokerURL: `wss://backend.amrutharamakumar.online/ws/websocket`,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket")

        const subscription = stompClient.subscribe(`/user/${userId}/queue/messages/${chatId}`, (msg) => {
          const receivedMessage = JSON.parse(msg.body)
          setMessages((prev) => [...prev, receivedMessage])
          
          // Mark the message as read if it's from the other user
          if (receivedMessage.senderId !== userId) {
            markMessagesAsRead([receivedMessage.id])
          }
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

  useEffect(() => {
    // Find unread messages that are not from the current user
    const unreadMessages = messages.filter(msg => 
      !msg.isRead && msg.senderId !== userId
    )
    
    if (unreadMessages.length > 0) {
      const messageIds = unreadMessages.map(msg => msg.id)
      markMessagesAsRead(messageIds)
      
      // Update local state to mark messages as read
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
        )
      )
    }
  }, [messages, userId])

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
              
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                {msg.senderId === userId && (
                  <span className="text-xs ml-2">
                    {msg.isRead ? (
                      <span className="text-blue-200">Read</span>
                    ) : (
                      <span className="text-gray-300">Sent</span>
                    )}
                  </span>
                )}
              </div>
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