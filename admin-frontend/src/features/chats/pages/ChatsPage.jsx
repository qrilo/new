import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useChats } from "../hooks/useChats";
import { useCreateChat } from "../hooks/useCreateChat";

export const ChatsPage = () => {
  const { id } = useParams();

  const { data: chats } = useChats({
    receiverId: id,
    enabled: true,
    refetchInterval: 2000,
  });

  const { mutate: createChatMessage } = useCreateChat();

  const [messages, setMessages] = useState(chats?.messages);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages(chats?.messages);
  }, [chats]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMessage = {
      id: crypto.randomUUID(),
      message: text,
      senderRole: "User",
    };

    createChatMessage({
      message: text,
      receiverId: id,
    });

    setMessages((prev) => [...prev, newMessage]);
    setText("");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.messages}>
        {messages?.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.messageRow,
              justifyContent:
                msg.senderRole === "Bank" ? "flex-start" : "flex-end",
            }}
          >
            <div
              style={{
                ...styles.messageBubble,
                backgroundColor:
                  msg.senderRole === "Bank" ? "#e5e7eb" : "#3b82f6",
                color: msg.senderRole === "Bank" ? "#000" : "#fff",
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputBar}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите сообщение..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          ➤
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  messageRow: {
    display: "flex",
    width: "100%",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: "0.25rem 1rem",
    borderRadius: "1rem",
    fontSize: "1rem",
  },
  inputBar: {
    display: "flex",
    padding: "0.5rem",
    borderTop: "1px solid #d1d5db",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.7rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
  },
  button: {
    padding: "0.7rem 1rem",
    border: "none",
    borderRadius: "8px",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
