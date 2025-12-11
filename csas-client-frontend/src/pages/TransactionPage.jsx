import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "../features/accounts/hooks/useAccount";
import { LoaderPage } from "./LoaderPage";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Flex, Row, Typography } from "antd";
import { formatNumberWithSpaces } from "../shared/utils/numberFormat";

export const TransactionPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: account, isPending: isLoadingAccount } = useAccount({
    accountId: id,
    enabled: true,
    refetchInterval: 5000,
  });

  if (isLoadingAccount) {
    return <LoaderPage />;
  }

  let integerPart = "0";
  let decimalPart = "00";

  if (account?.balance != null) {
    [integerPart, decimalPart] = account.balance.toFixed(2).split(".");
  }

  const sortTransactionsByYearMonth = (transactions) => {
    return transactions?.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Сначала сравниваем годы
      if (dateA.getFullYear() !== dateB.getFullYear()) {
        return dateA.getFullYear() - dateB.getFullYear();
      }

      // Если годы одинаковые, сравниваем месяцы
      return dateA.getMonth() - dateB.getMonth();
    });
  };

  // Применяем сортировку
  const sortedTransactions = sortTransactionsByYearMonth(account.transactions);

  return (
    <div>
      <div
        style={{
          padding: "40px 15px",
          height: 200,
          backgroundColor: account?.hash,
        }}
      >
        <div
          style={{ display: "inline-block" }}
          onClick={() => navigate("/app/main")}
        >
          <ArrowLeftOutlined style={{ fontSize: 24, color: "#fff" }} />
        </div>
      </div>
      <div style={{ padding: "0 10px", marginTop: "-80px" }}>
        <div
          style={{
            width: "100%",
            borderRadius: 10,
            backgroundColor: "#fff",
            padding: "10px",
          }}
        >
          <Flex>
            <Typography.Title
              level={3}
              style={{ margin: 0, color: "#0E2C5B", fontWeight: 500 }}
            >
              Vaše produkty
            </Typography.Title>
          </Flex>

          <div style={{ fontSize: 18, fontWeight: 600 }}>
            <Flex style={{ color: "#00923F", fontWeight: 500 }}>
              <div style={{ fontSize: 26 }}>
                {formatNumberWithSpaces(integerPart)},
              </div>
              <div>{decimalPart}</div>
              <div style={{ fontSize: 26, marginLeft: 2 }}>Kč </div>
            </Flex>
          </div>

          <div style={{ color: "#747474ff", fontSize: 18, paddingBottom: 5 }}>
            <div>
              {formatNumberWithSpaces(integerPart)},{decimalPart} Kč vlastni
              prostredky
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "10px 10px",
        }}
      >
        <Row gutter={16} justify="space-between">
          <Col span={8}>
            <Word word="Transakce" selected={true} />
          </Col>
          <Col span={8}>
            <Word word="Funkce" />
          </Col>
          <Col span={8}>
            <Word word="Info" />
          </Col>
        </Row>
      </div>

      <Flex>
        <TransactionList transactions={account?.transactions} />
      </Flex>
    </div>
  );
};

const TransactionList = ({ transactions }) => {
  if (!transactions) {
    return;
  }

  const monthNames = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ];

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const grouped = {};
  sorted.forEach((tx) => {
    const date = new Date(tx.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(tx);
  });

  return (
    <div style={{ width: "100%", padding: "0 20px", borderRadius: 10 }}>
      {Object.entries(grouped).map(([key, txs]) => {
        const date = new Date(txs[0].date);
        const monthYear = `${
          monthNames[date.getMonth()]
        } ${date.getFullYear()}`;
        return (
          <div
            key={key}
            style={{
              color: "#0E2C5B",
              fontSize: 20,
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: 10 }}>
              {monthYear}
            </div>
            <div>
              {txs.map((tx) => {
                const [integerPart, decimalPart] = tx?.amount
                  ?.toFixed(2)
                  .split(".");

                return (
                  <div
                    key={tx._id}
                    style={{
                      padding: "5px 0",
                      marginBottom: 10,
                      backgroundColor: "#fff",
                      padding: "10px",
                      borderRadius: 10,
                    }}
                  >
                    <Flex justify="space-between">
                      <div
                        style={{
                          color: "#0E2C5B",
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        {tx.name}
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>
                          <Flex
                            style={{
                              color:
                                tx?.transactionType == "top"
                                  ? "#2BA84A"
                                  : "#0E2C5B",
                              fontWeight: 500,
                            }}
                          >
                            <div style={{ fontSize: 20 }}>
                              {formatNumberWithSpaces(integerPart)},
                            </div>
                            <div>{decimalPart}</div>
                            <div style={{ fontSize: 20, marginLeft: 2 }}>
                              Kč{" "}
                            </div>
                          </Flex>
                        </div>
                      </div>
                    </Flex>
                    <Flex
                      style={{
                        color: "#919191",
                        fontSize: 16,
                      }}
                    >
                      {new Date(tx.date).toLocaleDateString("ru-RU")}
                    </Flex>
                    <Flex
                      style={{
                        color: "#919191",
                        fontSize: 16,
                      }}
                    >
                      {tx.description}
                    </Flex>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#919191",
                          border: "1px solid #919191",
                          display: "inline-block",
                          padding: "2px",
                          borderRadius: 20,
                          fontSize: 10,
                        }}
                      >
                        {tx.type}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Word = ({ word, selected }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/app/loader")}
      style={{
        width: 120,
        fontWeight: 700,
        color: "#0070C0",
        fontSize: 18,
        padding: "5px 10px",
        backgroundColor: selected && "#fff",
        borderRadius: 10,
        textAlign: "center",
      }}
    >
      {word}
    </div>
  );
};
