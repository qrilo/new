import { Col, Flex, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderPage } from "./LoaderPage";
import { useBank } from "../features/banks/hooks/useBank.jsx";

export const PinPage = () => {
  const [pinCode, setPinCode] = useState("");

  const { data: bank, isPending: isLoadingBank } = useBank({
    enabled: true,
    refetchInterval: 5000,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (pinCode.length === Number(bank?.pinLength)) {
      navigate("/app/main");
    }
  }, [pinCode]);

  const handleDigitClick = (digit) => {
    if (pinCode.length < 6) {
      setPinCode(pinCode + digit);
    }
  };

  const handleDeleteClick = () => {
    setPinCode(pinCode.slice(0, -1));
  };

  const renderPin = (number) => {
    return (
      <Flex
        className="pin-button"
        justify="center"
        align="center"
        style={{
          backgroundColor: "#fff",
          borderRadius: 50,
          width: 50,
          height: 50,
        }}
        onClick={() => handleDigitClick(number)}
      >
        <div
          style={{
            width: 25,
            height: 25,
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          {number}
        </div>
      </Flex>
    );
  };

  if (isLoadingBank) {
    return <LoaderPage />;
  }

  return (
    <Flex style={{ height: "100vh" }} vertical justify="center" align="center">
      <Flex justify="center" align="center" vertical>
        <img src="../../george-icon.svg" width={75} />
        <div style={{ fontWeight: 700, padding: "15px 0", fontSize: 20 }}>
          Dobry den
        </div>

        <div style={{ fontSize: 18, color: "#676767ff", marginBottom: 10 }}>
          Prihlaseni pomoci PIN kodu
        </div>

        <Row
          gutter={10}
          style={{
            marginBottom: 15,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: Number(bank?.pinLength) }, (_, i) => (
            <Col key={i}>
              <div
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                <div className="disable-focus" style={{ fontSize: 20 }}>
                  {pinCode[i] ? "•" : ""}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ marginTop: 10 }}>
          <Row gutter={15} style={{ marginBottom: 15 }}>
            <Col span={8}>{renderPin(1)}</Col>
            <Col span={8}>{renderPin(2)}</Col>
            <Col span={8}>{renderPin(3)}</Col>
          </Row>

          <Row gutter={15} style={{ marginBottom: 15 }}>
            <Col span={8}>{renderPin(4)}</Col>
            <Col span={8}>{renderPin(5)}</Col>
            <Col span={8}>{renderPin(6)}</Col>
          </Row>

          <Row gutter={15} style={{ marginBottom: 15 }}>
            <Col span={8}>{renderPin(7)}</Col>
            <Col span={8}>{renderPin(8)}</Col>
            <Col span={8}>{renderPin(9)}</Col>
          </Row>

          <Row gutter={15} style={{ marginBottom: 15 }}>
            <Col span={8} onClick={handleDeleteClick}>
              <Flex
                className="pin-button"
                justify="center"
                align="center"
                style={{
                  borderRadius: 50,
                  width: 50,
                  height: 50,
                }}
              >
                <div
                  style={{
                    width: 25,
                    height: 25,
                    textAlign: "center",
                    fontWeight: 700,
                    color: "#000000E0",
                  }}
                >
                  &#x2190;
                </div>
              </Flex>
            </Col>
            <Col span={8}>{renderPin(0)}</Col>
          </Row>
        </div>
      </Flex>
    </Flex>
  );
};
