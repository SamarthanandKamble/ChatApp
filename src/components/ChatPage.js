import React, { useEffect, useState } from "react";
import client, {
  databases,
  REACT_APP_DATABASE_ID,
  REACT_APP_MESSAGES_COLLECTION_ID,
  ID,
} from "../utils/appwriteConfig";

import { Trash2 } from "react-feather";

const ChatPage = () => {
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
    try {
      e.preventDefault();
      let payload = {
        body: messageBody,
      };

      const response = await databases.createDocument(
        REACT_APP_DATABASE_ID,
        REACT_APP_MESSAGES_COLLECTION_ID,
        ID.unique(),
        payload
      );
      setMessageBody("");
    } catch (error) {
      console.warn(error);
    }
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
    <div className="w-8/12 mx-auto p-4 bg-black text-white">
      <form onSubmit={handleFormSubmit} className="w-6/12  mx-auto">
        <input
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          maxLength="2000"
          className="text-black mx-auto w-8/12"
        />
        <button type="submit" className="w-3/12 bg-red-400">
          Send
        </button>
      </form>
      {messages && (
        <div className="border w-6/12 mx-auto mt-4 pr-4">
          {messages.map((message) => (
            <div
              key={message.$id}
              className="flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span>{new Date(message.$createdAt).toLocaleString()}</span>
                <span>{message.body}</span>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => handleDeleteMessage(message.$id)}
              >
                <Trash2 size={16} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatPage;
