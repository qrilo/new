import { Form, Input, Button, message, Flex } from "antd";

export const CreateAdminForm = ({ onFinish, loading }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onFinish(values);
  };

  return (
    <Form
      form={form}
      name="create-manager"
      onFinish={handleFinish}
      initialValues={{ username: "", fullname: "", password: "" }}
      layout="vertical"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please enter the username!" },
          { min: 3, message: "Username must be at least 3 characters" },
        ]}
      >
        <Input placeholder="Enter username" />
      </Form.Item>

      <Form.Item
        label="Fullname"
        name="fullname"
        rules={[
          { required: true, message: "Please enter the fullname!" },
          { min: 3, message: "Fullname must be at least 3 characters" },
        ]}
      >
        <Input placeholder="Enter Fullname" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please enter the password!" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Flex justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Создать
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
