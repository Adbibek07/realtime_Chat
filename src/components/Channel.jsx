import React, { useEffect, useState, useRef } from "react";
import Message from "./Messages";
import { formatRelative } from "date-fns";

import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const uid = user?.uid;
  const email = user?.email;
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  const bottomRef = useRef();
  useEffect(() => {
    if (!db) return;

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(100),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMessages(data);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return unsubscribe;
  }, [db]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!db) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      });

      setNewMessage(""); // optional clear input
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 gap-2 text-stone-300 dark:text-stone-700 py-16">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-sm">No messages yet. Say hello!</p>
          </div>
        )}

        {messages.map((message, i) => {
          const isOwn = message.uid === uid;
          const showMeta = i === 0 || messages[i - 1].uid !== message.uid;

          return (
            <div
              key={message.id}
              className={`flex items-end gap-2.5 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar — only on first message in a group */}
              {showMeta ? (
                <img
                  src={
                    message.photoURL ||
                    `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${message.email}`
                  }
                  alt={message.displayName}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-stone-200 dark:border-stone-700 self-start mt-1"
                />
              ) : (
                <div className="w-8 flex-shrink-0" />
              )}

              <div
                className={`flex flex-col gap-1 max-w-[65%] min-w-0 ${isOwn ? "items-end" : "items-start"}`}
              >
                {/* Name + time */}
                {showMeta && (
                  <div
                    className={`flex items-center gap-1.5 px-1 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="text-[11px] font-medium text-stone-400 dark:text-stone-500">
                      {isOwn ? "You" : message.displayName}
                    </span>
                    {message.createdAt?.seconds && (
                      <span className="text-[10px] text-stone-300 dark:text-stone-600">
                        {formatRelative(
                          new Date(message.createdAt.seconds * 1000),
                          new Date(),
                        )}
                      </span>
                    )}
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`px-3.5 py-2 rounded-2xl text-sm leading-relaxed max-w-full min-w-0
                  break-all whitespace-pre-wrap
                  ${
                    isOwn
                      ? "bg-stone-500 text-black rounded-tr-sm"
                      : "bg-stone-100 text-stone-800 rounded-tl-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          );
        })}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="px-5 py-3 border-t border-stone-100 flex items-center gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleOnSubmit(e);
            }
          }}
          placeholder="Message.."
          className="flex-1 bg-stone-100  text-stone-800  placeholder-stone-400  text-sm rounded-full px-4 py-2.5 outline-none border border-transparent focus:border-stone-300 dark:focus:border-stone-600 transition-colors"
        />
        <button
          type="button"
          onClick={handleOnSubmit}
          disabled={!newMessage.trim()}
          className="w-9 h-9 rounded-full bg-stone-800 dark:bg-stone-100 flex items-center justify-center flex-shrink-0 disabled:opacity-30 hover:opacity-80 transition-opacity"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`currentColor`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-stone-100 dark:text-stone-900"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Channel;
