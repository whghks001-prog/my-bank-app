import "../styles/transaction.css";


function Transaction({
  transactions = [],
  setSelectedTransaction
}) {

  return (

    <div className="transaction-page">


      <h2 className="transaction-title">
        💳 거래내역
      </h2>


      <div className="transaction-summary">

        <span>
          전체 거래
        </span>

        <strong>
          {transactions.length}건
        </strong>

      </div>


      {transactions.length === 0 ? (

        <div className="transaction-empty">

          <div className="transaction-empty-icon">
            💳
          </div>

          <p>
            거래내역이 없습니다.
          </p>

          <span>
            이체나 예금 가입을 하면
            거래내역이 표시됩니다.
          </span>

        </div>

      ) : (

        <div className="transaction-list">

          {transactions.map((item) => {

            const isDeposit =
              item.type === "예치";

            const amount =
              Number(item.amount || 0);


            return (

              <button
                className="transaction-card"
                key={item.id}
                onClick={() =>
                  setSelectedTransaction(item)
                }
              >


                <div className="transaction-icon">

                  {isDeposit
                    ? "💰"
                    : "💸"}

                </div>


                <div className="transaction-info">

                  <strong>
                    {item.title || "거래"}
                  </strong>

                  <span>
                    {item.date || "날짜 정보 없음"}
                  </span>

                </div>


                <div className="transaction-money">

                  <strong
                    className={
                      amount < 0
                        ? "minus"
                        : "plus"
                    }
                  >

                    {amount > 0
                      ? "+"
                      : ""}

                    ₩
                    {Math.abs(
                      amount
                    ).toLocaleString()}

                  </strong>


                  {item.afterBalance !==
                    undefined && (

                    <span>

                      잔액 ₩
                      {Number(
                        item.afterBalance
                      ).toLocaleString()}

                    </span>

                  )}

                </div>


              </button>

            );

          })}

        </div>

      )}


    </div>

  );

}


export default Transaction;