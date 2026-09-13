import { useState } from "react";
import "../styles/transaction.css";


function Transaction({
  transactions = [],
  setSelectedTransaction
}) {

  /* =========================
     현재 보고 있는 달
     
     0 = 현재 달
     1 = 지난 달
     2 = 2개월 전
     ========================= */

  const [monthOffset, setMonthOffset] =
    useState(0);


  /* =========================
     현재 기준 날짜
     ========================= */

  const today = new Date();


  const currentMonthDate =
    new Date(
      today.getFullYear(),
      today.getMonth() - monthOffset,
      1
    );


  const currentYear =
    currentMonthDate.getFullYear();

  const currentMonth =
    currentMonthDate.getMonth();


  /* =========================
     날짜를 Date로 변환
     
     지원:
     2026. 9. 13.
     2026.09.13
     2026-09-13
     ========================= */

  function parseTransactionDate(dateValue) {

    if (!dateValue) {
      return null;
    }


    const text =
      String(dateValue).trim();


    /* YYYY-MM-DD */

    const isoMatch =
      text.match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})/
      );


    if (isoMatch) {

      const year =
        Number(isoMatch[1]);

      const month =
        Number(isoMatch[2]) - 1;

      const day =
        Number(isoMatch[3]);


      return new Date(
        year,
        month,
        day
      );

    }


    /* YYYY. M. D. */

    const koreanDateMatch =
      text.match(
        /(\d{4})\D+(\d{1,2})\D+(\d{1,2})/
      );


    if (koreanDateMatch) {

      const year =
        Number(koreanDateMatch[1]);

      const month =
        Number(koreanDateMatch[2]) - 1;

      const day =
        Number(koreanDateMatch[3]);


      return new Date(
        year,
        month,
        day
      );

    }


    /* 그 외 형식 */

    const parsed =
      new Date(text);


    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }


    return null;

  }


  /* =========================
     해당 월 거래내역만 가져오기
     ========================= */

  const monthTransactions =
    transactions
      .filter((item) => {

        const date =
          parseTransactionDate(
            item.date
          );


        if (!date) {
          return false;
        }


        return (
          date.getFullYear() ===
            currentYear &&
          date.getMonth() ===
            currentMonth
        );

      })
      .sort((a, b) => {

        const dateA =
          parseTransactionDate(a.date);

        const dateB =
          parseTransactionDate(b.date);


        if (!dateA || !dateB) {
          return 0;
        }


        return (
          dateB.getTime() -
          dateA.getTime()
        );

      });


  /* =========================
     월 이름
     ========================= */

  const monthTitle =
    `${currentYear}년 ${currentMonth + 1}월`;


  /* =========================
     다음으로 볼 이전 달
     ========================= */

  const previousMonthDate =
    new Date(
      currentYear,
      currentMonth - 1,
      1
    );


  const previousMonthLabel =
    `${previousMonthDate.getMonth() + 1}월 거래내역 보기`;


  return (

    <div className="transaction-page">


      {/* =========================
          제목
      ========================= */}

      <h2 className="transaction-title">
        거래내역
      </h2>


      {/* =========================
          현재 보고 있는 달
      ========================= */}

      <div className="transaction-summary">

        <span>
          {monthTitle}
        </span>

        <strong>
          {monthTransactions.length}건
        </strong>

      </div>


      {/* =========================
          해당 월 거래내역
      ========================= */}

      {monthTransactions.length === 0 ? (

        <div className="transaction-empty">

          <p>
            거래내역이 없습니다.
          </p>

          <span>
            {monthTitle}에 발생한 거래내역이
            없습니다.
          </span>

        </div>

      ) : (

        <div className="transaction-list">

          {monthTransactions.map((item) => {

            const amount =
              Number(
                item.amount || 0
              );


            /* =========================
               거래 종류
            ========================= */

            let transactionType =
              item.title || "거래";


            if (item.type === "예치") {

              transactionType =
                "예금가입";

            }


            if (
              item.type === "출금" ||
              amount < 0
            ) {

              transactionType =
                "출금";

            }


            if (
              item.type === "입금" ||
              (
                amount > 0 &&
                item.type !== "예치"
              )
            ) {

              transactionType =
                "입금";

            }


            const isWithdrawal =
              transactionType === "출금";


            const isDepositJoin =
              transactionType === "예금가입";


            return (

              <button
                type="button"
                className="transaction-card"
                key={item.id}
                onClick={() =>
                  setSelectedTransaction(item)
                }
              >


                {/* =========================
                    거래 정보
                ========================= */}

                <div className="transaction-info">

                  <strong>
                    {transactionType}
                  </strong>

                  <span>
                    {item.date ||
                      "날짜 정보 없음"}
                  </span>

                </div>


                {/* =========================
                    금액
                ========================= */}

                <div className="transaction-money">

                  <strong
                    className={
                      isWithdrawal
                        ? "minus"
                        : "plus"
                    }
                  >

                    {isDepositJoin ? (

                      "예금가입"

                    ) : (

                      <>

                        {isWithdrawal
                          ? "-"
                          : "+"}

                        {Math.abs(
                          amount
                        ).toLocaleString()}

                        원

                      </>

                    )}

                  </strong>


                  {item.afterBalance !==
                    undefined && (

                    <span>

                      잔액{" "}

                      {Number(
                        item.afterBalance
                      ).toLocaleString()}

                      원

                    </span>

                  )}

                </div>


              </button>

            );

          })}

        </div>

      )}


      {/* =========================
          이전 달 보기
      ========================= */}

      <button
        type="button"
        className="transaction-month-button"
        onClick={() => {

          setMonthOffset(
            monthOffset + 1
          );

        }}
      >

        {previousMonthLabel}

      </button>


    </div>

  );

}


export default Transaction;