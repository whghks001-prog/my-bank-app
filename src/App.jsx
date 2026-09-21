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
     입출금통장 잔액
     
     최초 실행:
     30,000,000원

     이후:
     localStorage에 저장된
     실제 잔액을 계속 사용
  ========================= */

  const [balance, setBalance] =
    useState(() => {

      const saved =
        localStorage.getItem("balance");


      /* 기존 잔액이 있으면
         그대로 사용 */

      if (saved !== null) {

        const parsed =
          Number(saved);


        if (!Number.isNaN(parsed)) {
          return parsed;
        }

      }


      /* 최초 실행 */

      return 30000000;

    });


  /* =========================
     잔액 저장
     
     예금 / 이체 / 입금 등으로
     balance가 변경될 때마다 저장
  ========================= */

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


      if (!saved) {
        return [];
      }


      try {

        return JSON.parse(saved);

      } catch {

        return [];

      }

    });


  useEffect(() => {

    localStorage.setItem(
      "deposits",
      JSON.stringify(deposits)
    );

  }, [deposits]);


  /* =========================
     거래 날짜 변환
     
     지원:
     2026. 6. 25.
     2026. 06. 25.
     2026-06-25
  ========================= */

  function getTransactionTime(transaction) {

    /* =========================
       createdAt이 있으면
       createdAt 우선 사용
    ========================= */

    if (transaction?.createdAt) {

      const createdTime =
        new Date(
          transaction.createdAt
        ).getTime();


      if (!Number.isNaN(createdTime)) {
        return createdTime;
      }

    }


    /* =========================
       date 문자열 처리
    ========================= */

    if (transaction?.date) {

      const text =
        String(
          transaction.date
        ).trim();


      /* YYYY-MM-DD */

      const isoMatch =
        text.match(
          /^(\d{4})-(\d{1,2})-(\d{1,2})/
        );


      if (isoMatch) {

        return new Date(
          Number(isoMatch[1]),
          Number(isoMatch[2]) - 1,
          Number(isoMatch[3])
        ).getTime();

      }


      /* YYYY. M. D.
         YYYY. MM. DD. */

      const koreanMatch =
        text.match(
          /(\d{4})\D+(\d{1,2})\D+(\d{1,2})/
        );


      if (koreanMatch) {

        return new Date(
          Number(koreanMatch[1]),
          Number(koreanMatch[2]) - 1,
          Number(koreanMatch[3])
        ).getTime();

      }


      /* 그 외 형식 */

      const parsed =
        new Date(text).getTime();


      if (!Number.isNaN(parsed)) {
        return parsed;
      }

    }


    return 0;

  }


  /* =========================
     거래내역
     
     최초 실행:
     2026. 6. 24.
     +30,000,000원

     이후 거래내역은
     절대로 초기화하지 않음.
  ========================= */

  const [transactions, setTransactions] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "transactions"
        );


      let existingTransactions = [];


      if (saved) {

        try {

          existingTransactions =
            JSON.parse(saved);

        } catch {

          existingTransactions = [];

        }

      }


      /* =========================
         초기 입금 찾기
      ========================= */

      const initialDepositIndex =
        existingTransactions.findIndex(
          (item) =>
            item.initialDeposit === true
        );


      /* =========================
         기존 초기 입금이 있는 경우
         날짜 / 금액만 정상화
      ========================= */

      if (
        initialDepositIndex !== -1
      ) {

        existingTransactions[
          initialDepositIndex
        ] = {

          ...existingTransactions[
            initialDepositIndex
          ],

          id:
            "initial-balance-2026-06-24",

          initialDeposit:
            true,

          title:
            "입금",

          type:
            "입금",

          amount:
            30000000,

          date:
            "2026. 6. 24.",

          createdAt:
            "2026-06-24T00:00:00",

          afterBalance:
            30000000

        };

      }


      /* =========================
         초기 입금이 아예 없으면
         최초 1회만 생성
      ========================= */

      if (
        initialDepositIndex === -1
      ) {

        existingTransactions.push({

          id:
            "initial-balance-2026-06-24",

          initialDeposit:
            true,

          title:
            "입금",

          type:
            "입금",

          amount:
            30000000,

          date:
            "2026. 6. 24.",

          createdAt:
            "2026-06-24T00:00:00",

          afterBalance:
            30000000

        });

      }


      /* =========================
         최신순 정렬
      ========================= */

      existingTransactions.sort(
        (a, b) => {

          return (
            getTransactionTime(b) -
            getTransactionTime(a)
          );

        }
      );


      return existingTransactions;

    });


  /* =========================
     거래내역 저장
     
     거래가 추가되거나 수정되면
     최신순으로 저장
  ========================= */

  useEffect(() => {

    const sortedTransactions =
      [...transactions].sort(
        (a, b) => {

          return (
            getTransactionTime(b) -
            getTransactionTime(a)
          );

        }
      );


    localStorage.setItem(
      "transactions",
      JSON.stringify(
        sortedTransactions
      )
    );

  }, [transactions]);


  /* =========================
     알림
  ========================= */

  const [notifications, setNotifications] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "notifications"
        );


      if (!saved) {
        return [];
      }


      try {

        return JSON.parse(saved);

      } catch {

        return [];

      }

    });


  useEffect(() => {

    localStorage.setItem(
      "notifications",
      JSON.stringify(
        notifications
      )
    );

  }, [notifications]);


  /* =========================
     총자산
     
     입출금통장 + 예금
  ========================= */

  const depositTotal =
    deposits.reduce(
      (sum, item) =>
        sum +
        Number(
          item.amount || 0
        ),
      0
    );


  const totalAssets =
    Number(balance || 0) +
    depositTotal;


  /* =========================
     읽지 않은 알림
  ========================= */

  const unreadCount =
    notifications.filter(
      (item) =>
        !item.read
    ).length;


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


  /* =========================
     로그인 화면
  ========================= */

  if (!isLogin) {

    return (

      <Login
        onLogin={
          handleLogin
        }
      />

    );

  }


  /* =========================
     앱 화면
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
          unreadCount={
            unreadCount
          }
        />

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

            transactions={
              transactions
            }

            setTransactions={
              setTransactions
            }

            back={() => {

              setSelectedTransaction(
                null
              );

            }}

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
          자산
      ========================= */}

      {page === "asset" && (

        <Asset
          balance={
            balance
          }

          deposits={
            deposits
          }

          setPage={
            setPage
          }

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
          balance={
            balance
          }

          transactions={
            transactions
          }

          back={() => {

            setAccountDetail(
              false
            );

            setPage(
              "asset"
            );

          }}

        />

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

            back={() => {

              setSelectedDeposit(
                null
              );

              setPage(
                "asset"
              );

            }}

            deposits={
              deposits
            }

            setDeposits={
              setDeposits
            }

            setBalance={
              setBalance
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
          setIsLogin={
            setIsLogin
          }

          darkMode={
            darkMode
          }

          setDarkMode={
            setDarkMode
          }

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

            setSelectedDeposit(
              null
            );

            setSelectedTransaction(
              null
            );

            setAccountDetail(
              false
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


        {/* 이체 */}

        <button
          className={
            page === "transfer"
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

            setAccountDetail(
              false
            );

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


        {/* 거래 */}

        <button
          className={
            page === "transaction"
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

            setAccountDetail(
              false
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

            setSelectedDeposit(
              null
            );

            setSelectedTransaction(
              null
            );

            setAccountDetail(
              false
            );

            setPage(
              "asset"
            );

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