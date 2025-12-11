import {Form, Input, InputNumber, Button, ColorPicker, Checkbox, Space} from "antd";
import { useEffect } from "react";

export const UpdateAccountsForm = ({ bankType, onFinish, loading, account }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        name: account.name || "",
        balance: account.balance || 0,
        color: account.hash || "#000000",
        showNewPayment: account.showNewPayment || false,
        expenses: account.expenses || [],
      });
    }
  }, [account, form]);

  const handleFinish = (values) => {
    onFinish(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        label="Account Name"
        name="name"
        rules={[{ required: true, message: "Please input the account name!" }]}
      >
        <Input placeholder="Enter account name" />
      </Form.Item>

      <Form.Item
        label="Balance"
        name="balance"
        rules={[
          { required: true, message: "Please input the balance!" },
          { type: "number", min: 0, message: "Balance cannot be negative!" },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter balance"
          min={0}
          step={0.01}
        />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 16 }}
        label="Hash"
        name="color"
        rules={[{ required: true }]}
        getValueFromEvent={(color) => `#${color.toHex()}`}
      >
        <ColorPicker format="hex" showText allowClear />
      </Form.Item>

      <Form.Item name="showNewPayment" valuePropName="checked">
        <Checkbox>Show nova platba</Checkbox>
      </Form.Item>

    {bankType === 'VUB' && <Form.List
        name="expenses"
        initialValue={[
            { name: "Výdaje za tento měsíc", amount: 0 },
            { name: "Bydlení", amount: 0 },
        ]}
    >
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

                {fields.length < 2 && (
                    <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                    >
                        Добавить расход
                    </Button>
                )}
            </>
        )}
    </Form.List>}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loading}
        >
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};
