import "../styles/transactiondetail.css";


function TransactionDetail({
  transaction,
  back,
  transactions,
  setTransactions
}) {

  if (!transaction) {

    return (

      <div className="transaction-detail-page">

        <button
          className="transaction-detail-back"
          onClick={back}
        >
          ← 돌아가기
        </button>

        <div className="transaction-detail-empty">
          거래내역을 찾을 수 없습니다.
        </div>

      </div>

    );

  }


  const amount =
    Number(
      transaction.amount || 0
    );


  const isMinus =
    amount < 0;


  /* =========================
     거래내역 삭제
  ========================= */

  function deleteTransaction() {

    const confirmDelete =
      window.confirm(
        "이 거래내역을 삭제하시겠습니까?"
      );


    if (!confirmDelete) {
      return;
    }


    const updatedTransactions =
      transactions.filter(
        item =>
          item.id !== transaction.id
      );


    setTransactions(
      updatedTransactions
    );


    localStorage.setItem(
      "transactions",
      JSON.stringify(
        updatedTransactions
      )
    );


    back();

  }


  return (

    <div className="transaction-detail-page">


      {/* =========================
          상단
      ========================= */}

      <div className="transaction-detail-header">

        <button
          className="transaction-detail-back"
          onClick={back}
        >
          ←
        </button>


        <h2>
          거래 상세
        </h2>

      </div>


      {/* =========================
          거래 금액
      ========================= */}

      <div className="transaction-detail-main">

        <div className="transaction-detail-icon">

          {transaction.type === "예치"
            ? "💰"
            : "💸"}

        </div>


        <p className="transaction-detail-title">

          {transaction.title || "거래"}

        </p>


        <h1
          className={
            isMinus
              ? "transaction-detail-amount minus"
              : "transaction-detail-amount plus"
          }
        >

          {amount > 0
            ? "+"
            : ""}

          ₩
          {Math.abs(
            amount
          ).toLocaleString()}

        </h1>


        <span className="transaction-detail-type">

          {transaction.type || "거래"}

        </span>

      </div>


      {/* =========================
          상세 정보
      ========================= */}

      <div className="transaction-detail-box">


        <div className="transaction-detail-row">

          <span>
            거래일자
          </span>

          <strong>
            {transaction.date ||
              "날짜 정보 없음"}
          </strong>

        </div>


        <div className="transaction-detail-divider">
        </div>


        <div className="transaction-detail-row">

          <span>
            거래구분
          </span>

          <strong>
            {transaction.type ||
              "거래"}
          </strong>

        </div>


        {transaction.afterBalance !==
          undefined && (

          <>

            <div className="transaction-detail-divider">
            </div>


            <div className="transaction-detail-row">

              <span>
                거래 후 잔액
              </span>

              <strong>

                ₩
                {Number(
                  transaction.afterBalance
                ).toLocaleString()}

              </strong>

            </div>

          </>

        )}


        {transaction.recipient && (

          <>

            <div className="transaction-detail-divider">
            </div>


            <div className="transaction-detail-row">

              <span>
                받는 분
              </span>

              <strong>
                {transaction.recipient}
              </strong>

            </div>

          </>

        )}


        {transaction.memo && (

          <>

            <div className="transaction-detail-divider">
            </div>


            <div className="transaction-detail-row">

              <span>
                메모
              </span>

              <strong>
                {transaction.memo}
              </strong>

            </div>

          </>

        )}

      </div>


      {/* =========================
          거래내역 삭제
      ========================= */}

      <button
        type="button"
        className="transaction-detail-delete-button"
        onClick={deleteTransaction}
      >
        거래내역 삭제
      </button>


      {/* =========================
          확인 버튼
      ========================= */}

      <button
        type="button"
        className="transaction-detail-button"
        onClick={back}
      >
        확인
      </button>


    </div>

  );

}


export default TransactionDetail;