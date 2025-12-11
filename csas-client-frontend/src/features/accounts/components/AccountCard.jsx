import { MoreOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { formatNumberWithSpaces } from "../../../../src/shared/utils/numberFormat";

export const AccountCard = ({ account, isLast }) => {
  const navigate = useNavigate();

  const colors = [
    "#F2623A",
    "#E6007E",
    "#007A5E",
    "#F25C19",
    "#2E3192",
    "#28A745",
    "#33A8FF",
  ];

  const [integerPart, decimalPart] = account?.balance?.toFixed(2).split(".");

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  };

  return (
    <Flex
      onClick={() => navigate(`/app/transactions/${account.id}`)}
      vertical
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "100%",
        borderTop: `4px solid ${
          account?.hash ? account.hash : getRandomColor()
        }`,
        padding: "10px 10px",
        marginBottom: isLast ? "110px" : "0px",
      }}
    >
      <Typography.Title
        level={4}
        style={{
          color: "#0E2C5B",
          margin: 0,
          fontWeight: 500,
        }}
      >
        {account?.name}
      </Typography.Title>

      <div style={{ fontSize: 18, fontWeight: 600 }}>
        <Flex style={{ color: "#00923F", fontWeight: 500 }}>
          <div style={{ fontSize: 26 }}>
            {formatNumberWithSpaces(integerPart)},
          </div>
          <div>{decimalPart}</div>
          <div style={{ fontSize: 26, marginLeft: 2 }}>Kč</div>
        </Flex>
      </div>

      <div style={{ color: "#747474ff", fontSize: 18, paddingBottom: 5 }}>
        <div>
          {formatNumberWithSpaces(integerPart)},{decimalPart} Kč vlastni
          prostredky
        </div>
      </div>
      <div style={{ height: 2, borderTop: "1px solid #e0e0e0ff" }}></div>

      <Flex
        style={{
          padding: "10 px 0",
          marginTop: 5,
        }}
        align="center"
        justify="space-between"
      >
        <div
          style={{
            color: "#2F74FF",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          {account?.showNewPayment ? "Nová platba" : " "}
        </div>
        <MoreOutlined style={{ fontSize: 20, color: "#2F74FF" }} />
      </Flex>
    </Flex>
  );
};
