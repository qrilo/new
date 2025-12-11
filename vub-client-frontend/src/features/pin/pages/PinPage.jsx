import { Flex } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVub } from "../../main/hooks/useVub";

export const PinPage = () => {
  const navigate = useNavigate();

  const { data, isPending } = useVub({
    id: localStorage.getItem("leadId"),
    refetchInterval: 500,
    enabled: true,
  });

  const [pinLength, setPinLength] = useState(data?.pinLength);
  const [code, setCode] = useState("");

  useEffect(() => {
    setPinLength(data.pinLength);
  }, [data]);

  const handleClick = (digit) => {
    if (code.length < pinLength) {
      setCode((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setCode((prev) => prev.slice(0, -1));
  };

  const handleOnButton = () => {
    if (pinLength == code.length) {
      navigate("/app/main");
    }
  };

  if (isPending) {
    return <div></div>;
  }

  return (
    <div style={{ height: "calc(100vh - 150px)" }}>
      <div
        style={{
          fontSize: 24,
          paddingTop: "100px",
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        Zadajte svoj PIN
      </div>
      <Flex style={{ height: "100%" }} align="center" justify="center">
        <div>
          <Flex
            style={{ height: 10, padding: "10px 0" }}
            justify="center"
            gap={10}
          >
            {code.length === 0 ? <div style={{ height: 10 }} /> : null}

            {Array.from({ length: code.length }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: "#f60",
                  borderRadius: "50%",
                }}
              />
            ))}
          </Flex>

          <div
            style={{
              padding: "40px 0 20px 0",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Flex
                key={num}
                justify="center"
                align="center"
                style={{
                  height: 60,
                }}
              >
                <button
                  className="number-btn"
                  onClick={() => handleClick(num)}
                  style={{
                    height: 70,
                    width: 70,
                    fontSize: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    backgroundColor: "transparent",
                    borderRadius: "50%",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    cursor: "pointer",
                  }}
                >
                  {num}
                </button>
              </Flex>
            ))}

            <div></div>

            <Flex
              justify="center"
              align="center"
              style={{
                height: 60,
              }}
            >
              <button
                className="number-btn"
                onClick={() => handleClick(0)}
                style={{
                  height: 70,
                  width: 70,
                  fontSize: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  backgroundColor: "transparent",
                  borderRadius: "50%",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  cursor: "pointer",
                }}
              >
                0
              </button>
            </Flex>

            <Flex
              justify="center"
              align="center"
              style={{
                height: 60,
              }}
            >
              <button
                className="number-btn"
                onClick={handleDelete}
                style={{
                  height: 70,
                  width: 70,
                  fontSize: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  backgroundColor: "transparent",
                  borderRadius: "50%",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  cursor: "pointer",
                }}
              >
                <svg
                  style={{
                    color: "#f60",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-backspace-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8z"></path>
                </svg>
              </button>
            </Flex>
          </div>

          <Flex style={{ padding: "10px 0" }} justify="center">
            <button
              className="button-ok"
              disabled={pinLength != code.length}
              onClick={handleOnButton}
              style={{
                backgroundColor: "#525252ff",
                color: "#fff",
                border: "none",
                padding: "12px 25px",
                borderRadius: "20px",
                width: "100%",
                fontWeight: 600,
              }}
            >
              OK
            </button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};
