// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../api/BaseUrl";
// const ChatNotifications = () => {
//   const [chats, setChats] = useState([]);
//   const navigate = useNavigate();
//   const userRole = localStorage.getItem("userRole");
//   const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
// //   const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

//   useEffect(() => {
//     const fetchUnreadMessages = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/files/unread-messages`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Add token to the request
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch unread messages");
//         }

//         const data = await response.json();
//         console.log(data);
//         const groupedChats = data.reduce((acc, message) => {
//           if (!acc[message.chatId]) {
//             acc[message.chatId] = { chatId: message.chatId, messages: [] };
//           }
//           acc[message.chatId].messages.push(message);
//           return acc;
//         }, {});
//         setChats(Object.values(groupedChats));
//       } catch (error) {
//         console.error("Error fetching unread messages", error);
//       }
//     };

//     if (token ) {
//       fetchUnreadMessages();
//     }
//   }, [token]);

//   const handleChatClick = (chat) => {
//     if (userRole === "Employer") {
//       navigate(`/employer/chat/${chat.chatId}`, {
//         state: {
//           chatId: chat.chatId,
//           userId: chat.employerId,
//           receiverId: chat.jobseekerId,
//           senderType: userRole,
//         },
//       });
//     } else {
//       navigate(`/chat/${chat.chatId}`, {
//         state: {
//           chatId: chat.chatId,
//           userId: chat.jobseekerId,
//           receiverId: chat.employerId,
//           senderType: "Jobseeker",
//         },
//       });
//     }
//   };

//   return (
//     <div className="p-4 mt-24">
//       <h2 className="text-lg font-bold mb-4">Unread Chats</h2>
//       {chats.length === 0 ? (
//         <p>No new messages</p>
//       ) : (
//         chats.map((chat) => (
//           <div
//             key={chat.chatId}
//             className="p-4 mb-2 cursor-pointer border border-gray-300 rounded hover:bg-gray-100"
//             onClick={() => handleChatClick(chat)}
//           >
//             <div className="flex justify-between items-center">
//               <span>Chat {chat.chatId}</span>
//               <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">{chat.messages.length} New</span>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ChatNotifications;

import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/BaseUrl";

const ChatNotifications = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/files/unread-messages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to the request
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch unread messages");
        }

        const data = await response.json();
        console.log(data);
        const groupedChats = data.reduce((acc, message) => {
          if (!acc[message.chatId]) {
            acc[message.chatId] = { chatId: message.chatId, messages: [] };
          }
          acc[message.chatId].messages.push(message);
          return acc;
        }, {});
        setChats(Object.values(groupedChats));
      } catch (error) {
        console.error("Error fetching unread messages", error);
      }
    };

    if (token) {
      fetchUnreadMessages();
    }
  }, [token]);

  const handleChatClick = (chat) => {
    const senderId = chat.messages[0]?.senderId; 
  const receiverId = chat.messages[0]?.receiverId; 
    const senderType = userRole;
    if (!chat.chatId || !receiverId || !senderId) {
        console.error("Missing chat details:", { chatId: chat.chatId, senderId, receiverId });
        return;
      }
    
    if (userRole === "employer") {
      navigate(`/employer/chat/${chat.chatId}`, {
        state: {
          chatId: chat.chatId,
          userId: receiverId, // Swap senderId and receiverId
          receiverId: senderId,
          senderType: senderType,
        },
      });
    } else {
      navigate(`/chat/${chat.chatId}`, {
        state: {
          chatId: chat.chatId,
          userId: receiverId, // Swap senderId and receiverId
          receiverId: senderId,
          senderType: "Jobseeker",
        },
      });
    }
  };

  return (
    <div className="p-4 mt-24">
      <h2 className="text-lg font-bold mb-4">Unread Chats</h2>
      {chats.length === 0 ? (
        <p>No new messages</p>
      ) : (
        chats.map((chat) => (
            
          <div
          
            key={chat.chatId}
            className="p-4 mb-2 cursor-pointer border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => handleChatClick(chat)}
          >
            <div className="flex justify-between items-center">
              <span>Chat {chat.chatId}</span>
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">{chat.messages.length} New</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatNotifications;
