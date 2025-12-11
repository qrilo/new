import { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Space,
  InputNumber,
  Card,
  Divider,
} from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

export const UpdateBankForm = ({ onFinish, loading, lead }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (lead) {
      form.setFieldsValue({
        fullname: lead.fullname || "",
        email: lead.email || "",
        phone: lead.phone || "",
        comment: lead.comment || "",
        bank: lead.bank || undefined,
        pinLength: lead.pinLength?.toString() || undefined,
        expenses:
          lead.expenses?.length > 0
            ? lead.expenses
            : [
                { name: "Vydaje za mesiac", amount: 0 },
                { name: "Bydleni", amount: 0 },
              ],
        contact: lead.contact || { fullname: "", phone: "" },
      });
    } else {
      form.setFieldsValue({
        expenses: [
          { name: "Vydaje za mesiac", amount: 0 },
          { name: "Bydleni", amount: 0 },
        ],
        contact: { fullname: "", phone: "" },
      });
    }
  }, [lead, form]);

  const handleFinish = (values) => {
    onFinish({ ...values, leadId: lead?._id });
    if (!lead) form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Fullname"
        name="fullname"
        rules={[{ required: true, message: "Please enter full name" }]}
      >
        <Input placeholder="Fullname" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item label="Phone" name="phone">
        <Input placeholder="Phone" />
      </Form.Item>

      <Form.Item label="Comment" name="comment">
        <Input.TextArea placeholder="Comment" rows={4} />
      </Form.Item>

      <Form.Item
        label="Pin Length"
        name="pinLength"
        rules={[{ required: true, message: "Please select pin length" }]}
      >
        <Select placeholder="Pin Length">
          <Option value="4">4</Option>
          <Option value="6">6</Option>
          <Option value="8">8</Option>
        </Select>
      </Form.Item>

      <Form.List name="expenses">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <Form.Item
                  name={[name, "name"]}
                  rules={[
                    { required: true, message: "Введите название расхода" },
                  ]}
                >
                  <Input placeholder="Название" style={{ width: 200 }} />
                </Form.Item>

                <Form.Item
                  name={[name, "amount"]}
                  rules={[{ required: true, message: "Введите сумму" }]}
                >
                  <InputNumber placeholder="Сумма" style={{ width: 140 }} />
                </Form.Item>

                {fields.length > 2 && (
                  <MinusCircleOutlined onClick={() => remove(name)} />
                )}
              </Space>
            ))}
          </>
        )}
      </Form.List>

      {/* ---- Саппорт ---- */}
      <Divider>Саппорт</Divider>
      <Card size="small" style={{ marginBottom: 16 }}>
        <Form.Item
          label="Fullname"
          name={["contact", "fullname"]}
          rules={[{ required: true, message: "Введите имя саппорта" }]}
        >
          <Input placeholder="Fullname" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name={["contact", "phone"]}
          rules={[{ required: true, message: "Введите номер телефона" }]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
      </Card>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Save changes
        </Button>
      </Form.Item>
    </Form>
  );
};
