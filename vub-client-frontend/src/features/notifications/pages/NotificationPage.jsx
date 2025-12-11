import { ArrowLeftOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import {useVub} from "../../main/hooks/useVub.jsx";

export const NotificationPage = () => {
  const navigate = useNavigate();

  const { data } = useVub({
    enabled: true,
    refetchInterval: 5000,
  });

  return (
    <div style={{ paddingBottom: 45 }}>
      <Flex
        justify="space-between"
        style={{
          backgroundColor: "#ec5f0e",
          padding: "35px 20px 20px 20px",
          color: "#fff",
          fontSize: 25,
        }}
      >
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
      </Flex>

      <Flex style={{ padding: "10px" }} vertical>
        <h2>Oznámenia</h2>

        <Flex vertical gap={5}>
          {data?.notifications
            ?.sort((a, b) => new Date(b.date) - new Date(a.date))
            ?.map((item) => {
              return <NotificationCard notification={item} key={item?._id} />;
            })}
        </Flex>
      </Flex>
    </div>
  );
};

const NotificationCard = ({ notification }) => {
  return (
    <div
      style={{
        border: "1px solid #eaeaea",
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
