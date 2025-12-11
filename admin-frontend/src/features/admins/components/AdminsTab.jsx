import { Button, Flex, Modal, Table } from "antd";
import { useAdmins } from "../hooks/useAdmins.jsx";
import { useState } from "react";
import { CreateAdminForm } from "../forms/CreateAdminForm.jsx";
import { useCreateAdmin } from "../hooks/useCreateAdmin.jsx";

export const AdminsTab = () => {
  const { data: managers } = useAdmins({
    enabled: true,
  });

  const { mutate: createManager, isPending: isLoadingCreateManager } =
    useCreateAdmin();

  const [isOpenCreateManagerModal, setIsOpenCreateManagerModal] = useState();

  const openCreateManagerModal = () => {
    setIsOpenCreateManagerModal(true);
  };

  const closeCreateManagerModal = () => {
    setIsOpenCreateManagerModal(false);
  };

  const onFinishCreateManager = (values) => {
    createManager(
      {
        username: values.username,
        fullname: values.fullname,
        password: values.password,
      },
      {
        onSuccess: () => closeCreateManagerModal(),
      }
    );
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div>
      <Modal
        title="Admins"
        open={isOpenCreateManagerModal}
        onCancel={closeCreateManagerModal}
        footer={null}
      >
        <CreateAdminForm
          onFinish={onFinishCreateManager}
          loading={isLoadingCreateManager}
        />
      </Modal>

      <Flex justify="end" style={{ marginBottom: 8 }}>
        <Button type="primary" onClick={openCreateManagerModal}>
          Добавить
        </Button>
      </Flex>

      <Table
        rowKey="id"
        dataSource={managers}
        columns={columns}
        size="small"
        pagination={false}
      />
    </div>
  );
};
