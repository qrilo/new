import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useState } from "react";
import {
  HomeOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
  FolderOutlined,
  FileTextOutlined,
  TeamOutlined,
  BellOutlined,
  MoreOutlined,
  MailOutlined,
} from "@ant-design/icons";

const menuItems = [
  { label: "Prehľad", icon: <HomeOutlined /> },
  { label: "Produkty", icon: <AppstoreOutlined /> },
  { label: "Zadať platbu", icon: <CreditCardOutlined /> },
  { label: "Šablóny", icon: <FolderOutlined /> },
  { label: "Ponuky", icon: <FileTextOutlined /> },
  { label: "Kontakty", icon: <TeamOutlined /> },
  { label: "Notifikácie", icon: <BellOutlined /> },
  { label: "Ďalšie možnosti", icon: <MoreOutlined /> },
  { label: "Správy", icon: <MailOutlined /> },
];

export const Header = ({ title = "" }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      {/* HEADER */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          zIndex: 1000,
          minHeight: 50,
          padding: "12px 25px",
          borderBottom: "4px solid #7f7f7f",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#5c5c5cff",
            fontWeight: 700,
            textAlign: "center",
            flex: 1,
          }}
        >
          {title}
        </div>

        <MenuOutlined
          style={{ fontSize: 20, cursor: "pointer" }}
          onClick={() => setIsOpenMenu(true)}
        />
      </Flex>

      {/* OVERLAY (тень фона) */}
      {isOpenMenu && (
        <div
          onClick={() => setIsOpenMenu(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.35)",
            zIndex: 999,
          }}
        />
      )}

      {/* RIGHT MENU */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 250,
          backgroundColor: "#fff",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.15)",
          zIndex: 1000,
          transform: isOpenMenu ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s ease",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Flex justify="flex-end">
          <CloseOutlined
            style={{ fontSize: 20, cursor: "pointer" }}
            onClick={() => setIsOpenMenu(false)}
          />
        </Flex>

        <div style={{ fontSize: 20, fontWeight: 600 }}>Menu</div>

        {menuItems.map((item, i) => (
          <div
            key={i}
            style={{
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>
    </>
  );
};
