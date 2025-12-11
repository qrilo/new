import { Tabs } from "antd";
import { AdminsTab } from "../features/admins/components/AdminsTab.jsx";

export const SuperAdminMainPage = () => {
  const items = [
    {
      key: 1,
      label: "Managers",
      children: <AdminsTab />,
    },
  ];

  return (
    <div style={{ padding: "0 20px" }}>
      <Tabs items={items}></Tabs>
    </div>
  );
};
