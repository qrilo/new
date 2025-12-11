import { Form, Input, Button, Select, DatePicker, Flex } from "antd";

export const CreateNotificationForm = ({ onFinish, loading }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      {/* Name */}
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Введите название" }]}
      >
        <Input placeholder="Введите имя уведомления" />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Введите описание" }]}
      >
        <Input.TextArea rows={4} placeholder="Введите описание уведомления" />
      </Form.Item>

      {/* Date */}
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Выберите дату" }]}
      >
        <DatePicker
          showTime
          style={{ width: "100%" }}
          placeholder="Выберите дату и время"
        />
      </Form.Item>

      <Flex justify="end">
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Flex>
    </Form>
  );
};
