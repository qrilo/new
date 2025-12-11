import { Col, Flex, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderPage } from "./LoaderPage";
import { useBank } from "../features/banks/hooks/useBank";
import { Header } from "../shared/components/Header";

export const PinPage = () => {
  const [pinCode, setPinCode] = useState("");

  const { data: bank, isPending: isLoadingBank } = useBank({
    enabled: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (pinCode.length === Number(bank?.pinLength)) {
      navigate("/app/main");
    }
  }, [pinCode]);

  const handleDigitClick = (digit) => {
    if (pinCode.length < bank?.pinLength) {
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
          backgroundColor: "#ffffffff",
          height: 75,
          flex: 1,
          textAlign: "center",
          borderRight: "1px solid #eaeaea",
          borderBottom: "1px solid #eaeaea",
        }}
        onClick={() => handleDigitClick(number)}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 30,
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
    <Flex vertical style={{ minHeight: "100vh" }}>
      <Header />

      <Flex vertical style={{ flex: 1 }}>
        <Flex style={{ padding: "20px 50px" }} justify="center" vertical>
          <Flex style={{ color: "#6d6d6dff", fontSize: 18 }} justify="center">
            Zadajte svoj PIN.
          </Flex>

          <Flex
            style={{ height: 10, padding: "10px 0" }}
            justify="center"
            gap={10}
          >
            {Array.from({ length: bank?.pinLength }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor:
                    i < pinCode.length ? "#767676ff" : "transparent",
                  transition: "0.2s",
                  border: "1px solid #767676ff",
                }}
              />
            ))}
          </Flex>
        </Flex>

        <Flex
          style={{
            flex: 1,
            backgroundColor: "#808080ff",
            color: "transparent",
          }}
        >
          1
        </Flex>
      </Flex>

      <Flex vertical style={{ padding: "20px 0 30px", background: "#fff" }}>
        {/* 1 ряд */}
        <Flex justify="space-between" gap={5} style={{ width: "100%" }}>
          {/* 1 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(1)}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              1
            </div>
          </Flex>

          {/* 2 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            vertical
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(2)}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              2
            </div>
            <div
              style={{
                color: "rgba(79, 79, 79, 0.67)",
              }}
            >
              ABC
            </div>
          </Flex>

          {/* 3 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(3)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              3
            </div>{" "}
            <div
              style={{
                color: "rgba(79, 79, 79, 0.67)",
              }}
            >
              DEF
            </div>
          </Flex>
        </Flex>

        {/* 2 ряд */}
        <Flex justify="space-between" gap={5} style={{ width: "100%" }}>
          {/* 4 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(4)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              4
            </div>
            <div
              style={{
                color: "rgba(79, 79, 79, 0.67)",
              }}
            >
              DEF
            </div>
          </Flex>

          {/* 5 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(5)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              5
            </div>
            <div
              style={{
                color: "rgba(79, 79, 79, 0.67)",
              }}
            >
              JKL
            </div>
          </Flex>

          {/* 6 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(6)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              6
            </div>
            <div
              style={{
                color: "rgba(79, 79, 79, 0.67)",
              }}
            >
              MNO
            </div>
          </Flex>
        </Flex>

        {/* 3 ряд */}
        <Flex justify="space-between" gap={5} style={{ width: "100%" }}>
          {/* 7 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(7)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              7
            </div>
            <div
              style={{
                color: "rgba(79, 79, 79, 0.67)",
              }}
            >
              PQRS
            </div>
          </Flex>

          {/* 8 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(8)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              8
            </div>
            <div
              style={{
                color: "rgba(79, 79, 79, 0.67)",
              }}
            >
              TUV
            </div>
          </Flex>

          {/* 9 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(9)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              9
            </div>
            <div
              style={{
                color: "rgba(79, 79, 79, 0.67)",
              }}
            >
              WXYZ
            </div>
          </Flex>
        </Flex>

        <Flex justify="space-between" gap={5} style={{ width: "100%" }}>
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(7)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              +*#
            </div>
          </Flex>

          {/* 8 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDigitClick(0)}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              0
            </div>
          </Flex>

          {/* 9 */}
          <Flex
            className="pin-button"
            justify="center"
            align="center"
            style={{
              backgroundColor: "#ffffffff",
              height: 75,
              flex: 1,
              textAlign: "center",
              borderRight: "1px solid #eaeaea",
              borderBottom: "1px solid #eaeaea",
            }}
            onClick={() => handleDeleteClick()}
            vertical
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: 30,
              }}
            >
              DEL
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
