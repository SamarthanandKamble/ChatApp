import React, { useEffect, useState, useRef } from "react";
import client, {
  databases,
  REACT_APP_DATABASE_ID,
  REACT_APP_MESSAGES_COLLECTION_ID,
  ID,
  Permission,
  Role,
} from "../utils/appwriteConfig";
import { Trash2 } from "react-feather";
import { useUserAuth } from "../utils/Hooks/useUserAuth";

const ChatPage = () => {
  const { user } = useUserAuth();
  const chatWindow = useRef(null);
  const inputField = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
    const unsubscribe = client.subscribe(
      `databases.${REACT_APP_DATABASE_ID}.collections.${REACT_APP_MESSAGES_COLLECTION_ID}.documents`,
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
      REACT_APP_DATABASE_ID,
      REACT_APP_MESSAGES_COLLECTION_ID
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
        console.log("payload", payload);

        const response = await databases.createDocument(
          REACT_APP_DATABASE_ID,
          REACT_APP_MESSAGES_COLLECTION_ID,
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
      const response = await databases.deleteDocument(
        REACT_APP_DATABASE_ID,
        REACT_APP_MESSAGES_COLLECTION_ID,
        id
      );
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="w-12/12 min-h-svh mx-auto p-2 bg-black text-white relative">
      {messages && (
        <div
          className="w-11/12 mx-auto mt-4 pr-4 max-h-96 overflow-y-auto"
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
                <span className="text-lg p-2 m-1 rounded-md text-white bg-green-700">
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
        className="w-11/12 mx-auto mt-6 absolute left-0 right-0 bottom-20"
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
