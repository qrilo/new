import { Button, Flex, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export const AuthPage = () => {
  const { mutate: login, isPending: isLoadingLogin } = useLogin();

  const [code, setCode] = useState();

  const navigate = useNavigate();

  const handleLogin = () => {
    login({
      code: code,
    });

    navigate("/app/pin");
  };

  return (
    <div style={{ height: "100vh" }}>
      <Flex
        style={{ height: "100%" }}
        justify="center"
        align="center"
        vertical
        gap={5}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          Dobrý den
        </Typography.Title>

        <Flex style={{ padding: "5px 0" }}>
          <Input
            placeholder="Kód od manažéra"
            style={{ width: 200 }}
            onChange={(e) => setCode(e.target.value)}
          />
        </Flex>

        <Button
          style={{ width: 200, backgroundColor: "#f60", color: "#fff" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Flex>
    </div>
  );
};
