import "../styles/deposit-detail.css";

function DepositDetail({
  deposit,
  back,
  deposits,
  setDeposits,
  setBalance,
  transactions,
  setTransactions,
  notifications,
  setNotifications
}) {

  if (!deposit) {
    return null;
  }


  /* =========================
     기본 정보
  ========================= */

  const amount =
    Number(deposit.amount || 0);


  /* =========================
     예금 금리
  ========================= */

  const interestRate = 3.4;


  /* =========================
     계좌번호
  ========================= */

  const accountNumber =
    `900-${String(
      deposit.id || Date.now()
    ).slice(-6)}-${String(
      deposit.id || Date.now()
    ).slice(-4)}`;


  /* =========================
     가입일
  ========================= */

  function getStartDate() {

    if (!deposit.date) {
      return new Date();
    }

    const date =
      new Date(
        `${deposit.date}T00:00:00`
      );

    if (Number.isNaN(date.getTime())) {
      return new Date();
    }

    return date;
  }


  const startDate =
    getStartDate();


  /* =========================
     만기일
     가입일 + 15개월
  ========================= */

  function getMaturityDate() {

    const maturity =
      new Date(startDate);

    maturity.setMonth(
      maturity.getMonth() + 15
    );

    return maturity;
  }


  const maturityDate =
    getMaturityDate();


  /* =========================
     날짜 포맷
  ========================= */

  function formatDate(date) {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}.${month}.${day}`;
  }


  /* =========================
     남은 기간
  ========================= */

  function getRemainingText() {

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    const target =
      new Date(maturityDate);

    target.setHours(
      0,
      0,
      0,
      0
    );


    const difference =
      target.getTime() -
      today.getTime();


    if (difference <= 0) {
      return "만기 도래";
    }


    const days =
      Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
      );


    const years =
      Math.floor(
        days / 365
      );


    const remainingAfterYear =
      days -
      years * 365;


    const months =
      Math.floor(
        remainingAfterYear / 30
      );


    if (
      years > 0 &&
      months > 0
    ) {
      return `${years}년 ${months}개월 남음`;
    }


    if (years > 0) {
      return `${years}년 남음`;
    }


    if (months > 0) {
      return `${months}개월 남음`;
    }


    return `${days}일 남음`;
  }


  const remainingText =
    getRemainingText();


  /* =========================
     진행률
  ========================= */

  function getProgress() {

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    const start =
      new Date(startDate);

    start.setHours(
      0,
      0,
      0,
      0
    );


    const end =
      new Date(maturityDate);

    end.setHours(
      0,
      0,
      0,
      0
    );


    const total =
      end.getTime() -
      start.getTime();


    const elapsed =
      today.getTime() -
      start.getTime();


    if (elapsed <= 0) {
      return 0;
    }


    if (elapsed >= total) {
      return 100;
    }


    return Math.round(
      (elapsed / total) * 100
    );
  }


  const progress =
    getProgress();


  /* =========================
     예금 해지
  ========================= */

  function cancelDeposit() {

    const confirmCancel =
      window.confirm(
        `${amount.toLocaleString()}원을 예금에서 해지하시겠습니까?\n\n해지한 금액은 입출금통장으로 반환됩니다.`
      );


    if (!confirmCancel) {
      return;
    }


    /* =========================
       현재 예금 찾기
    ========================= */

    const targetDeposit =
      deposits.find(
        item =>
          item.id === deposit.id
      );


    if (!targetDeposit) {

      window.alert(
        "이미 해지되었거나 존재하지 않는 예금입니다."
      );

      back();

      return;
    }


    const refundAmount =
      Number(
        targetDeposit.amount || 0
      );


    /* =========================
       예금 삭제
    ========================= */

    const updatedDeposits =
      deposits.filter(
        item =>
          item.id !== deposit.id
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


    /* =========================
       현재 입출금 잔액
    ========================= */

    const savedBalance =
      localStorage.getItem(
        "balance"
      );


    const currentBalance =
      savedBalance !== null
        ? Number(savedBalance)
        : 0;


    /* =========================
       예금 금액 반환
    ========================= */

    const newBalance =
      currentBalance +
      refundAmount;


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
       거래내역
    ========================= */

    const newTransaction = {

      id: Date.now(),

      title:
        "예금 해지",

      type:
        "입금",

      amount:
        refundAmount,

      date:
        new Date().toLocaleDateString(
          "ko-KR"
        ),

      afterBalance:
        newBalance

    };


    const currentTransactions =
      Array.isArray(transactions)
        ? transactions
        : [];


    const updatedTransactions = [

      newTransaction,

      ...currentTransactions

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
       알림
    ========================= */

    const newNotification = {

      id:
        Date.now() + 1,

      icon:
        "💰",

      title:
        "예금 해지 완료",

      message:
        `${refundAmount.toLocaleString()}원이 입출금통장으로 반환되었습니다.`,

      date:
        new Date().toLocaleDateString(
          "ko-KR"
        ),

      read:
        false

    };


    const currentNotifications =
      Array.isArray(notifications)
        ? notifications
        : [];


    const updatedNotifications = [

      newNotification,

      ...currentNotifications

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


    /* =========================
       자산 화면으로 이동
    ========================= */

    back();
  }


  /* =========================
     화면
  ========================= */

  return (

    <div className="deposit-detail-page">


      {/* =========================
          상단
      ========================= */}

      <div className="deposit-detail-top">

        <button
          type="button"
          className="deposit-back"
          onClick={back}
        >
          ←
        </button>

        <h2>
          예금 상세
        </h2>

      </div>


      {/* =========================
          예금 메인 카드
      ========================= */}

      <div className="deposit-detail-card">


        <div className="deposit-detail-account-label">
          계좌번호
        </div>


        <div className="deposit-detail-account-number">
          {accountNumber}
        </div>


        <div className="deposit-detail-amount">
          {amount.toLocaleString()}원
        </div>


        <div className="deposit-detail-summary">

          <span>
            연 {interestRate}%
          </span>

          <span className="deposit-detail-dot">
            ·
          </span>

          <span>
            {remainingText}
          </span>

        </div>


        {/* =========================
            게이지
        ========================= */}

        <div className="deposit-detail-progress-area">


          <div className="deposit-detail-progress-date">

            <span>
              {formatDate(startDate)}
            </span>

            <span>
              {formatDate(maturityDate)}
            </span>

          </div>


          <div className="deposit-detail-progress-bar">

            <div
              className="deposit-detail-progress-fill"
              style={{
                width: `${progress}%`
              }}
            />

          </div>


          <div className="deposit-detail-progress-percent">
            {progress}%
          </div>


        </div>


      </div>


      {/* =========================
          입금내역
      ========================= */}

      <section className="deposit-detail-history">

        <h3>
          입금내역
        </h3>


        <div className="deposit-history-card">


          <div className="deposit-history-info">

            <strong>
              예금가입
            </strong>

            <span>
              {formatDate(startDate)}
            </span>

          </div>


          <div className="deposit-history-amount">

            잔액 {amount.toLocaleString()}원

          </div>


        </div>


      </section>


      {/* =========================
          안내
      ========================= */}

      <div className="deposit-detail-info">

        <p>
          예금을 해지하면 예치금이
          입출금 계좌로 반환됩니다.
        </p>

      </div>


      {/* =========================
          해지 버튼
      ========================= */}

      <button
        type="button"
        className="deposit-detail-button"
        onClick={cancelDeposit}
      >
        예금 해지하기
      </button>


    </div>

  );
}


export default DepositDetail;