import { Button, Flex, Input, Typography } from "antd";
import { useLogin } from "../features/auth/hooks/useLogin.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <img src="../../george-icon.svg" width={100} />
        <Typography.Title level={3} style={{ margin: 0 }}>
          Dobry den
        </Typography.Title>
        <Input
          placeholder="Code Manager"
          style={{ width: 200 }}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button style={{ width: 200 }} type="primary" onClick={handleLogin}>
          Login
        </Button>
      </Flex>
    </div>
  );
};
