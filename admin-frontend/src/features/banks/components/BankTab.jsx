import { Button, Flex, Modal, Popconfirm, Table } from "antd";
import { useState } from "react";
import { CreateBankForm } from "../forms/CreateBankForm.jsx";
import { useCreateBank } from "../hooks/useCreateBank.jsx";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UpdateBankForm } from "../forms/UpdateBankForm.jsx";
import { useUpdateBank } from "../hooks/useUpdateBank.jsx";
import { useDeleteBank } from "../hooks/useDeleteBank.jsx";
import { useBanks } from "../../banks/hooks/useBanks.jsx";

export const BankTab = ({ bankType = 'SLSP'}) => {
  const { data: banks } = useBanks({
      bankType: bankType,
      enabled: true
  });

  const navigate = useNavigate();

  const { mutate: createBank, isPending: isLoadingBankLead } =
    useCreateBank();

  const { mutate: updateBank } = useUpdateBank();
  const { mutate: deleteBank } = useDeleteBank();

  const [isOpenCreateBankModal, setIsOpenCreateBankModal] = useState();
  const [isOpenUpdateBankModal, setIsOpenUpdateLeadModal] = useState();

  const [selectedLead, setSelectedLead] = useState();

  const openCreateBankModal = () => {
    setIsOpenCreateBankModal(true);
  };

  const closeCreateLeadModal = () => {
    setIsOpenCreateBankModal(false);
  };

  const openUpdateLeadModal = (bank) => {
    setSelectedLead(bank);
    setIsOpenUpdateLeadModal(true);
  };

  const closeUpdateLeadModal = () => {
    setSelectedLead();
    setIsOpenUpdateLeadModal(false);
  };

  const onFinishCreateLead = (values) => {
    createBank(
      {
        bank: values.bank,
        comment: values.comment,
        email: values.email,
        fullname: values.fullname,
        phone: values.phone,
        pinLength: values.pinLength,
        bankType: bankType,
        expenses: values.expenses,
        contact: values.contact,
      },
      {
        onSuccess: () => {
          closeCreateLeadModal();
        },
      }
    );
  };

  const onFinishUpdateLead = (values) => {
    updateBank(
      {
        id: selectedLead.id,
        bank: values.bank,
        comment: values.comment,
        email: values.email,
        fullname: values.fullname,
        phone: values.phone,
        pinLength: values.pinLength,
        expenses: values.expenses,
        contact: values.contact,
      },
      {
        onSuccess: () => {
          closeUpdateLeadModal();
        },
      }
    );
  };

  const columns = [
    {
      title: "fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "code",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "bank",
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: "pin Length",
      dataIndex: "pinLength",
      key: "pinLength",
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, render) => {
        return (
          <Flex gap={5}>
            <Button
              onClick={() => navigate(`/banks/${render.id}/${bankType}/notifications`)}
            >
              Уведомления
            </Button>
            <Button onClick={() => navigate(`/banks/${render.id}/${bankType}/accounts`)}>
              Счета
            </Button>
            <Button
              onClick={() => openUpdateLeadModal(render)}
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this account?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                  deleteBank({
                    id: render.id,
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
    <div>
      <Modal
        title="Lead"
        centered
        open={isOpenCreateBankModal}
        onCancel={closeCreateLeadModal}
        footer={null}
      >
        <CreateBankForm
          onFinish={onFinishCreateLead}
          loading={isLoadingBankLead}
        />
      </Modal>

      <Modal
        title="Update Lead"
        centered
        open={isOpenUpdateBankModal}
        onCancel={closeUpdateLeadModal}
        footer={null}
      >
        <UpdateBankForm
          onFinish={onFinishUpdateLead}
          lead={selectedLead}
        />
      </Modal>

      <Flex justify="end" style={{ marginBottom: 8 }}>
        <Button type="primary" onClick={openCreateBankModal}>
          Добавить
        </Button>
      </Flex>

      <Table
        rowKey="id"
        dataSource={banks}
        columns={columns}
        size="small"
        pagination={false}
      />
    </div>
  );
};
