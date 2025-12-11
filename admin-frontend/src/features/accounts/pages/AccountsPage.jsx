import { Button, ColorPicker, Flex, Modal, Popconfirm, Table, Tag } from "antd";
import { useParams } from "react-router-dom";
import { useAccounts } from "../hooks/useAccounts";
import { useCreateAccount } from "../hooks/useCreateAccount";
import { useState } from "react";
import { CreateAccountsForm } from "../forms/CreateAccountsForm";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UpdateAccountsForm } from "../forms/UpdateAccountsForm";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import { CreateTransactionForm } from "../forms/CreateTransactionForm";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
import dayjs from "dayjs";
import { UpdateTransactionForm } from "../forms/UpdateTransactionForm";

export const AccountsPage = () => {
  const { id,bankType  } = useParams();

  const [selectedAccount, setSelectedAccount] = useState();
  const [selectedTransaction, setSelectedTransaction] = useState();

  const [isOpenCreateAccount, setIsOpenCreateAccount] = useState();
  const [isOpenUpdateAccount, setIsOpenUpdateAccount] = useState();

  const [isOpenCreateTransaction, setIsOpenCreateTransaction] = useState();
  const [isOpenUpdateTransaction, setIsOpeUpdateTransaction] = useState();

  const { data: accounts, isPending: isLoadingAccounts } = useAccounts({
    bankId: id,
    enabled: true,
  });

  const { mutate: createAccount } = useCreateAccount();
  const { mutate: updateAccount } = useUpdateAccount();
  const { mutate: deleteAccount } = useDeleteAccount();

  const { mutate: createTransaction } = useCreateTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();
  const { mutate: deleteTransaction } = useDeleteTransaction();

  const openCreateAccount = () => {
    setIsOpenCreateAccount(true);
  };

  const closeCreateAccount = () => {
    setIsOpenCreateAccount(false);
  };

  const openUpdateAccount = (account) => {
    setSelectedAccount(account);
    setIsOpenUpdateAccount(true);
  };

  const closeUpdateAccount = () => {
    setSelectedAccount();
    setIsOpenUpdateAccount(false);
  };

  const openCreateTransaction = (account) => {
    setSelectedAccount(account);
    setIsOpenCreateTransaction(true);
  };

  const closeCreateTransaction = () => {
    setSelectedAccount();
    setIsOpenCreateTransaction(false);
  };

  const openUpdateTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsOpeUpdateTransaction(true);
  };

  const closeUpdateTransaction = () => {
    setSelectedTransaction();
    setIsOpeUpdateTransaction(false);
  };

  const onFinishCreateAccount = (values) => {
    console.log(values)
    createAccount(
      {
        name: values.name,
        bankId: id,
        balance: values.balance,
        hash: values.color,
        showNewPayment: values.showNewPayment,
        expenses: values.expenses,
      },
      {
        onSuccess: () => closeCreateAccount(),
      }
    );
  };

  const onFinishUpdateAccount = (values) => {
    updateAccount(
      {
        accountId: selectedAccount?.id,
        balance: values.balance,
        hash: values.color,
        name: values.name,
        showNewPayment: values.showNewPayment,
        expenses: values.expenses,
      },
      {
        onSuccess: closeUpdateAccount(),
      }
    );
  };

  const onFinishCreateTransaction = (values) => {
    createTransaction(
      {
        accountId: selectedAccount?.id,
        amount: values.amount,
        date: values.date,
        description: values.description,
        name: values.name,
        type: values.type,
        transactionType: values.transactionType,
      },
      {
        onSuccess: closeCreateTransaction(),
      }
    );
  };

  const onFinishUpdateTransaction = (values) => {
    updateTransaction(
      {
        transactionId: selectedTransaction?.id,
        amount: values.amount,
        date: values.date,
        description: values.description,
        name: values.name,
        type: values.type,
        transactionType: values.transactionType,
      },
      {
        onSuccess: closeUpdateTransaction(),
      }
    );
  };

  const columns = [
    {
      title: "Название счёта",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Баланс",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => `${balance} €`,
    },
    {
      title: "Hash",
      dataIndex: "hash",
      key: "hash",
      render: (_, render) => (
        <ColorPicker value={render.hash} disabled={true} />
      ),
    },
    {
      title: "showNewPayment",
      dataIndex: "showNewPayment",
      key: "showNewPayment",
      render: (_, render) => (
        <div>{render.showNewPayment ? <Tag>Yes</Tag> : <Tag>No</Tag>}</div>
      ),
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, render) => {
        return (
          <Flex gap={5}>
            <Button
              icon={<EditOutlined />}
              onClick={() => openUpdateAccount(render)}
            ></Button>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this account?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteAccount({
                  leadId: id,
                  accountId: render.id,
                });
              }}
            >
              <Button icon={<DeleteOutlined />} danger></Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  const expandedRowColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Transaction type",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      titel: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Flex gap={5}>
            <Button
              icon={<EditOutlined />}
              onClick={() => openUpdateTransaction(record)}
            ></Button>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this transactions?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                deleteTransaction({
                  transactionId: record?.id,
                });
              }}
            >
              <Button icon={<DeleteOutlined />} danger></Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "5px" }}>
      <Modal
        title="Account"
        open={isOpenCreateAccount}
        onCancel={closeCreateAccount}
        footer={null}
      >
        <CreateAccountsForm
            bankType={bankType}
            onFinish={onFinishCreateAccount} />
      </Modal>

      <Modal
        title="Edit"
        open={isOpenUpdateAccount}
        onCancel={closeUpdateAccount}
        footer={null}
      >
        <UpdateAccountsForm
          bankType={bankType}
          account={selectedAccount}
          onFinish={onFinishUpdateAccount} />
      </Modal>

      <Flex justify="end">
        <Button type="primary" onClick={openCreateAccount}>
          Добавить счет
        </Button>
      </Flex>

      <Table
        id="id"
        rowKey="id"
        loading={isLoadingAccounts}
        size="small"
        dataSource={accounts}
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <Modal
                open={isOpenCreateTransaction}
                title="Transaction"
                onCancel={closeCreateTransaction}
                footer={null}
                centered
              >
                <CreateTransactionForm bankType={bankType} onFinish={onFinishCreateTransaction} />
              </Modal>

              <Modal
                open={isOpenUpdateTransaction}
                title="Transaction"
                onCancel={closeUpdateTransaction}
                footer={null}
                centered
              >
                <UpdateTransactionForm
                  bankType={bankType}
                  transaction={selectedTransaction}
                  onFinish={onFinishUpdateTransaction}
                />
              </Modal>

              <Flex justify="space-between" align="center">
                <h3>Transactions</h3>
                <Button
                  type="primary"
                  onClick={() => openCreateTransaction(record)}
                >
                  Добавить
                </Button>
              </Flex>

              <Table
                columns={expandedRowColumns}
                dataSource={record?.transactions}
              />
            </div>
          ),
        }}
      />
    </div>
  );
};
