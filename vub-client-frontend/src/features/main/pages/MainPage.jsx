import {
  DatabaseOutlined,
  MoreOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  PieChartOutlined,
  RiseOutlined,
  StockOutlined,
  RetweetOutlined,
  SwapOutlined,
  HomeOutlined,
  AppstoreAddOutlined,
  WalletOutlined,
  CreditCardOutlined,
  IdcardOutlined,
  SafetyOutlined,
  BankOutlined,
  CalculatorOutlined,
  UserOutlined,
  NotificationOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Badge, Carousel, Flex } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVub } from "../hooks/useVub";
import { PageLoader } from "../../../shared/components/PageLoader";

export const MainPage = () => {
  const navigate = useNavigate();

  const { data, isPending } = useVub({
    enabled: true,
    refetchInterval: 5000,
  });

  const [current, setCurrent] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const menuItems = [
    { name: "Domov", icon: HomeOutlined },
    { name: "Ponuka produktov", icon: AppstoreAddOutlined },
    { name: "Účty", icon: WalletOutlined },
    { name: "Platby", icon: CreditCardOutlined },
    { name: "Karty", icon: IdcardOutlined },
    { name: "Sporenie a vklady", icon: SafetyOutlined },
    { name: "Úvery", icon: BankOutlined },
    { name: "Investície", icon: LineChartOutlined },
    { name: "Menová kalkulačka", icon: CalculatorOutlined },
    { name: "Môj osobný poradca", icon: UserOutlined },
  ];

  return (
    <div style={{ position: "relative", paddingBottom: 30 }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
          pointerEvents: isOpenMenu ? "auto" : "none",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 300,
            height: "100%",
            backgroundColor: "#212121ff",
            boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
            transform: isOpenMenu ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
            zIndex: 1001,
          }}
        >
          <Flex
            vertical
            gap={15}
            style={{
              padding: "35px 20px 20px 20px",
              fontSize: 18,
              color: "#fff",
              fontWeight: 500,
            }}
          >
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Flex
                  key={index}
                  style={{ marginBottom: 10 }}
                  gap={15}
                  onClick={() => navigate("/app/loader")}
                >
                  <IconComponent /> {item.name}
                </Flex>
              );
            })}
          </Flex>
        </div>

        <div
          onClick={() => setIsOpenMenu(false)}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: isOpenMenu ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      <Flex
        justify="space-between"
        style={{
          backgroundColor: "#ec5f0e",
          padding: "35px 20px 20px 20px",
          color: "#fff",
          fontSize: 25,
        }}
      >
        <UnorderedListOutlined onClick={() => setIsOpenMenu(true)} />

        <Badge count=" ">
          <CommentOutlined
            style={{ color: "#fff", fontSize: 25 }}
            onClick={() => {
              if (data?.notifications <= 0) {
                navigate("/app/loader");

                return;
              }
              navigate("/app/notifications");
            }}
          />
        </Badge>
      </Flex>
      <Flex style={{ padding: "25px  25px 0 25px" }}>
        <div>
          <img width={100} src="../../person.png" />
        </div>
        <Flex style={{ marginLeft: 10 }} vertical>
          <p style={{ fontSize: 26, color: "#6e6e6e", margin: "0" }}>
            Vitajte späť,
          </p>
          <p
            style={{
              fontWeight: 700,
              fontSize: 26,
              margin: "0",
              lineHeight: 0.8,
            }}
          >
            {data?.fullname}
          </p>
        </Flex>
      </Flex>

      <Carousel infinite={false} afterChange={(index) => setCurrent(index)}>
        {data?.accounts?.map((item, index) => {
          return <AccountCard item={item} key={index} />;
        })}
      </Carousel>

      <Flex style={{ margin: "10px 0" }} justify="center">
        <SelectedRow length={data?.accounts?.length} selected={current} />
      </Flex>

      {console.log(data?.accounts?.[current])}

      {!isPending && (
        <div style={{ padding: "0 20px" }}>
          {data?.accounts?.[current]?.transactions
            ?.slice()
            ?.sort((a, b) => new Date(b.date) - new Date(a.date))
            ?.map((item, index) => (
              <TransactionCard transaction={item} key={index} />
            ))}
        </div>
      )}
    </div>
  );
};

