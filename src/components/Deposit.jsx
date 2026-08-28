import { useState } from "react";
import "../styles/deposit.css";


function Deposit({
  deposits = [],
  setDeposits,
  setSelectedDeposit,
  transactions = [],
  setTransactions,
  notifications = [],
  setNotifications,
  setBalance
}) {

  const [amount, setAmount] =
    useState("");

  const [date, setDate] =
    useState("");

  const [message, setMessage] =
    useState("");


  function addDeposit() {

    const money =
      Number(amount);


    if (!money || money <= 0) {

      setMessage(
        "예치할 금액을 입력해주세요."
      );

      return;

    }


    if (!date) {

      setMessage(
        "예치 날짜를 선택해주세요."
      );

      return;

    }


    const currentBalance =
      Number(
        localStorage.getItem(
          "balance"
        ) || 0
      );


    if (money > currentBalance) {

      setMessage(
        "입출금 계좌 잔액이 부족합니다."
      );

      return;

    }


    const newDeposit = {

      id:
        Date.now(),

      amount:
        money,

      date:
        date

    };


    const updatedDeposits = [

      newDeposit,

      ...deposits

    ];


    setDeposits(
      updatedDeposits
    );


    localStorage.setItem(
      "deposits",
      JSON.stringify(
        updatedDeposits
      )
    );


    const newBalance =
      currentBalance -
      money;


    setBalance(
      newBalance
    );


    localStorage.setItem(
      "balance",
      JSON.stringify(
        newBalance
      )
    );


    const newTransaction = {

      id:
        Date.now() + 1,

      title:
        "예금 가입",

      type:
        "예치",

      amount:
        -money,

      date:
        new Date()
          .toISOString()
          .substring(0, 10),

      afterBalance:
        newBalance

    };


    const updatedTransactions = [

      newTransaction,

      ...transactions

    ];


    setTransactions(
      updatedTransactions
    );


    localStorage.setItem(
      "transactions",
      JSON.stringify(
        updatedTransactions
      )
    );


    const newNotification = {

      id:
        Date.now() + 2,

      icon:
        "💰",

      title:
        "예금 가입 완료",

      message:
        money.toLocaleString() +
        "원이 예금으로 등록되었습니다.",

      date:
        new Date().toLocaleString(
          "ko-KR"
        ),

      read:
        false,

      type:
        "deposit"

    };


    const updatedNotifications = [

      newNotification,

      ...notifications

    ];


    setNotifications(
      updatedNotifications
    );


    localStorage.setItem(
      "notifications",
      JSON.stringify(
        updatedNotifications
      )
    );


    setAmount("");

    setDate("");

    setMessage(
      "예금이 정상적으로 등록되었습니다."
    );

  }


  function deleteDeposit(id) {

    const target =
      deposits.find(
        item =>
          item.id === id
      );


    if (!target) {

      return;

    }


    const answer =
      window.confirm(
        "이 예금을 삭제할까요?\n예치 금액은 입출금 잔액으로 다시 반환됩니다."
      );


    if (!answer) {

      return;

    }


    const updatedDeposits =
      deposits.filter(
        item =>
          item.id !== id
      );


    setDeposits(
      updatedDeposits
    );


    localStorage.setItem(
      "deposits",
      JSON.stringify(
        updatedDeposits
      )
    );


    const currentBalance =
      Number(
        localStorage.getItem(
          "balance"
        ) || 0
      );


    const returnedAmount =
      Number(
        target.amount || 0
      );


    const newBalance =
      currentBalance +
      returnedAmount;


    setBalance(
      newBalance
    );


    localStorage.setItem(
      "balance",
      JSON.stringify(
        newBalance
      )
    );


    /* =========================
       예금 삭제 거래내역
    ========================= */

    const deleteTransaction = {

      id:
        Date.now(),

      title:
        "예금 해지",

      type:
        "해지",

      amount:
        returnedAmount,

      date:
        new Date()
          .toISOString()
          .substring(0, 10),

      afterBalance:
        newBalance

    };


    const updatedTransactions = [

      deleteTransaction,

      ...transactions

    ];


    setTransactions(
      updatedTransactions
    );


    localStorage.setItem(
      "transactions",
      JSON.stringify(
        updatedTransactions
      )
    );


    /* =========================
       예금 삭제 알림
    ========================= */

    const deleteNotification = {

      id:
        Date.now() + 1,

      icon:
        "💰",

      title:
        "예금 해지 완료",

      message:
        returnedAmount.toLocaleString() +
        "원이 입출금 계좌로 반환되었습니다.",

      date:
        new Date().toLocaleString(
          "ko-KR"
        ),

      read:
        false,

      type:
        "deposit"

    };


    const updatedNotifications = [

      deleteNotification,

      ...notifications

    ];


    setNotifications(
      updatedNotifications
    );


    localStorage.setItem(
      "notifications",
      JSON.stringify(
        updatedNotifications
      )
    );


    setMessage(
      "예금이 삭제되고 금액이 반환되었습니다."
    );

  }


  return (

    <div>

      <h2 className="deposit-title">
        💰 예금
      </h2>


      <div className="deposit-box">


        <p className="deposit-label">
          예치할 금액
        </p>


        <input
          className="deposit-input"
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          placeholder="예치 금액 입력"
        />


        <p className="deposit-label">
          예치 날짜
        </p>


        <input
          className="deposit-input"
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
        />


        <button
          className="deposit-button"
          onClick={addDeposit}
        >

          예금 등록

        </button>


        {message && (

          <p className="deposit-message">

            {message}

          </p>

        )}


      </div>


      <div className="deposit-list">


        <h3 className="deposit-list-title">
          등록된 예금
        </h3>


        {deposits.length === 0 ? (

          <div className="deposit-empty">

            <p>
              등록된 예금이 없습니다.
            </p>

          </div>

        ) : (

          deposits.map(
            (item) => (

              <div
                className="deposit-card"
                key={item.id}
              >


                <div
                  className="deposit-card-content"
                  onClick={() =>
                    setSelectedDeposit(
                      item
                    )
                  }
                >


                  <div className="deposit-card-header">

                    <span className="deposit-card-title">
                      예금
                    </span>

                  </div>


                  <div className="deposit-card-amount">

                    ₩{" "}

                    {Number(
                      item.amount || 0
                    ).toLocaleString()}

                  </div>


                  <div className="deposit-card-date">

                    예치일:{" "}

                    {item.date ||
                      "날짜 정보 없음"}

                  </div>


                </div>


                <button
                  className="deposit-delete"
                  onClick={() =>
                    deleteDeposit(
                      item.id
                    )
                  }
                >

                  삭제

                </button>


              </div>

            )

          )

        )}


      </div>


    </div>

  );

}


export default Deposit;