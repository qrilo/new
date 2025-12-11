import { Spin } from "antd";

export const PageLoader = () => {
  const loadingPageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    zIndex: 9999,
  };

  return (
    <div style={loadingPageStyle}>
      <Spin size="small" />
    </div>
  );
};
