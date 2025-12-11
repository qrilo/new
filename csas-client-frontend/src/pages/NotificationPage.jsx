import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useBank } from "../features/banks/hooks/useBank.jsx";

export const NotificationPage = () => {
  const navigate = useNavigate();

  const { data: bank } = useBank({
    enabled: true,
    refetchInterval: 5000,
  });

  return (
    <div>
      <div>
        <Flex
          style={{
            padding: "40px 15px",
            height: 200,
            backgroundColor: "#3074ff",
          }}
          justify="space-between"
        >
          <div
            style={{ display: "inline-block" }}
            onClick={() => navigate("/app/main")}
          >
            <ArrowLeftOutlined style={{ fontSize: 24, color: "#fff" }} />
          </div>
          <div style={{ fontWeight: 600, color: "#fff", fontSize: 22 }}>
            Oznámenia
          </div>
        </Flex>

        <Flex
          gap={10}
          style={{ padding: "10px 10px", paddingBottom: "50px" }}
          vertical
        >
          {bank?.notifications?.map((item) => {
            return <NotificationCard notification={item} key={item._id} />;
          })}
        </Flex>
      </div>
    </div>
  );
};

const NotificationCard = ({ notification }) => {
  return (
    <div
      style={{
        padding: 10,
        boxShadow: "box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        borderRadius: 10,
        backgroundColor: "#fff",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 18 }}>{notification?.name}</div>
      <div style={{ fontSize: 16, color: "#808080" }}>
        {notification?.description}
      </div>
      <Flex style={{ color: "#808080" }} justify="end">
        {new Date(notification?.date).toLocaleString("ru-RU")}
      </Flex>
    </div>
  );
};
