import { Button, Modal, List } from "antd";
import TextArea from "antd/es/input/TextArea.js";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth.jsx";
import { Outlet, useMatch } from "react-router-dom";
import { useChats } from "../../features/chats/hooks/useChats.jsx";
import { useCreateChat } from "../../features/chats/hooks/useCreateChat.jsx";

export const PrivateLayout = () => {
  const { logout } = useAuth();

  // ✅ роутер сам говорит, матчится ли /app/main (и вложенные)
  const mainMatch = useMatch("/app/main/*");
  const showButton = Boolean(mainMatch);

  const { data: serverMessages = { messages: [] } } = useChats({
    refetchInterval: 2000,
    enabled: true,
  });

  const { mutate: createChatMessage } = useCreateChat();

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [message, setMessage] = useState("");
  const messagesContainerRef = useRef(null);

  const toggleChat = () => setIsChatVisible((prev) => !prev);

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    createChatMessage(
      { message: trimmed },
      { onSuccess: () => setMessage("") }
    );
  };

  const formattedMessages = [
    {
      id: "intro",
      senderLabel: "Podpora",
      text: "Ahoj! Ako ti môžeme pomôcť?",
      isMine: false,
    },
    ...(serverMessages?.messages ?? []).map((m) => ({
      id: m.id,
      text: m.message,
      isMine: m.senderRole === "Bank",
      senderLabel: m.senderRole === "Bank" ? "Vy" : "Podpora",
    })),
  ];

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [formattedMessages.length, isChatVisible]);

  return (
    <div>
      <main>
        <Outlet />
      </main>

      {showButton && (
        <Button
          type="primary"
          shape="circle"
          style={{
            height: 60,
            width: 60,
            fontSize: 20,
            position: "fixed",
            bottom: 110,
            right: 20,
            zIndex: 1000,
          }}
          onClick={toggleChat}
        >
          ?
        </Button>
      )}

      <Modal
        title="Chat s podporou"
        open={isChatVisible}
        onCancel={toggleChat}
        footer={null}
        width={400}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            height: "450px",
          },
        }}
      >
        <div
          ref={messagesContainerRef}
          style={{
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            paddingRight: "4px",
          }}
        >
          <List
            dataSource={formattedMessages}
            split={false}
            rowKey={(i) => i.id}
            renderItem={(item) => (
              <List.Item
                style={{
                  display: "flex",
                  justifyContent: item.isMine ? "flex-end" : "flex-start",
                  padding: "2px 0",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "6px 10px",
                    borderRadius: item.isMine
                      ? "16px 16px 0 16px"
                      : "16px 16px 16px 0",
                    backgroundColor: item.isMine ? "#e6f7ff" : "#f5f5f5",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      opacity: 0.7,
                      marginBottom: "2px",
                    }}
                  >
                    {item.senderLabel}
                  </div>
                  <div>{item.text}</div>
                </div>
              </List.Item>
            )}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: "10px",
            gap: "8px",
          }}
        >
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            placeholder="Napíšte správu..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            style={{ flexGrow: 1 }}
          />

          <Button type="primary" onClick={sendMessage}>
            Odoslať
          </Button>
        </div>
      </Modal>
    </div>
  );
};
