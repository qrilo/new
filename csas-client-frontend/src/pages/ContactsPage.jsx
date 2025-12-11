import { ArrowLeftOutlined } from "@ant-design/icons";
import { Flex,  Skeleton, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useBank } from "../features/banks/hooks/useBank.jsx";

export const ContactsPage = () => {
  const navigate = useNavigate();

  const { data: bank } = useBank({
    enabled: true,
    refetchInterval: 5000,
  });

  return (
    <div>
      <div
        style={{
          padding: "40px 15px",
          height: 200,
          backgroundColor: "#3074ff",
        }}
      >
        <div style={{ display: "inline-block" }} onClick={() => navigate(-1)}>
          <ArrowLeftOutlined style={{ fontSize: 24, color: "#fff" }} />
        </div>
      </div>
      <div style={{ padding: "0 10px", marginTop: "-80px" }}>
        <div
          style={{
            width: "100%",
            borderRadius: 10,
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          <Flex justify="space-between">
            <Flex vertical>
              <Typography.Title
                level={3}
                style={{ margin: 0, color: "#0E2C5B", fontWeight: 500 }}
              >
                {bank?.contact?.fullname}
              </Typography.Title>
              <div style={{ color: "#808080", fontSize: 18 }}>
                Francosciho 912
              </div>
              <div style={{ color: "#808080", fontSize: 18 }}>
                098 01 Hnúšťa
              </div>
            </Flex>
            <Flex>
              <div>
                <Skeleton.Avatar size={60} shape="square" active={true} />
              </div>
            </Flex>
          </Flex>

          <Flex style={{ padding: "15px 0" }} gap={15} vertical>
            <div
              style={{
                borderRadius: 20,
                backgroundColor: "#f1f5ff",
                color: "#3074ff",
                fontWeight: 600,
                padding: "10px 10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Pošlete zprávu svém…
            </div>

            <div
              style={{
                borderRadius: 20,
                backgroundColor: "#f1f5ff",
                color: "#3074ff",
                fontWeight: 600,
                padding: "10px 10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Domluvte si schůzku
            </div>
          </Flex>
        </div>
      </div>

      <div
        style={{
          margin: "10px 10px",
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: "20px",
        }}
      >
        <Typography.Title
          level={3}
          style={{ margin: 0, color: "#0E2C5B", fontWeight: 500 }}
        >
          Klientské centrum
        </Typography.Title>
        <div style={{ color: "#808080", fontSize: 18 }}>
          Mí kolegové a kolegyně Vám rádi pomohou v jakoukoli denní dobu.
        </div>

        <a
          style={{
            display: "block",
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: "#f1f5ff",
            color: "#3074ff",
            fontWeight: 600,
            padding: "10px 10px",
            width: "100%",
            textAlign: "center",
            textDecoration: "none",
          }}
          href={`tel:${bank?.contact?.phone}`}
        >
          {bank?.contact?.phone }
        </a>
      </div>
    </div>
  );
};
