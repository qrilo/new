import { useParams } from "react-router-dom";
import { useAccount } from "../features/accounts/hooks/useAccount";
import { Flex } from "antd";
import {
  WalletOutlined,
  RiseOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const AccountPage = () => {
  const { id } = useParams();

  const { data: account } = useAccount({
    accountId: id,
    refetchInterval: 5000,
    enabled: true,
  });

  const gradientStyle = {
    fontSize: 24,
    color: "rgba(228, 166, 43, 1) ",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  };

  const items = [
    { icon: <WalletOutlined style={gradientStyle} />, label: "Platba" },
    { icon: <RiseOutlined style={gradientStyle} />, label: "História" },
    { icon: <CreditCardOutlined style={gradientStyle} />, label: "Karty" },
    {
      icon: <FileTextOutlined style={gradientStyle} />,
      label: "Trvalé prikazy",
    },
  ];

  return (
    <Flex
      vertical
      style={{
        backgroundColor: "rgb(127, 127, 127)",
      }}
      gap={5}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          height: 200,
          background: `linear-gradient(135deg, rgba(255, 212, 84, 1) 0%, rgba(238, 124, 55, 1) 100%)`,
          color: "#2c2c2c",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          {account?.name}
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, textAlign: "center" }}>
          TRENCSIK PETER
        </div>

        <div style={{ fontSize: 18, fontWeight: 600, textAlign: "center" }}>
          POBNSKBA
        </div>
      </Flex>

      <Flex
        justify="space-around"
        style={{ backgroundColor: "#fff", padding: "15px 10px" }}
      >
        {items.map(({ icon, label }) => (
          <div key={label} style={{ textAlign: "center", cursor: "pointer" }}>
            {icon}
            <div style={{ marginTop: 8, fontSize: 16 }}>{label}</div>
          </div>
        ))}
      </Flex>

      <Flex vertical style={{ backgroundColor: "#fff" }}>
        {account?.transactions?.map((transaction, index) => {
          return <Transaction transaction={transaction} key={index} />;
        })}
      </Flex>
    </Flex>
  );
};

const Transaction = ({ transaction }) => {
  if (!transaction) return;

  return (
    <Flex
      style={{ width: "100%", padding: "10px" }}
      justify="space-between"
      align="center"
    >
      <div style={{ fontSize: 20 }}>Sponibilny zostatok</div>
      <div style={{ fontWeight: 600, fontSize: 24 }}>
        -{transaction.amount} EUR
      </div>
    </Flex>
  );
};
