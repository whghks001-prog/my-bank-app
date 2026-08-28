import { useState } from "react";

import Home from "./components/Home";
import Deposit from "./components/Deposit";
import DepositDetail from "./components/DepositDetail";
import Transaction from "./components/Transaction";
import TransactionDetail from "./components/TransactionDetail";
import Transfer from "./components/Transfer";
import Settings from "./components/Settings";
import Notification from "./components/Notification";

import "./styles/global.css";
import "./styles/bottom-nav.css";


function App() {

  const [isLogin, setIsLogin] =
    useState(false);

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [page, setPage] =
    useState("home");

  const [selectedDeposit, setSelectedDeposit] =
    useState(null);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);


  const [balance, setBalance] =
    useState(() => {

      const saved =
        localStorage.getItem("balance");

      return saved
        ? JSON.parse(saved)
        : 5000000;

    });


  const [deposits, setDeposits] =
    useState(() => {

      const saved =
        localStorage.getItem("deposits");

      return saved
        ? JSON.parse(saved)
        : [];

    });


  const [transactions, setTransactions] =
    useState(() => {

      const saved =
        localStorage.getItem("transactions");

      return saved
        ? JSON.parse(saved)
        : [];

    });


  const [notifications, setNotifications] =
    useState(() => {

      const saved =
        localStorage.getItem("notifications");

      return saved
        ? JSON.parse(saved)
        : [];

    });


  const unreadCount =
    notifications.filter(
      item => !item.read
    ).length;


  const totalAssets =
    balance +
    deposits.reduce(

      (sum, item) =>
        sum +
        Number(item.amount || 0),

      0

    );


  function addTestBalance() {

    const testBalance =
      5000000;

    setBalance(testBalance);

    localStorage.setItem(
      "balance",
      JSON.stringify(testBalance)
    );

    setError("");

  }


  function login() {

    const savedPassword =
      localStorage.getItem(
        "appPassword"
      ) || "1234";


    if (
      password ===
      savedPassword
    ) {

      setIsLogin(true);

      setError("");

      setPassword("");

    } else {

      setError(
        "비밀번호가 틀렸습니다."
      );

    }

  }


  if (!isLogin) {

    return (

      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7f6"
        }}
      >

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            width: "90%",
            maxWidth: "360px",
            boxSizing: "border-box"
          }}
        >

          <h2>
            🏦 MG 스마트뱅크
          </h2>


          <p>
            안전한 금융생활을 시작하세요.
          </p>


          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter"
              ) {

                login();

              }

            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              boxSizing: "border-box"
            }}
          />


          <button
            onClick={login}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "12px",
              background: "#00843D",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >

            로그인

          </button>


          {error && (

            <p
              style={{
                color: "#e53935",
                fontSize: "14px"
              }}
            >

              {error}

            </p>

          )}

        </div>

      </div>

    );

  }


  return (

    <div
      style={{
        maxWidth: "420px",
        margin: "auto",
        background: "#f5f7f6",
        minHeight: "100vh",
        padding: "20px",
        paddingBottom: "100px",
        boxSizing: "border-box"
      }}
    >


      {page === "home" && (

        <>

          <Home
            balance={balance}
            totalAssets={totalAssets}
            deposits={deposits}
            setPage={setPage}
            unreadCount={unreadCount}
          />


          <button
            onClick={addTestBalance}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "13px",
              border: "none",
              borderRadius: "12px",
              background: "#eeeeee",
              color: "#555",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >

            🧪 테스트용 잔액 500만원 넣기

          </button>

        </>

      )}


      {page === "transfer" && (

        <Transfer
          balance={balance}
          setBalance={setBalance}
          transactions={transactions}
          setTransactions={setTransactions}
          notifications={notifications}
          setNotifications={setNotifications}
        />

      )}


      {page === "transaction" && (

        selectedTransaction ? (

          <TransactionDetail
            transaction={selectedTransaction}
            back={() =>
              setSelectedTransaction(null)
            }
          />

        ) : (

          <Transaction
            transactions={transactions}
            setTransactions={setTransactions}
            setSelectedTransaction={
              setSelectedTransaction
            }
          />

        )

      )}


      {page === "deposit" && (

        selectedDeposit ? (

          <DepositDetail
            deposit={selectedDeposit}
            back={() =>
              setSelectedDeposit(null)
            }
          />

        ) : (

          <Deposit
            deposits={deposits}
            setDeposits={setDeposits}
            setSelectedDeposit={
              setSelectedDeposit
            }
            transactions={transactions}
            setTransactions={setTransactions}
            notifications={notifications}
            setNotifications={setNotifications}
            setBalance={setBalance}
          />

        )

      )}


      {page === "notification" && (

        <Notification
          notifications={notifications}
          setNotifications={setNotifications}
          setPage={setPage}
        />

      )}


      {page === "settings" && (

        <Settings
          setIsLogin={setIsLogin}
        />

      )}


      {/* =========================
          하단 네비게이션
      ========================= */}

      <div className="bottom-nav">


        <button
          className={
            page === "home"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }

          onClick={() => {

            setSelectedDeposit(null);

            setSelectedTransaction(null);

            setPage("home");

          }}
        >

          <span className="bottom-nav-icon">
            🏠
          </span>

          <span className="bottom-nav-label">
            홈
          </span>

        </button>


        <button
          className={
            page === "transfer"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }

          onClick={() => {

            setPage("transfer");

          }}
        >

          <span className="bottom-nav-icon">
            💸
          </span>

          <span className="bottom-nav-label">
            이체
          </span>

        </button>


        <button
          className={
            page === "transaction"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }

          onClick={() => {

            setSelectedTransaction(null);

            setPage("transaction");

          }}
        >

          <span className="bottom-nav-icon">
            💳
          </span>

          <span className="bottom-nav-label">
            거래
          </span>

        </button>


        <button
          className={
            page === "deposit"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }

          onClick={() => {

            setSelectedDeposit(null);

            setPage("deposit");

          }}
        >

          <span className="bottom-nav-icon">
            💰
          </span>

          <span className="bottom-nav-label">
            예금
          </span>

        </button>


      </div>


    </div>

  );

}


export default App;