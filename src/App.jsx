import { useState, useEffect } from "react";

import Home from "./components/Home";
import Asset from "./components/Asset";
import AccountDetail from "./components/AccountDetail";
import Deposit from "./components/Deposit";
import DepositDetail from "./components/DepositDetail";
import Transaction from "./components/Transaction";
import TransactionDetail from "./components/TransactionDetail";
import Transfer from "./components/Transfer";
import Settings from "./components/Settings";
import Notification from "./components/Notification";
import Login from "./components/Login";

import "./styles/global.css";
import "./styles/bottom-nav.css";


function App() {

  /* =========================
     로그인
  ========================= */

  const [isLogin, setIsLogin] =
    useState(false);


  /* =========================
     페이지
  ========================= */

  const [page, setPage] =
    useState("home");


  /* =========================
     선택된 데이터
  ========================= */

  const [selectedDeposit, setSelectedDeposit] =
    useState(null);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [accountDetail, setAccountDetail] =
    useState(false);


  /* =========================
     다크모드
  ========================= */

  const [darkMode, setDarkMode] =
    useState(() => {

      return (
        localStorage.getItem("darkMode") === "true"
      );

    });


  useEffect(() => {

    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);


  /* =========================
     입출금 잔액
  ========================= */

  const [balance, setBalance] =
    useState(() => {

      const saved =
        localStorage.getItem("balance");

      return saved
        ? JSON.parse(saved)
        : 5000000;

    });


  useEffect(() => {

    localStorage.setItem(
      "balance",
      JSON.stringify(balance)
    );

  }, [balance]);


  /* =========================
     예금
  ========================= */

  const [deposits, setDeposits] =
    useState(() => {

      const saved =
        localStorage.getItem("deposits");

      return saved
        ? JSON.parse(saved)
        : [];

    });


  useEffect(() => {

    localStorage.setItem(
      "deposits",
      JSON.stringify(deposits)
    );

  }, [deposits]);


  /* =========================
     거래내역
  ========================= */

  const [transactions, setTransactions] =
    useState(() => {

      const saved =
        localStorage.getItem("transactions");

      return saved
        ? JSON.parse(saved)
        : [];

    });


  useEffect(() => {

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );

  }, [transactions]);


  /* =========================
     알림
  ========================= */

  const [notifications, setNotifications] =
    useState(() => {

      const saved =
        localStorage.getItem("notifications");

      return saved
        ? JSON.parse(saved)
        : [];

    });


  useEffect(() => {

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

  }, [notifications]);


  /* =========================
     읽지 않은 알림 개수
  ========================= */

  const unreadCount =
    notifications.filter(
      item => !item.read
    ).length;


  /* =========================
     예금 총액
  ========================= */

  const depositTotal =
    deposits.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );


  /* =========================
     총자산
  ========================= */

  const totalAssets =
    Number(balance || 0) +
    depositTotal;


  /* =========================
     로그인 처리
  ========================= */

  function handleLogin() {

    setIsLogin(true);

    setPage("home");

    setSelectedDeposit(null);

    setSelectedTransaction(null);

    setAccountDetail(false);

  }


  /* =========================
     로그인 전
  ========================= */

  if (!isLogin) {

    return (
      <Login
        onLogin={handleLogin}
      />
    );

  }


  /* =========================
     앱
  ========================= */

  return (

    <div
      className={
        darkMode
          ? "app-container dark"
          : "app-container"
      }
    >


      {/* =========================
          홈
      ========================= */}

      {page === "home" && (

        <Home
          balance={balance}
          totalAssets={totalAssets}
          deposits={deposits}
          setPage={setPage}
          unreadCount={unreadCount}
        />

      )}


      {/* =========================
          이체
      ========================= */}

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


      {/* =========================
          거래내역
      ========================= */}

      {page === "transaction" && (

        selectedTransaction ? (

          <TransactionDetail
            transaction={selectedTransaction}
            transactions={transactions}
            setTransactions={setTransactions}
            back={() => {

              setSelectedTransaction(null);

            }}
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


      {/* =========================
          자산
      ========================= */}

      {page === "asset" && (

        <Asset
          balance={balance}
          deposits={deposits}
          setPage={setPage}
          setSelectedDeposit={
            setSelectedDeposit
          }
        />

      )}


      {/* =========================
          입출금통장 상세
      ========================= */}

      {page === "account-detail" && (

        <AccountDetail
          balance={balance}
          transactions={transactions}
          back={() => {

            setAccountDetail(false);

            setPage("asset");

          }}
        />

      )}


      {/* =========================
          예금
      ========================= */}

      {page === "deposit" && (

        selectedDeposit ? (

          <DepositDetail
            deposit={selectedDeposit}

            back={() => {

              setSelectedDeposit(null);

              setPage("asset");

            }}

            deposits={deposits}

            setDeposits={setDeposits}

            setBalance={setBalance}

            transactions={transactions}

            setTransactions={setTransactions}

            notifications={notifications}

            setNotifications={setNotifications}
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


      {/* =========================
          알림
      ========================= */}

      {page === "notification" && (

        <Notification
          notifications={notifications}
          setNotifications={setNotifications}
          setPage={setPage}
        />

      )}


      {/* =========================
          설정
      ========================= */}

      {page === "settings" && (

        <Settings
          setIsLogin={setIsLogin}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

      )}


      {/* =========================
          하단 네비게이션
      ========================= */}

      <div className="bottom-nav">


        {/* 홈 */}

        <button
          className={
            page === "home"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }

          onClick={() => {

            setSelectedDeposit(null);

            setSelectedTransaction(null);

            setAccountDetail(false);

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


        {/* 이체 */}

        <button
          className={
            page === "transfer"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }

          onClick={() => {

            setSelectedDeposit(null);

            setSelectedTransaction(null);

            setAccountDetail(false);

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


        {/* 거래 */}

        <button
          className={
            page === "transaction"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }

          onClick={() => {

            setSelectedDeposit(null);

            setSelectedTransaction(null);

            setAccountDetail(false);

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


        {/* 자산 */}

        <button
          className={
            page === "asset" ||
            page === "account-detail" ||
            page === "deposit"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }

          onClick={() => {

            setSelectedDeposit(null);

            setSelectedTransaction(null);

            setAccountDetail(false);

            setPage("asset");

          }}
        >

          <span className="bottom-nav-icon">
            💰
          </span>

          <span className="bottom-nav-label">
            자산
          </span>

        </button>


      </div>

    </div>

  );

}


export default App;