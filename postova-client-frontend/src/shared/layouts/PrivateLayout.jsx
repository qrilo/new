import { Button, Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth.jsx";

export const PrivateLayout = () => {
  const { logout } = useAuth();

  return (
    <div>
      {/*
        <Header style={{ background: "#fff", padding: 0 }}>
          <Flex
            justify="end"
            align="center"
            style={{
              height: "100%",
              padding: "0 20px",
            }}
          >
            <Button color="danger" variant="solid" onClick={logout}>
              Выход
            </Button>
          </Flex>
        </Header>
      */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
