import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoaderPage = ({ withReturn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (withReturn) {
      const timer = setTimeout(() => {
        navigate(-1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [withReturn, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#ec5f0e",
      }}
    >
      <Flex vertical justify="center" align="center" style={{ height: "100%" }}>
        <Spin
          indicator={<LoadingOutlined spin style={{ color: "#fff" }} />}
          size="large"
        />
        {withReturn && (
          <h3 style={{ margin: 0, padding: "25px 0", color: "#fff" }}>
            Something went wrong...
          </h3>
        )}
      </Flex>
    </div>
  );
};
