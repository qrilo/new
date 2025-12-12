import { Tabs } from "antd";
import { BankTab } from "../components/BankTab.jsx";
import { useEffect, useState } from "react";

export const BanksPage = () => {
  const savedTabKey = localStorage.getItem("selectedTabKey");

  const [activeTabKey, setActiveTabKey] = useState(savedTabKey || "1");

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    localStorage.setItem("selectedTabKey", key);
  };

  const items = [
    {
      key: "1",
      label: "SLSP",
      children: <BankTab bankType="SLSP" />,
    },
    {
      key: "2",
      label: "CSAS",
      children: <BankTab bankType="CSAS" />,
    },
    {
      key: "3",
      label: "VUB",
      children: <BankTab bankType="VUB" />,
    },
    {
      key: "4",
      label: "POSTOVA",
      children: <BankTab bankType="POSTOVA" />,
    },
  ];

  useEffect(() => {
    const savedTabKey = localStorage.getItem("selectedTabKey");
    if (savedTabKey) {
      setActiveTabKey(savedTabKey);
    }
  }, []);

  return (
    <div style={{ padding: "0 20px" }}>
      <Tabs
        activeKey={activeTabKey}
        onChange={handleTabChange}
        destroyOnHidden
        items={items}
      />
    </div>
  );
};
