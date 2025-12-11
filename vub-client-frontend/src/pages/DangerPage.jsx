import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";

export const DangerPage = () => {
  const navigate = useNavigate();

  const loadingPageStyle = {
    height: "100vh",
    zIndex: 9999,
    backgroundColor: "#ec5f0e",
    padding: "40px 15px",
  };

  return (
    <div style={loadingPageStyle}>
      <Flex>
        <ArrowLeftOutlined
          style={{ fontSize: 24, color: "#fff" }}
          onClick={() => navigate(-1)}
        />
      </Flex>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "120px 0",
        }}
      >
        <Flex vertical justify="center">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              width={150}
              style={{ color: "#fff", marginBottom: 25 }}
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <Flex justify="center">
            <h2 style={{ color: "#fff", fontWeight: 500 }}>
              Vyskytla sa chyba, <br />
              <div style={{ textAlign: "center" }}>Skúste neskôr.</div>
            </h2>
          </Flex>
        </Flex>
      </div>
      <Flex style={{ width: "100%", paddingTop: 8 }} justify="center">
        <div
          onClick={() => navigate(-1)}
          style={{
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "#fff",
            borderRadius: 10,
            textTransform: "uppercase",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Späť
        </div>
      </Flex>
    </div>
  );
};
