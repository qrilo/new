import { Button, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth.jsx";

export const PrivateLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Header style={{ background: "#fff", padding: 0 }}>
        <Flex
          justify="space-between"
          align="center"
          style={{
            height: "100%",
            padding: "0 20px",
          }}
        >
          <Button onClick={() => navigate(-1)}>Назад</Button>
          <Button color="danger" variant="solid" onClick={logout}>
            Выход
          </Button>
        </Flex>
      </Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
