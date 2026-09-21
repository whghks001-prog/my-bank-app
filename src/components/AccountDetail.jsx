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
    return Number(value || 0).toLocaleString("ko-KR");
  };


  /* =========================
     날짜 변환
     
     지원:
     2026. 6. 25.
     2026. 06. 25.
     2026-06-25
  ========================= */

  const parseTransactionDate = (dateValue) => {

    if (!dateValue) {
      return null;
    }

    const text =
      String(dateValue).trim();


    /* =========================
       YYYY-MM-DD
    ========================= */

    const isoMatch =
      text.match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})/
      );


    if (isoMatch) {

      return new Date(
        Number(isoMatch[1]),
        Number(isoMatch[2]) - 1,
        Number(isoMatch[3])
      );

    }


    /* =========================
       YYYY. M. D.
       YYYY. MM. DD.
    ========================= */

    const koreanDateMatch =
      text.match(
        /(\d{4})\D+(\d{1,2})\D+(\d{1,2})/
      );


    if (koreanDateMatch) {

      return new Date(
        Number(koreanDateMatch[1]),
        Number(koreanDateMatch[2]) - 1,
        Number(koreanDateMatch[3])
      );

    }


    /* =========================
       그 외 형식
    ========================= */

    const parsed =
      new Date(text);


    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }


    return null;

  };


  /* =========================
     입출금통장 거래내역
  ========================= */

  const accountTransactions =
    transactions
      .filter(
        (item) =>
          item.type === "입금" ||
          item.type === "출금" ||
          item.type === "이체" ||
          item.type === "예치"
      )
      .slice()
      .sort((a, b) => {

        const dateA =
          parseTransactionDate(a.date);

        const dateB =
          parseTransactionDate(b.date);


        /* 날짜가 정상적으로 있으면
           최신 날짜부터 표시 */

        if (dateA && dateB) {

          return (
            dateB.getTime() -
            dateA.getTime()
          );

        }


        /* 날짜가 없는 거래는 아래쪽 */

        if (dateB) {
          return 1;
        }

        if (dateA) {
          return -1;
        }


        return 0;

      });


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
          입출금통장 상세
        </h2>

      </div>


      {/* =========================
          계좌 정보
      ========================= */}

      <div className="account-detail-card">

        <div className="account-detail-account">

          {/* 은행명 */}

          <div className="account-detail-bank">
          </div>


          {/* 관리 */}

          <button
            type="button"
            className="account-detail-manage"
          >
          </button>


          {/* 계좌 아이콘 */}

          <div className="account-detail-icon">
          </div>


          {/* 계좌명 */}

          <h3 className="account-detail-name">
            계좌번호
          </h3>


          {/* 계좌번호 */}

          <div className="account-detail-number">

            <span>
              900-331-1862131
            </span>

            <button
              type="button"
              className="account-detail-copy"
              aria-label="계좌번호 복사"
            >
            </button>

          </div>

        </div>


        {/* =========================
            잔액
        ========================= */}

        <div className="account-detail-balance">
          {formatMoney(balance)}원
        </div>


        {/* =========================
            가져오기 / 이체
        ========================= */}

        <div className="account-detail-actions">

          <button
            type="button"
            className="account-detail-action"
          >

            <span className="account-detail-action-icon">
            </span>

            <span>
              가져오기
            </span>

          </button>


          <button
            type="button"
            className="account-detail-action"
          >

            <span className="account-detail-action-icon">
            </span>

            <span>
              이체
            </span>

          </button>

        </div>

      </div>


      {/* =========================
          거래내역
      ========================= */}

      <div className="account-detail-history">


        {/* =========================
            검색 / 필터
        ========================= */}

        <div className="account-detail-history-top">

          <button
            type="button"
            className="account-detail-search"
            aria-label="거래내역 검색"
          >
            ⌕
          </button>


          <button
            type="button"
            className="account-detail-filter"
          >

            <span>
              입출금 · 최신순
            </span>

            <span className="account-detail-filter-arrow">
              ﹀
            </span>

          </button>

        </div>


        <div className="account-detail-history-divider" />


        {/* =========================
            거래내역
        ========================= */}

        {accountTransactions.length === 0 ? (

          <div className="account-detail-empty">

            <div className="account-detail-empty-icon">
              ▤
            </div>

            <p>
              기간 내 거래내역이 없어요.
            </p>

          </div>

        ) : (

          <div className="account-detail-transactions">

            {accountTransactions.map(
              (item, index) => {

                const amount =
                  Number(item.amount || 0);


                /* =========================
                   거래 종류
                ========================= */

                let transactionType =
                  "거래";


                /* =========================
                   예금 가입
                   
                   입출금통장에서는
                   돈이 빠져나간 거래이므로
                   "출금"으로 표시
                ========================= */

                if (
                  item.type === "예치" ||
                  item.title === "예금 가입"
                ) {

                  transactionType =
                    "출금";

                }


                /* =========================
                   일반 출금
                ========================= */

                else if (
                  item.type === "출금" ||
                  amount < 0
                ) {

                  transactionType =
                    "출금";

                }


                /* =========================
                   일반 입금
                ========================= */

                else if (
                  item.type === "입금" ||
                  amount > 0
                ) {

                  transactionType =
                    "입금";

                }


                /* =========================
                   이체
                ========================= */

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
                    className="account-detail-transaction"
                    key={
                      item.id || index
                    }
                  >

                    {/* =========================
                        왼쪽
                    ========================= */}

                    <div className="account-detail-transaction-info">

                      <span className="account-detail-transaction-date">
                        {item.date || ""}
                      </span>

                      <strong className="account-detail-transaction-name">
                        {transactionType}
                      </strong>

                      {item.title && (
                        <span className="account-detail-transaction-title">
                          {item.title}
                        </span>
                      )}

                    </div>


                    {/* =========================
                        오른쪽
                    ========================= */}

                    <div className="account-detail-transaction-right">

                      <strong
                        className="account-detail-transaction-amount"
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

                        <span className="account-detail-transaction-balance">

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

              }
            )}

          </div>

        )}


        {/* =========================
            하단 안내
        ========================= */}

        <div className="account-detail-notice">

          <div className="account-detail-notice-icon">
          </div>

          <p>
          </p>

        </div>

      </div>

    </div>

  );

}

export default AccountDetail;