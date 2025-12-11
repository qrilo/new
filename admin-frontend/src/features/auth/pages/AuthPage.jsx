import { Button, Flex, Form, Input } from "antd";
import Title from "antd/es/skeleton/Title";
import { useLogin } from "../hooks/useLogin.jsx";

export const AuthPage = () => {
  const { mutate: login, isPending: isLoadingLogin } = useLogin();

  const handleLogin = (values) => {
    login({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <Flex>
        <div>
          <Title level={2} style={{ textAlign: "center" }}>
            Войти
          </Title>
          <Form
            name="login"
            onFinish={handleLogin}
            initialValues={{ remember: true }}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="Имя пользователя"
              name="username"
              rules={[{ required: true, message: "Введите имя пользователя!" }]}
            >
              <Input placeholder="Введите имя пользователя" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Введите пароль!" }]}
            >
              <Input.Password placeholder="Введите пароль" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoadingLogin}
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </Flex>
  );
};
