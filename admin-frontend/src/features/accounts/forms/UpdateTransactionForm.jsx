import { useEffect } from "react";
import { Form, Input, InputNumber, Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

export const UpdateTransactionForm = ({ bankType, transaction, onFinish, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (transaction) {
      form.setFieldsValue({
        name: transaction.name || "",
        amount: transaction.amount || 0,
        date: transaction.date ? dayjs(transaction.date) : dayjs(),
        description: transaction.description || "",
        transactionType: transaction.transactionType || "top",
        type: transaction.type || "",
      });
    }
  }, [transaction, form]);

  const handleFinish = (values) => {
    if (values.date) {
      values.date = values.date.toISOString();
    }
    onFinish(values);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      initialValues={{ type: "top", amount: 0, date: dayjs() }}
    >
      { bankType !== "VUB" &&
          <Form.Item
              label="Transaction Name"
              name="name"
              rules={[
                { required: true, message: "Please input the transaction name!" },
              ]}
          >
            <Input placeholder="Enter transaction name" />
          </Form.Item>
      }

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          { required: true, message: "Please input the amount!" },
          { type: "number", min: 0, message: "Amount cannot be negative!" },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter amount"
          min={0}
          step={0.01}
        />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please select a date!" }]}
      >
        <DatePicker style={{ width: "100%" }} showTime />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: false }]}
      >
        <Input.TextArea placeholder="Enter description" rows={3} />
      </Form.Item>

      { bankType !== "VUB" &&
        <Form.Item
          label="Type Transaction"
          name="transactionType"
          rules={[
            { required: true, message: "Please select a transaction type!" },
          ]}
        >
          <Select>
            <Option value="Top">Top (Пополнение)</Option>
            <Option value="Debit">Debit (Списание)</Option>
          </Select>
        </Form.Item>
      }

      { bankType !== "VUB" &&
        <Form.Item label="Type" name="type" rules={[{ required: false }]}>
          <Input placeholder="Enter type" />
        </Form.Item>
      }

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={loading}
        >
          {transaction ? "Update Transaction" : "Create Transaction"}
        </Button>
      </Form.Item>
    </Form>
  );
};
