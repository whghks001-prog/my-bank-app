import { useState } from "react";
import "../styles/deposit.css";

function Deposit({
  deposits,
  setDeposits,
  setSelectedDeposit,
  transactions,
  setTransactions,
  notifications,
  setNotifications,
  setBalance
}) {

  /*
    =========================
    가입 화면 여부
    =========================
  */

  const [showSignup, setShowSignup] =
    useState(false);


  /*
    =========================
    입력값
    =========================
  */

  const [amount, setAmount] =
    useState("");

  const [date, setDate] =
    useState("");


  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");


  /*
    =========================
    예금 가입
    =========================
  */

  function addDeposit() {

    const money =
      Number(amount);


    if (!money || money <= 0) {

      setMessage(
        "예치할 금액을 입력해주세요."
      );

      setMessageType("error");

      return;

    }


    if (!date) {

      setMessage(
        "예치 날짜를 선택해주세요."
      );

      setMessageType("error");

      return;

    }


    const savedBalance =
      localStorage.getItem(
        "balance"
      );


    const currentBalance =
      savedBalance
        ? JSON.parse(savedBalance)
        : 5000000;


    if (
      money >
      currentBalance
    ) {

      setMessage(
        "현재 잔액이 부족합니다."
      );

      setMessageType("error");

      return;

    }


    /*
      새로운 예금
    */

    const newDeposit = {

      id: Date.now(),

      amount: money,

      date: date

    };


    const newDeposits = [

      newDeposit,

      ...deposits

    ];


    setDeposits(
      newDeposits
    );


    localStorage.setItem(
      "deposits",
      JSON.stringify(
        newDeposits
      )
    );


    /*
      잔액 차감
    */

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


    /*
      거래내역 생성
    */

    const newTransaction = {

      id: Date.now() + 1,

      title:
        "예금 가입",

      type:
        "예치",

      amount:
        -money,

      date:
        new Date().toLocaleDateString(
          "ko-KR"
        ),

      afterBalance:
        newBalance

    };


    const newTransactions = [

      newTransaction,

      ...transactions

    ];


    setTransactions(
      newTransactions
    );


    localStorage.setItem(
      "transactions",
      JSON.stringify(
        newTransactions
      )
    );


    /*
      알림 생성
    */

    const newNotification = {

      id:
        Date.now() + 2,

      icon:
        "💰",

      title:
        "예금 가입 완료",

      message:
        `${money.toLocaleString()}원이 예금으로 등록되었습니다.`,

      date:
        new Date().toLocaleDateString(
          "ko-KR"
        ),

      read:
        false

    };


    const newNotifications = [

      newNotification,

      ...notifications

    ];


    setNotifications(
      newNotifications
    );


    localStorage.setItem(
      "notifications",
      JSON.stringify(
        newNotifications
      )
    );


    /*
      입력 초기화
    */

    setAmount("");

    setDate("");

    setMessage(
      "예금 가입이 완료되었습니다."
    );

    setMessageType(
      "success"
    );


    /*
      잠시 후 목록으로 이동
    */

    setTimeout(() => {

      setShowSignup(false);

      setMessage("");

      setMessageType("");

    }, 1000);

  }


  /*
    =========================
    예금 삭제
    =========================
  */

  function deleteDeposit(id) {

    const target =
      deposits.find(
        item =>
          item.id === id
      );


    if (!target) {
      return;
    }


    const result =
      window.confirm(
        `${Number(target.amount).toLocaleString()}원 예금을 삭제하시겠습니까?`
      );


    if (!result) {
      return;
    }


    const newDeposits =
      deposits.filter(
        item =>
          item.id !== id
      );


    setDeposits(
      newDeposits
    );


    localStorage.setItem(
      "deposits",
      JSON.stringify(
        newDeposits
      )
    );


    /*
      삭제한 예금 금액을
      잔액으로 반환
    */

    const savedBalance =
      localStorage.getItem(
        "balance"
      );


    const currentBalance =
      savedBalance
        ? JSON.parse(savedBalance)
        : 0;


    const newBalance =
      currentBalance +
      Number(target.amount);


    setBalance(
      newBalance
    );


    localStorage.setItem(
      "balance",
      JSON.stringify(
        newBalance
      )
    );


    setMessage(
      "예금이 삭제되었습니다."
    );

    setMessageType(
      "success"
    );

  }


  /*
    =========================
    가입 화면
    =========================
  */

  if (showSignup) {

    return (

      <div className="deposit-page">

        <div className="deposit-header">

          <button
            className="deposit-back-button"
            onClick={() => {

              setShowSignup(false);

              setMessage("");

              setMessageType("");

            }}
          >
            ←
          </button>

          <div>

            <h2>
              예금 상품 가입
            </h2>

            <p>
              원하는 금액을 예금으로 등록하세요.
            </p>

          </div>

        </div>


        <div className="deposit-box">

          <div className="deposit-product-icon">
            💰
          </div>

          <h3 className="deposit-product-title">
            일반 예금
          </h3>

          <p className="deposit-product-description">
            자유롭게 금액과 날짜를 설정할 수 있는
            연습용 예금 상품입니다.
          </p>


          <label className="deposit-label">
            예치 금액
          </label>


          <div className="deposit-amount-wrap">

            <input
              className="deposit-input"
              type="number"
              inputMode="numeric"
              placeholder="예치할 금액"
              value={amount}
              onChange={e =>
                setAmount(
                  e.target.value
                )
              }
            />

            <span>
              원
            </span>

          </div>


          <label className="deposit-label">
            예치 날짜
          </label>


          <input
            className="deposit-input"
            type="date"
            value={date}
            onChange={e =>
              setDate(
                e.target.value
              )
            }
          />


          <button
            className="deposit-button"
            onClick={
              addDeposit
            }
          >
            상품 가입하기
          </button>


          {message && (

            <p
              className={
                messageType ===
                "success"
                  ? "deposit-message success"
                  : "deposit-message error"
              }
            >
              {message}
            </p>

          )}

        </div>


        <div className="deposit-notice">

          💡 예치한 금액은 현재 잔액에서
          차감되며, 실제 금융거래는 발생하지 않습니다.

        </div>

      </div>

    );

  }


  /*
    =========================
    등록된 예금 목록
    =========================
  */

  return (

    <div className="deposit-page">


      {/* 헤더 */}

      <div className="deposit-header">

        <div>

          <h2>
            내 예금
          </h2>

          <p>
            등록된 예금 상품을 확인하세요.
          </p>

        </div>

      </div>


      {/* 등록된 예금 */}

      <div className="deposit-list">

        <h3 className="deposit-list-title">
          등록된 예금
        </h3>


        {deposits.length === 0 ? (

          <div className="deposit-empty">

            <div className="deposit-empty-icon">
              💰
            </div>

            <strong>
              등록된 예금이 없습니다.
            </strong>

            <p>
              아래 상품가입하기 버튼을 눌러
              예금을 등록해보세요.
            </p>

          </div>

        ) : (

          deposits.map(
            deposit => (

              <div
                className="deposit-card"
                key={
                  deposit.id
                }
              >

                <div
                  className="deposit-card-content"
                  onClick={() =>
                    setSelectedDeposit(
                      deposit
                    )
                  }
                >

                  <div className="deposit-card-header">

                    <div>

                      <div className="deposit-card-title">
                        💰 일반 예금
                      </div>

                      <div className="deposit-card-date">
                        예치일&nbsp;
                        {deposit.date}
                      </div>

                    </div>


                    <div className="deposit-card-amount">

                      {Number(
                        deposit.amount
                      ).toLocaleString()}

                      <span>
                        원
                      </span>

                    </div>

                  </div>

                </div>


                <button
                  className="deposit-delete"
                  onClick={() =>
                    deleteDeposit(
                      deposit.id
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


      {/* =========================
          상품가입하기
      ========================= */}

      <button
        className="deposit-product-button"
        onClick={() => {

          setShowSignup(true);

          setMessage("");

          setMessageType("");

        }}
      >

        <span className="deposit-product-button-icon">
          ＋
        </span>

        <span>
          상품가입하기
        </span>

      </button>


      <div className="deposit-notice">

        💡 이 앱은 실제 금융거래가 아닌
        연습용 금융 앱입니다.

      </div>


    </div>

  );

}


export default Deposit;