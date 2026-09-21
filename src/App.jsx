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

  const [isLogin, setIsLogin] =
    useState(false);

  const [page, setPage] =
    useState("home");

  const [selectedDeposit, setSelectedDeposit] =
    useState(null);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [accountDetail, setAccountDetail] =
    useState(false);

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

     기본 잔액 = 3,000만원
  ========================= */

  const [balance, setBalance] =
    useState(30000000);

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

     2026년 6월 25일
     입출금통장 3,000만원 입금
     
     최초 1회만 자동 생성
  ========================= */

  const [transactions, setTransactions] =
    useState(() => {

      const saved =
        localStorage.getItem("transactions");

      const existingTransactions =
        saved
          ? JSON.parse(saved)
          : [];

      const initialDepositExists =
        existingTransactions.some(
          item =>
            item.initialDeposit === true
        );

      if (!initialDepositExists) {

        const initialTransaction = {
          id: "initial-balance-2026-06-25",
          initialDeposit: true,

          type: "입금",

          title: "입금",
          description: "입출금통장",

          amount: 30000000,

          date: "2026-06-25",
          createdAt: "2026-06-25T00:00:00",

          balance: 30000000
        };

        return [
          initialTransaction,
          ...existingTransactions
        ];
      }

      return existingTransactions;
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
     총자산
  ========================= */

  const unreadCount =
    notifications.filter(
      item => !item.read
    ).length;

  const depositTotal =
    deposits.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

  const totalAssets =
    Number(balance || 0) +
    depositTotal;


  /* =========================
     로그인
  ========================= */

  function handleLogin() {

    setIsLogin(true);
    setPage("home");
    setSelectedDeposit(null);
    setSelectedTransaction(null);
    setAccountDetail(false);
  }


  if (!isLogin) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }


  return (
    <div
      className={
        darkMode
          ? "app-container dark"
          : "app-container"
      }
    >

      {page === "home" && (
        <Home
          balance={balance}
          totalAssets={totalAssets}
          deposits={deposits}
          setPage={setPage}
          unreadCount={unreadCount}
        />
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
          darkMode={darkMode}
          setDarkMode={setDarkMode}
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