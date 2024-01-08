import React, { useEffect, useState, useRef } from "react";
import client, {
  databases,
  ID,
  Permission,
  Role,
} from "../utils/appwriteConfig";
import { Trash2 } from "react-feather";
import { useUserAuth } from "../utils/Hooks/useUserAuth";
import Navbar from "./Navbar";

const ChatPage = () => {
  const { user } = useUserAuth();
  const chatWindow = useRef(null);
  const inputField = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
    const unsubscribe = client.subscribe(
      `databases.${process.env.REACT_APP_DATABASE_ID}.collections.${process.env.REACT_APP_MESSAGES_COLLECTION_ID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prevState) => [...prevState, response?.payload]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((prevState) =>
            prevState.filter(
              (message) => message.$id !== response?.payload?.$id
            )
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      process.env.REACT_APP_DATABASE_ID,
      process.env.REACT_APP_MESSAGES_COLLECTION_ID
    );
    setMessages(response.documents);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (messageBody.length > 0) {
        let payload = {
          user_id: user.$id,
          user_name: user.name,
          body: messageBody,
        };

        const response = await databases.createDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_MESSAGES_COLLECTION_ID,
          ID.unique(),
          payload,
          [Permission.delete(Role.user(user.$id))]
        );

        if (chatWindow.current && response) {
          chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
        }
      } else {
        return;
      }
    } catch (error) {
      console.warn(error);
    }
    setMessageBody("");
  };

  const handleDeleteMessage = async (id) => {
    try {
      await databases.deleteDocument(
        `${process.env.REACT_APP_DATABASE_ID}`,
        `${process.env.REACT_APP_MESSAGES_COLLECTION_ID}`,
        id
      );
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="w-full sm:w-1/2 h-[100vh] sm:min-h-[100vh] mx-auto p-2 bg-black text-white relative border">
      <Navbar />
      {messages && (
        <div
          className="w-11/12 mx-auto mt-4 pr-4 h-[30rem] sm:h-[30rem] lg:h-[30rem]  overflow-y-auto border"
          ref={chatWindow}
        >
          {messages.map((message) => (
            <div
              key={message.$id}
              className="flex flex-wrap justify-between items-center"
            >
              <div className="flex flex-wrap flex-col relative">
                {message.user_name ? (
                  <span className="text-xs absolute w-3/4 top-1 left-2 text-white">
                    {message.user_name}
                  </span>
                ) : (
                  <span className="text-xs absolute top-1 left-2 text-white">
                    Unknown
                  </span>
                )}
                <span
                  className={`text-lg p-2 m-1 rounded-md text-white bg-green-700
                ${
                  message.user_id === user.$id
                    ? "bg-green-800"
                    : " bg-transparent border"
                }`}
                >
                  {message.body}
                </span>
              </div>
              {message?.$permissions.includes(
                `delete(\"user:${user.$id}\")`
              ) && (
                <div
                  className="cursor-pointer"
                  onClick={(e) => handleDeleteMessage(message.$id)}
                >
                  <Trash2 size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleFormSubmit}
        className="w-11/12 mx-auto absolute left-0 right-0 sm:bottom-0 bottom-20"
      >
        <div className="w-full">
          <input
            required
            ref={inputField}
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            maxLength="2000"
            className="text-black mx-auto w-8/12 p-2 focus:outline-none rounded-md"
          />
          <button type="submit" className="w-4/12 p-2 bg-green-700 rounded-md">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
