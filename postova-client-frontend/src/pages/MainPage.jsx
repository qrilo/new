import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useBank } from "../features/banks/hooks/useBank";
import { Header } from "../shared/components/Header";
import { HomeOutlined } from "@ant-design/icons";

const account = {
  name: "Uzitocny ucet",
  balance: -500.5,
};

const secondAccount = {
  name: "Moje",
  balance: 4500.5,
};

export const MainPage = () => {
  const { data } = useBank({
    enabled: true,
    refetchInterval: 5000,
  });

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "rgb(127 127 127)",
      }}
    >
      <Header title="PREHL'AD" />

      <Flex gap={5} vertical>
        {data?.accounts?.map((item, index) => {
          if (index === 0) {
            return <MainAccountCard account={item} key={index} />;
          }

          return <AccountCard account={item} key={index} />;
        })}

        <div style={{ backgroundColor: "#fff", padding: "10px 25px" }}>
          <Flex
            justify="center"
            style={{ fontSize: 24, fontWeight: 600, color: "#5c5c5cff" }}
          >
            VO VAŠEJ BLÍZKOSTI
          </Flex>

          <Flex
            style={{ paddingTop: 20, paddingBottom: 20, color: "#5c5c5cff" }}
            justify="space-between"
          >
            <div style={{ width: 60 }}> </div>
            <div style={{ width: 60 }}>
              Najbližšia <br />
              pobočka <br />
              365.bank
            </div>
            <div style={{ width: 60 }}>
              Najbližší
              <br /> bankomat
            </div>
          </Flex>

          <Flex
            justify="center"
            style={{
              borderTop: "1px solid rgb(221, 221, 221)",
            }}
          >
            <HomeOutlined
              style={{
                padding: "15px 0px",
                color: "#F56827",
                fontSize: 62,
              }}
            />
          </Flex>
          <div
            style={{ fontSize: 24, color: "#5c5c5cff", textAlign: "center" }}
          >
            M. R. Štefánika č. 11
          </div>
        </div>
      </Flex>

      <Flex style={{ height: 50, backgroundColor: "#fff" }}> </Flex>
    </div>
  );
};

const formatWithSpaces = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const AccountCard = ({ account }) => {
  const navigate = useNavigate();

  const [integerPart, fractionalPart] = account?.balance?.toString().split(".");
  const color = account?.balance > 0 ? "#F56827" : "red";

  return (
    <div
      style={{ padding: "10px", backgroundColor: "#fff" }}
      onClick={() => navigate(`/app/accounts/${account.id}`)}
    >
      <Flex
        justify="center"
        style={{ fontSize: 24, fontWeight: 600, color: "#5c5c5cff" }}
      >
        {account?.name}
      </Flex>

      <Flex align="baseline" justify="center" style={{ color: color }}>
        <div style={{ fontSize: 68, marginBottom: 0, fontWeight: 400 }}>
          {formatWithSpaces(integerPart)},
        </div>
        <div style={{ fontSize: 26, marginBottom: 0 }}> {fractionalPart}</div>
      </Flex>

      <Flex
        justify="center"
        style={{
          borderBottom: "1px solid rgb(221, 221, 221)",
          paddingBottom: 5,
        }}
      >
        <div style={{ color: "#5c5c5cff", textAlign: "center", fontSize: 18 }}>
          Aktuálna čiastka istín v EUR
        </div>
      </Flex>
    </div>
  );
};

const MainAccountCard = ({ account }) => {
  const navigate = useNavigate();

  if (!account) return;

  const [integerPart, fractionalPart] = account?.balance?.toString().split(".");
  const color = account?.balance > 0 ? "#F56827" : "red";

  return (
    <div
      style={{ padding: "10px", backgroundColor: "#fff" }}
      onClick={() => navigate(`/app/accounts/${account.id}`)}
    >
      <Flex
        justify="center"
        style={{ fontSize: 24, fontWeight: 600, color: "#5c5c5cff" }}
      >
        {account?.name}
      </Flex>

      <Flex align="baseline" justify="center" style={{ color: color }}>
        <div style={{ fontSize: 68, marginBottom: 0, fontWeight: 400 }}>
          {formatWithSpaces(integerPart)},
        </div>
        <div style={{ fontSize: 26, marginBottom: 0 }}> {fractionalPart}</div>
      </Flex>

      <Flex
        justify="center"
        style={{ borderBottom: "1px solid #a9a9a9ff", paddingBottom: 5 }}
      >
        <div style={{ color: "#5c5c5cff", fontSize: 18 }}>
          Disponibilný zostatok v EUR
        </div>
      </Flex>

      <Flex
        vertical
        style={{ fontSize: 16, color: "#5a5a5aff", padding: "5px 10px" }}
      >
        <div>Číslo účtu</div>
        <div
          style={{
            textAlign: "right",
            fontWeight: 600,
          }}
        >
          SK18 6500 0000 0000 1338 2247
        </div>
      </Flex>

      <Flex style={{ padding: "10px" }}>
        <AccountChart />
      </Flex>

      <Flex justify="space-between">
        <div style={{ color: "#5a5a5aff" }}>21.11.2025</div>
        <div style={{ fontWeight: 600 }}>Vývoj účtu</div>
        <div style={{ color: "#5a5a5aff" }}>30.11.2025</div>
      </Flex>

      <Flex justify="space-between">
        <Flex align="center" gap={5}>
          <div
            style={{
              height: 10,
              width: 10,
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          ></div>
          <div>Posledný pohyb</div>
        </Flex>

        <div style={{ color: "red" }}>
          <b>3,50</b> EUR
        </div>
      </Flex>
    </div>
  );
};

export const AccountChart = () => {
  const points = [
    { x: 10, y: 20, color: "#3bb54a" },
    { x: 70, y: 45, color: "#e53935" },
    { x: 130, y: 50, color: "#e53935" },
    { x: 190, y: 55, color: "#e53935" },
    { x: 250, y: 100, color: "#e53935" },
    { x: 310, y: 82, color: "#e53935" },
    { x: 370, y: 50, color: "#e53935" },
    { x: 430, y: 65, color: "#e53935" },
    { x: 490, y: 40, color: "#e53935" },
  ];

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div
      style={{
        width: "100%",
        height: 120,
        background: "#fff",
        borderTop: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
      }}
    >
      <svg
        viewBox="0 0 500 120"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d={pathD}
          fill="none"
          stroke="#555"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={5}
            fill={p.color}
            stroke={i === 0 ? "#3bb54a" : "#e53935"}
            strokeWidth={2}
          />
        ))}
      </svg>
    </div>
  );
};
