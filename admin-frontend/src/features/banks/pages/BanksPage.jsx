import { Tabs } from "antd";
import { BankTab } from "../components/BankTab.jsx";

export const BanksPage = () => {
  const items = [
    {
      key: 1,
      label: "SLSP",
      children: <BankTab bankType="SLSP" />,
    },
    {
      key: 2,
      label: "CSAS",
      children: <BankTab bankType="CSAS" />,
    },
    {
      key: 3,
      label: "VUB",
      children: <BankTab bankType="VUB" />,
    },
    {
      key: 4,
      label: "POSTOVA",
      children: <BankTab bankType="POSTOVA" />,
    },
  ];

  return (
    <div style={{ padding: "0 20px" }}>
      <Tabs items={items} destroyOnHidden />
    </div>
  );
};
