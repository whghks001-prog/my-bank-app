import "../styles/deposit-detail.css";

function DepositDetail({
  deposit,
  back,
  deposits,
  setDeposits,
  setBalance
}) {

  if (!deposit) {
    return null;
  }


  const amount =
    Number(deposit.amount || 0);


  function cancelDeposit() {

    const confirmCancel =
      window.confirm(
        `${amount.toLocaleString()}원을 예금에서 해지하시겠습니까?`
      );

    if (!confirmCancel) {
      return;
    }


    const updatedDeposits =
      deposits.filter(
        item => item.id !== deposit.id
      );


    setDeposits(updatedDeposits);


    localStorage.setItem(
      "deposits",
      JSON.stringify(updatedDeposits)
    );


    const currentBalance =
      Number(
        localStorage.getItem(
          "balance"
        ) || 0
      );


    const newBalance =
      currentBalance + amount;


    setBalance(newBalance);


    localStorage.setItem(
      "balance",
      JSON.stringify(newBalance)
    );


    back();
  }


  return (

    <div className="deposit-detail-page">


      <div className="deposit-detail-top">

        <button
          className="deposit-back"
          onClick={back}
        >
          ←
        </button>

        <h2>
          예금 상세
        </h2>

      </div>


      <div className="deposit-detail-main">


        <div className="deposit-detail-icon">
          💰
        </div>


        <p className="deposit-detail-label">
          예금
        </p>


        <h1>
          ₩{" "}
          {amount.toLocaleString()}
        </h1>


        <span className="deposit-detail-status">
          정상 가입
        </span>


      </div>


      <div className="deposit-detail-box">


        <div className="deposit-detail-row">

          <span>
            예치 금액
          </span>

          <strong>
            ₩{" "}
            {amount.toLocaleString()}
          </strong>

        </div>


        <div className="deposit-detail-row">

          <span>
            예치일
          </span>

          <strong>
            {deposit.date ||
              "날짜 정보 없음"}
          </strong>

        </div>


        <div className="deposit-detail-row">

          <span>
            상품 종류
          </span>

          <strong>
            정기예금
          </strong>

        </div>


        <div className="deposit-detail-row">

          <span>
            상태
          </span>

          <strong className="deposit-detail-complete">
            정상
          </strong>

        </div>


      </div>


      <div className="deposit-detail-info">

        <span>
          💡
        </span>

        <p>
          예금을 해지하면 예치금이
          입출금 계좌로 반환됩니다.
        </p>

      </div>


      <button
        className="deposit-detail-button"
        onClick={cancelDeposit}
      >
        예금 해지하기
      </button>


    </div>

  );
}

export default DepositDetail;