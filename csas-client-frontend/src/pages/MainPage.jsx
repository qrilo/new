import {
  CreditCardOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AccountCard } from "../features/accounts/components/AccountCard";
import { useBank } from "../features/banks/hooks/useBank.jsx";

export const MainPage = () => {
  const navigate = useNavigate();

  const { data: bank } = useBank({
    enabled: true,
    refetchInterval: 5000,
  });

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div
        style={{
          height: 150,
          backgroundColor: "#2F74FF",
          padding: "40px 15px",
        }}
      >
        <Flex justify="end">
          <Flex gap={25}>
            <SearchOutlined
              style={{ fontSize: 24, color: "#fff" }}
              onClick={() => navigate("/app/loader")}
            />
            <CreditCardOutlined
              style={{ fontSize: 24, color: "#fff" }}
              onClick={() => navigate("/app/loader")}
            />
            <Badge count=" " offset={[0, 4]} size="small">
              <UserOutlined
                style={{ fontSize: 24, color: "#fff", cursor: "pointer" }}
                onClick={() => navigate("/app/notifications")}
              />
            </Badge>
          </Flex>
        </Flex>
        <Flex>
          <Typography.Title level={3} style={{ color: "#fff" }}>
            Přehled
          </Typography.Title>
        </Flex>
        <Flex gap={10}>
          {bank?.expenses?.map((item, index) => {
            return <ExpenseCard key={index} expense={item} />;
          })}
        </Flex>
      </div>

      <Flex style={{ padding: "0 15px", marginTop: 70 }}>
        <Typography.Title
          level={3}
          style={{ color: "#0E2C5B", fontWeight: 500 }}
        >
          Vaše produkty
        </Typography.Title>
      </Flex>

      <Flex vertical gap={10} style={{ padding: "0 15px" }}>
        {bank?.accounts?.map((item, index) => {
          return (
            <AccountCard
              key={index}
              account={item}
              isLast={bank?.accounts?.length == index + 1}
            />
          );
        })}
      </Flex>

      <Flex
        justify="space-around"
        style={{
          borderTop: "2px solid #eaeaea",
          padding: "10px 0 30px  0",
          height: 100,
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          color: "#a2a2a2ff",
          fontWeight: 500,
          zIndex: 1000,
        }}
      >
        <Flex
          style={{ height: 58 }}
          justify="space-between"
          vertical
          align="center"
          onClick={() => navigate("/app/loader")}
        >
          <Flex style={{ height: "100%" }} align="center" justify="center">
            <div style={{ height: 20, width: 20 }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
                <g fill="#808080">
                  <path d="M43.1867625,37.3231687 C43.1867625,45.6916687 36.37795,52.5000437 28.00945,52.5000437 L28.00945,52.5000437 L28.00945,47.7072312 C33.73545,47.7072312 38.39395,43.0491687 38.39395,37.3231687 L38.39395,37.3231687 Z M27.9904625,3.49986875 C36.3589625,3.49986875 43.1673375,10.3082438 43.1673375,18.6767438 C43.1673375,27.0452438 36.3589625,33.8536188 27.9904625,33.8536188 C19.621525,33.8536188 12.8135875,27.0452438 12.8135875,18.6767438 C12.8135875,10.3082438 19.621525,3.49986875 27.9904625,3.49986875 Z M27.9904625,8.29268125 C22.2644625,8.29268125 17.6059625,12.9511813 17.6059625,18.6767438 C17.6059625,24.4027438 22.2644625,29.0608063 27.9904625,29.0608063 C33.716025,29.0608063 38.374525,24.4027438 38.374525,18.6767438 C38.374525,12.9511813 33.716025,8.29268125 27.9904625,8.29268125 Z" />
                </g>
              </svg>
            </div>
          </Flex>
          <div>Prehled</div>
        </Flex>

        <Flex
          style={{ height: 58 }}
          justify="space-between"
          vertical
          align="center"
          onClick={() => navigate("/app/loader")}
        >
          <div style={{ height: 30, width: 30 }}>
            <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 32 A16 16 0 0 1 42 32"
                fill="none"
                stroke="#9FA4AF"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M17 34 A13 13 0 0 1 39 34"
                fill="none"
                stroke="#9FA4AF"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M20 36 A10 10 0 0 1 36 36"
                fill="none"
                stroke="#9FA4AF"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle cx="28" cy="40" r="2.6" fill="#9FA4AF" />
            </svg>
          </div>

          <div>FIT</div>
        </Flex>

        <Flex
          style={{ height: 58 }}
          justify="space-between"
          vertical
          align="center"
          onClick={() => navigate("/app/loader")}
        >
          <div style={{ height: 30, width: 30 }}>
            <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
              <polyline
                points="10,38 20,26 28,32 36,18 46,28"
                fill="none"
                stroke="#9FA4AF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="10" cy="38" r="2.4" fill="#9FA4AF" />
              <circle cx="46" cy="28" r="2.4" fill="#9FA4AF" />
            </svg>
          </div>

          <div>Investice</div>
        </Flex>

        <Flex
          style={{ height: 58 }}
          justify="space-between"
          vertical
          align="center"
          onClick={() => navigate("/app/loader")}
        >
          <div style={{ height: 30, width: 30 }}>
            <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="22" r="3.5" fill="#9FA4AF" />
              <circle cx="34" cy="22" r="3.5" fill="#9FA4AF" />
              <circle cx="22" cy="34" r="3.5" fill="#9FA4AF" />
              <circle cx="34" cy="34" r="3.5" fill="#9FA4AF" />
            </svg>
          </div>
          <div>Extra</div>
        </Flex>

        <Flex
          style={{ height: 58 }}
          justify="space-between"
          vertical
          align="center"
          onClick={() => navigate("/app/contacts")}
        >
          <div style={{ height: 30, width: 30 }}>
            <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="16"
                y="18"
                width="24"
                height="16"
                rx="3"
                ry="3"
                fill="none"
                stroke="#9FA4AF"
                stroke-width="2"
              />

              <polyline
                points="26,34 28,38 30,34"
                fill="none"
                stroke="#9FA4AF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div>Kontakty</div>
        </Flex>
      </Flex>
    </div>
  );
};

const ExpenseCard = ({ expense }) => {
  const [integerPart, decimalPart] = expense?.amount?.toFixed(2).split(".");

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/app/loader")}
      style={{
        position: "relative",
        backgroundColor: "#fff",
        padding: "5px 10px",
        width: 200,
        height: 100,
        borderRadius: "10px",
        color: "#0E2C5B",
      }}
    >
      <Flex justify="space-beetwen">
        <div
          style={{
            fontSize: "18px",
            fontWeight: 600,
            width: "90px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {expense?.name}
        </div>
      </Flex>

      <div style={{ fontSize: 18, fontWeight: 600 }}>
        <Flex style={{ color: "black", fontWeight: 500 }}>
          <div style={{ fontSize: 26 }}>{integerPart?.toLocaleString()},</div>
          <div>{decimalPart}</div>
          <div style={{ fontSize: 26, marginLeft: 2 }}>Kč </div>
        </Flex>
      </div>

      <div style={{ color: "#676767ff" }}>Rozpocet</div>
    </div>
  );
};
