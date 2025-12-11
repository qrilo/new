import { Button, DatePicker, Flex, Form, Input } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

export const UpdateBankNotificationForm = ({
  notification,
  onFinish,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (notification) {
      form.setFieldsValue({
        name: notification.name || "",
        date: notification.date ? dayjs(notification.date) : dayjs(),
        description: notification.description || "",
      });
    }
  }, [notification, form]);

  const handleFinish = (values) => {
    if (values.date) {
      values.date = values.date.toISOString();
    }
    onFinish(values);
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
