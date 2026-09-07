import { useState, useEffect } from "react";

import Home from "./components/Home";
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


  /*
    =========================
    다크모드
    =========================
  */

  const [darkMode, setDarkMode] =
    useState(() => {

      return (
        localStorage.getItem(
          "darkMode"
        ) === "true"
      );

    });


  useEffect(() => {

    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

  }, [darkMode]);


  /*
    =========================
    잔액
    =========================
  */

  const [balance, setBalance] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "balance"
        );

      return saved
        ? JSON.parse(saved)
        : 5000000;

    });


  /*
    =========================
    예금
    =========================
  */

  const [deposits, setDeposits] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "deposits"
        );

      return saved
        ? JSON.parse(saved)
        : [];

    });


  /*
    =========================
    거래내역
    =========================
  */

  const [transactions, setTransactions] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "transactions"
        );

      return saved
        ? JSON.parse(saved)
        : [];

    });


  /*
    =========================
    알림
    =========================
  */

  const [notifications, setNotifications] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "notifications"
        );

      return saved
        ? JSON.parse(saved)
        : [];

    });


  const unreadCount =
    notifications.filter(
      item => !item.read
    ).length;


  /*
    =========================
    총자산
    =========================
  */

  const totalAssets =
    balance +
    deposits.reduce(

      (sum, item) =>
        sum +
        Number(
          item.amount || 0
        ),

      0

    );


  /*
    =========================
    테스트 잔액
    =========================
  */

  function addTestBalance() {

    const testBalance =
      5000000;


    setBalance(
      testBalance
    );


    localStorage.setItem(
      "balance",
      JSON.stringify(
        testBalance
      )
    );

  }


  /*
    =========================
    로그인 성공
    =========================
  */

  function handleLogin() {

    setIsLogin(true);

    setPage("home");

    setSelectedDeposit(null);

    setSelectedTransaction(null);

  }


  /*
    =========================
    로그인 화면
    =========================
  */

  if (!isLogin) {

    return (

      <Login
        onLogin={
          handleLogin
        }
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


      {/* =========================
          홈
      ========================= */}

      {page === "home" && (

        <>

          <Home
            balance={balance}
            totalAssets={totalAssets}
            deposits={deposits}
            setPage={setPage}
            unreadCount={
              unreadCount
            }
          />


          <button
            onClick={
              addTestBalance
            }
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "13px",
              border: "none",
              borderRadius: "12px",
              background:
                darkMode
                  ? "#30343a"
                  : "#eeeeee",
              color:
                darkMode
                  ? "#dddddd"
                  : "#555",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >

            🧪 테스트용 잔액 500만원 넣기

          </button>

        </>

      )}


      {/* =========================
          이체
      ========================= */}

      {page === "transfer" && (

        <Transfer
          balance={balance}
          setBalance={setBalance}
          transactions={
            transactions
          }
          setTransactions={
            setTransactions
          }
          notifications={
            notifications
          }
          setNotifications={
            setNotifications
          }
        />

      )}


      {/* =========================
          거래내역
      ========================= */}

      {page === "transaction" && (

        selectedTransaction ? (

          <TransactionDetail
            transaction={
              selectedTransaction
            }
            back={() =>
              setSelectedTransaction(
                null
              )
            }
          />

        ) : (

          <Transaction
            transactions={
              transactions
            }
            setTransactions={
              setTransactions
            }
            setSelectedTransaction={
              setSelectedTransaction
            }
          />

        )

      )}


      {/* =========================
          예금
      ========================= */}

      {page === "deposit" && (

        selectedDeposit ? (

          <DepositDetail
            deposit={
              selectedDeposit
            }
            back={() =>
              setSelectedDeposit(
                null
              )
            }
          />

        ) : (

          <Deposit
            deposits={
              deposits
            }
            setDeposits={
              setDeposits
            }
            setSelectedDeposit={
              setSelectedDeposit
            }
            transactions={
              transactions
            }
            setTransactions={
              setTransactions
            }
            notifications={
              notifications
            }
            setNotifications={
              setNotifications
            }
            setBalance={
              setBalance
            }
          />

        )

      )}


      {/* =========================
          알림
      ========================= */}

      {page === "notification" && (

        <Notification
          notifications={
            notifications
          }
          setNotifications={
            setNotifications
          }
          setPage={
            setPage
          }
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


        <button
          className={
            page === "home"
              ? "bottom-nav-item active"
              : "bottom-nav-item"
          }
          onClick={() => {

            setSelectedDeposit(
              null
            );

            setSelectedTransaction(
              null
            );

            setPage(
              "home"
            );

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

            setPage(
              "transfer"
            );

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

            setSelectedTransaction(
              null
            );

            setPage(
              "transaction"
            );

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

            setSelectedDeposit(
              null
            );

            setPage(
              "deposit"
            );

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