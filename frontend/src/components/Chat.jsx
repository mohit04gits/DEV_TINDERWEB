// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]); // Ensure it's an array
//   const [newMessage, setNewMessage] = useState("");
//   const user = useSelector((store) => store.user);
//   //console.log(user)
//   const userId = user?._id;
//   const chatUserList = useSelector((store) => store.connections);
//   console.log("Redux connections:", chatUserList);
//   console.log("Target User ID:", targetUserId);

//   const targetUser = chatUserList?.find((u) => u._id === targetUserId);
//   console.log("Target User:", targetUser);
//   useEffect(() => {
//     if (!userId) return;
//     const socket = createSocketConnection();

//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//     });

//     // Listen for incoming messages
//     socket.on("receiveMessage", ({ firstName, text }) => {
//       console.log(firstName + ":" + text);
//       setMessages((messages) => [...messages, { firstName, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     // if (!newMessage.trim()) return;

//     const socket = createSocketConnection();

//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-6/12 mx-auto flex flex-col  my-20 h-[70vh] border  rounded-lg shadow-lg">
//         <div className="w-full bg-gradient-to-r from-slate-500 to-indigo-600 p-4 rounded-t-lg flex items-center gap-3">
//         <img
//           src={targetUser?.photoUrl}
//           alt="User"
//           className="size-12 rounded-full"
//         />
//         <h1 className="text-xl font-semibold text-white">
//           Chat with {targetUser?.firstName || "Unknown"}
//         </h1>
//       </div>
//       <div className="w-full h-5/6 overflow-y-scroll  rounded-lg p-4 ">
//         {messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <div key={index} className="chat chat-start">
//               <div className="chat-header">
//                 {msg.firstName || "User"}
//                 <time className="text-xs opacity-50">Just now</time>
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">Seen</div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400">No messages yet</p>
//         )}
//       </div>
//       <div className="w-full p-2 flex  items-center gap-2 mt-4">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           type="text"
//           className="flex-grow p-2 border rounded-lg"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { time } from "framer-motion";
import moment from "moment";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const chatUserList = useSelector((store) => store.connections) || [];
  const targetUser = chatUserList.find((u) => u._id === targetUserId);
  const timestamp = new Date().toISOString();

  //console.log("Target User:", targetUser);
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
      timestamp,
    });

    socket.on("receiveMessage", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text,timestamp }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-10/12 my-20 md:w-6/12 mx-auto flex flex-col  h-[75vh] border bg-gray-900 rounded-lg shadow-lg">
      {/* Chat Header - Gradient Glass Effect */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-5 rounded-t-lg flex items-center gap-3 shadow-lg">
        <img
          src={targetUser?.photoUrl}
          alt="User"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <h1 className="text-xl font-semibold text-white">
           {targetUser?.firstName || "Unknown"}
        </h1>
      </div>

      {/* Chat Messages Container */}
      <div className="relative flex-1 overflow-y-auto p-4 bg-gray-800 rounded-b-lg">
        {/* Centered Message when no chats */}
        {messages.length === 0 && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-xl font-semibold">
            Chat with {targetUser?.firstName || "Unknown"}
          </p>
        )}

        {/* Messages */}
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-3 ${msg.firstName === user.firstName ? "justify-end" : "justify-start"}`}>
          {console.log(msg)}
            <div
              className={`p-3 rounded-lg shadow-md max-w-[75%] text-white ${
                msg.firstName === user.firstName
                  ? "bg-blue-500 self-end"
                  : "bg-gray-700"
              }`}
            >
              <p className="text-sm font-semibold">{msg.firstName || "User"}</p>
              <p className="text-md">{msg.text}</p>
              <p className="text-xs text-gray-300 mt-1">
                {moment(msg.timestamp).format("hh:mm A")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input Field */}
      <div className="w-full p-3 flex items-center gap-2 bg-gray-900 border-t border-gray-700">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          className="flex-grow p-3 border-none bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