const SelectedRow = ({ length, selected }) => {
  if (length <= 0) return null;

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {Array.from({ length }).map((_, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: index == selected ? "#ec5f0e" : "#939393",
              width: index == selected ? 15 : 10,
              height: 10,
              borderRadius: index == selected ? "10px" : "50%",
            }}
          />
        );
      })}
    </div>
  );
};

const AccountCard = ({ item }) => {
  const icons = [
    DatabaseOutlined,
    LineChartOutlined,
    RiseOutlined,
    PieChartOutlined,
    StockOutlined,
    RetweetOutlined,
    SwapOutlined,
  ];

  const [integer, fractional] = item?.balance?.toString().split(".");

  const renderAccount = (text, isDefault = true) => {
    if (isDefault) {
      return text;
    }

    const first = text.slice(0, -4).trim();
    const last = text.slice(-4);

    return (
      <div style={{ fontWeight: 700, fontSize: 22 }}>
        {first}
        <br />
        {last}
      </div>
    );
  };

  return (
    <div>
      <Flex style={{ padding: "10px 20px" }}>
        <div
          style={{
            borderTop: "10px solid #ec5f0e",
            width: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: "10px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Flex justify="space-between">
            <div style={{ color: "#6e6e6e", fontSize: 22 }}>
              VÚB účet Klasik Senior
            </div>
            <MoreOutlined style={{ fontSize: 18 }} />
          </Flex>
          <div style={{ fontWeight: 700, fontSize: 22 }}>
            {renderAccount(item.name)}
          </div>
          <div>
            <span style={{ fontSize: 24, fontWeight: 700 }}>{integer},</span>
            <span style={{ fontSize: 22, fontWeight: 600 }}>{fractional}</span>
            <span style={{ fontSize: 22, fontWeight: 600 }}>&nbsp; EUR</span>
            <div style={{ color: "#6e6e6e", fontSize: 22 }}>
              Použiteľný zostatok
            </div>
          </div>
          <Flex vertical style={{ marginBottom: 10 }}>
            {item?.expenses?.map((expenses, index) => {
              const IconComponent = icons[index % icons.length];

              return (
                <Flex key={index}>
                  <IconComponent style={{ fontSize: 28 }} />
                  <Flex vertical style={{ marginLeft: 20 }}>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>
                      {expenses.name}
                    </div>
                    <div style={{ fontSize: 20, color: "#6e6e6e" }}>
                      {expenses.amount} EUR
                    </div>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

const TransactionCard = ({ transaction }) => {
  if (!transaction) return null;

  const dayNumber = new Date(transaction.date).getDate();
  const monthName = new Date(transaction.date).toLocaleString("en-US", {
    month: "short",
  });
  const yearNumber = new Date(transaction.date).getFullYear();

  return (
    <Flex style={{ padding: "10px 0" }} gap={15}>
      <Flex vertical>
        <div
          style={{
            fontWeight: 700,
            fontSize: 20,
            lineHeight: 1,
            marginBottom: 5,
          }}
        >
          {dayNumber}
        </div>
        <div
          style={{
            textTransform: "uppercase",
            color: "#6e6e6e",
            lineHeight: 1,
            marginBottom: 5,
          }}
        >
          {monthName}
        </div>
        <div
          style={{
            textTransform: "uppercase",
            color: "#6e6e6e",
            lineHeight: 1,
            fontSize: 12,
          }}
        >
          {yearNumber}
        </div>
      </Flex>
      <Flex
        vertical
        justify="space-between"
        style={{ width: "100%", marginLeft: 10 }}
      >
        <div
          style={{
            color: "#6e6e6e",
            fontSize: 16,
            width: "100%",
          }}
        >
          {transaction.description}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            borderBottom: "1px solid #e1e1e1ff",
          }}
        >
          {transaction.amount} EUR
        </div>
      </Flex>
    </Flex>
  );
};
