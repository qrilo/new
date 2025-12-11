import { useParams } from "react-router-dom";
import { useNotifications } from "../hooks/useNotifications.jsx";
import { useCreateNotification } from "../hooks/useCreateNotification.jsx";
import { Button, Flex, Modal, Popconfirm, Table } from "antd";
import { CreateNotificationForm } from "../forms/CreateNotificationForm.jsx";
import { useUpdateNotifications } from "../hooks/useUpdateNotifications.jsx";
import { useDeleteNotifications } from "../hooks/useDeleteNotifications.jsx";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UpdateNotificationForm } from "../forms/UpdateNotificationForm.jsx";
import { useState } from "react";

export const NotificationsPage = () => {
  const { id,bankType  } = useParams();

  const { data: notifications, isPending: isLoadingNotifications } =
    useNotifications({
        bankId: id,
      enabled: true,
    });

  const [isOpenCreateNotificationModal, setIsOpenCreateNotificationModal] =
    useState(false);

  const [isOpenUpdateNotificationModal, setIsOpenUpdateNotificationModal] =
    useState(false);
  const [selectedNotification, setSelectedNotification] = useState();

  const { mutate: createNotification } = useCreateNotification();
  const { mutate: updateNotification } = useUpdateNotifications();
  const { mutate: deleteNotification } = useDeleteNotifications();

  const openCreateNotificationModal = () => {
    setIsOpenCreateNotificationModal(true);
  };

  const closeCreateNotificationModal = () => {
    setIsOpenCreateNotificationModal(false);
  };

  const openUpdateNotificationModal = (notification) => {
    setSelectedNotification(notification);
    setIsOpenUpdateNotificationModal(true);
  };

  const closeUpdateNotificationModal = () => {
    setSelectedNotification();
    setIsOpenUpdateNotificationModal(false);
  };

  const handleCreateNotification = (values) => {
    createNotification(
      {
        bankId: id,
        date: values.date,
        description: values.description,
        name: values.name,
      },
      {
        onSuccess: () => closeCreateNotificationModal(),
      }
    );
  };

  const handleUpdateNotification = (values) => {
    updateNotification(
      {
        notificationId: selectedNotification.id,
        date: values.date,
        description: values.description,
        name: values.name,
      },
      {
        onSuccess: () => closeUpdateNotificationModal(),
      }
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleString("ru-RU"),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Flex gap={5}>
          <Button
            onClick={() => openUpdateNotificationModal(record)}
            icon={<EditOutlined />}
          ></Button>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this account?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteNotification({
                  notificationId: record.id,
              });
            }}
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <div style={{ padding: "5px" }}>
      <Flex justify="end">
        <Button type="primary" onClick={openCreateNotificationModal}>
          Добавить
        </Button>
      </Flex>

      <Modal
        open={isOpenCreateNotificationModal}
        onCancel={closeCreateNotificationModal}
        footer={null}
      >
        <CreateNotificationForm onFinish={handleCreateNotification} />
      </Modal>

      <Modal
        open={isOpenUpdateNotificationModal}
        onCancel={closeUpdateNotificationModal}
        footer={null}
      >
        <UpdateNotificationForm
          onFinish={handleUpdateNotification}
          notification={selectedNotification}
        />
      </Modal>

      <div style={{ padding: "10px 5px" }}>
        <h3>Notifications:</h3>
        <Table
          loading={isLoadingNotifications}
          columns={columns}
          dataSource={notifications}
          rowKey="_id"
          size="small"
          pagination={false}
        />
      </div>
    </div>
  );
};
