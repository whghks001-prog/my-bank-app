import "../styles/account-detail.css";


function AccountDetail({
  balance = 0,
  transactions = [],
  back
}) {

  /* =========================
     금액 표시
  ========================= */

  const formatMoney = (value) => {

    return Number(
      value || 0
    ).toLocaleString("ko-KR");

  };


  /* =========================
     입출금통장 거래내역
     
     예치 거래도 포함
     ========================= */

  const accountTransactions =
    transactions.filter(
      (item) =>
        item.type === "입금" ||
        item.type === "출금" ||
        item.type === "이체" ||
        item.type === "예치"
    );


  return (

    <div className="account-detail-page">


      {/* =========================
          상단
      ========================= */}

      <div className="account-detail-header">

        <button
          type="button"
          className="account-detail-back"
          onClick={back}
        >
          ‹
        </button>


        <h2>
          입출금통장
        </h2>

      </div>


      {/* =========================
          계좌 정보
      ========================= */}

      <div className="account-detail-card">

        <p className="account-detail-label">
          계좌번호
        </p>


        <p className="account-detail-number">
          900-331-1862131
        </p>


        <p className="account-detail-balance">
          {formatMoney(balance)}원
        </p>

      </div>


      {/* =========================
          거래내역
      ========================= */}

      <div className="account-detail-section">

        <h3>
          거래내역
        </h3>


        {accountTransactions.length === 0 ? (

          <div className="account-detail-empty">

            거래내역이 없습니다.

          </div>

        ) : (

          <div className="account-detail-list">

            {accountTransactions
              .slice()
              .reverse()
              .map((item, index) => {


                const amount =
                  Number(
                    item.amount || 0
                  );


                /* =========================
                   거래 종류
                ========================= */

                let transactionType =
                  "거래";


                /*
                  예금 가입
                  입출금통장에서 돈이 빠져나가
                  예금으로 들어간 거래
                */

                if (
                  item.type === "예치" ||
                  item.title === "예금 가입"
                ) {

                  transactionType =
                    "출금";

                }


                /*
                  일반 출금
                */

                else if (
                  item.type === "출금" ||
                  amount < 0
                ) {

                  transactionType =
                    "출금";

                }


                /*
                  일반 입금
                */

                else if (
                  item.type === "입금" ||
                  amount > 0
                ) {

                  transactionType =
                    "입금";

                }


                /*
                  이체
                */

                else if (
                  item.type === "이체"
                ) {

                  transactionType =
                    "이체";

                }


                const isDeposit =
                  amount > 0 &&
                  transactionType === "입금";


                return (

                  <div
                    className="account-detail-item"
                    key={
                      item.id || index
                    }
                  >


                    {/* =========================
                        왼쪽
                    ========================= */}

                    <div className="account-detail-item-left">

                      <strong>
                        {transactionType}
                      </strong>


                      <span>
                        {item.date || ""}
                      </span>

                    </div>


                    {/* =========================
                        오른쪽
                    ========================= */}

                    <div className="account-detail-item-right">

                      <strong
                        className={
                          isDeposit
                            ? "account-income"
                            : "account-expense"
                        }
                      >

                        {isDeposit
                          ? "+"
                          : "-"}

                        {formatMoney(
                          Math.abs(amount)
                        )}

                        원

                      </strong>


                      {item.afterBalance !==
                        undefined && (

                        <span>

                          잔액{" "}

                          {formatMoney(
                            item.afterBalance
                          )}

                          원

                        </span>

                      )}

                    </div>


                  </div>

                );

              })}

          </div>

        )}

      </div>


    </div>

  );

}


export default AccountDetail;