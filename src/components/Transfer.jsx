import { useState } from "react";

import "../styles/transfer.css";

function Transfer({
  balance = 0,
  setBalance,
  transactions = [],
  setTransactions,
  notifications = [],
  setNotifications
}) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function transferMoney() {
    const money = Number(amount);

    // 받는 분 확인
    if (!recipient.trim()) {
      setMessage("받는 분을 입력해주세요.");
      setMessageType("error");
      return;
    }

    // 금액 확인
    if (!money || money <= 0) {
      setMessage("이체할 금액을 입력해주세요.");
      setMessageType("error");
      return;
    }

    // 잔액 확인
    if (money > balance) {
      setMessage("입출금 계좌 잔액이 부족합니다.");
      setMessageType("error");
      return;
    }

    // 이체 후 잔액
    const newBalance = balance - money;

    setBalance(newBalance);

    localStorage.setItem(
      "balance",
      JSON.stringify(newBalance)
    );

    // 날짜
    const today = new Date()
      .toISOString()
      .substring(0, 10);

    // 거래내역 생성
    const newTransaction = {
      id: Date.now(),

      title: `${recipient.trim()} 이체`,

      type: "이체",

      amount: -money,

      date: today,

      afterBalance: newBalance,

      recipient: recipient.trim(),

      memo: memo.trim()
    };

    const updatedTransactions = [
      newTransaction,
      ...transactions
    ];

    setTransactions(updatedTransactions);

    localStorage.setItem(
      "transactions",
      JSON.stringify(updatedTransactions)
    );

    // 알림 생성
    const newNotification = {
      id: Date.now() + 1,

      title: "이체 완료",

      message: `${recipient.trim()}님에게 ${money.toLocaleString()}원을 이체했습니다.`,

      date: new Date().toLocaleString("ko-KR"),

      read: false
    };

    const updatedNotifications = [
      newNotification,
      ...notifications
    ];

    setNotifications(updatedNotifications);

    localStorage.setItem(
      "notifications",
      JSON.stringify(updatedNotifications)
    );

    // 입력값 초기화
    setRecipient("");
    setAmount("");
    setMemo("");

    // 완료 메시지
    setMessage(
      `${money.toLocaleString()}원 이체가 완료되었습니다.`
    );

    setMessageType("success");
  }

  return (
    <div className="transfer-page">

      {/* 상단 */}

      <div className="transfer-header">

        <h2>
          이체
        </h2>

      </div>


      {/* 현재 잔액 */}

      <div className="transfer-balance-card">

        <span>
          출금 가능 금액
        </span>

        <strong>
          ₩
          {Number(balance).toLocaleString()}
        </strong>

      </div>


      {/* 이체 입력 */}

      <div className="transfer-form">

        <p className="transfer-label">
          받는 분
        </p>

        <input
          className="transfer-input"
          type="text"
          placeholder="받는 분 이름"
          value={recipient}
          onChange={(e) =>
            setRecipient(e.target.value)
          }
        />


        <p className="transfer-label">
          이체 금액
        </p>

        <div className="transfer-amount-wrap">

          <input
            className="transfer-input transfer-amount-input"
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <span>
            원
          </span>

        </div>


        {/* 빠른 금액 */}

        <div className="transfer-quick-buttons">

          {[10000, 50000, 100000, 500000].map(
            (money) => (
              <button
                key={money}
                type="button"
                onClick={() =>
                  setAmount(String(money))
                }
              >
                {money >= 10000
                  ? `${money / 10000}만원`
                  : `${money.toLocaleString()}원`}
              </button>
            )
          )}

        </div>


        {/* 메모 */}

        <p className="transfer-label">
          메모
        </p>

        <input
          className="transfer-input"
          type="text"
          placeholder="메모를 입력해주세요. (선택)"
          value={memo}
          onChange={(e) =>
            setMemo(e.target.value)
          }
        />


        {/* 이체 버튼 */}

        <button
          className="transfer-button"
          type="button"
          onClick={transferMoney}
        >
          이체하기
        </button>


        {/* 결과 메시지 */}

        {message && (
          <p
            className={
              messageType === "success"
                ? "transfer-message success"
                : "transfer-message error"
            }
          >
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default Transfer;