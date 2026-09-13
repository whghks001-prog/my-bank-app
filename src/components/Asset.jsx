import "../styles/asset.css";

function Asset({
  balance = 0,
  deposits = [],
  setPage,
  setSelectedDeposit
}) {

  function formatMoney(value) {
    return Number(value || 0).toLocaleString("ko-KR");
  }

  const accountCount = 1 + deposits.length;

  return (
    <div className="asset-page">

      <section className="asset-section">

        <div className="asset-section-header">

          <h3>
            내 계좌
          </h3>

          <span className="asset-account-count">
            {accountCount}개
          </span>

        </div>

        <button
          type="button"
          className="asset-account-card"
          onClick={() => {
            setPage("account-detail");
          }}
        >

          <div className="asset-account-icon">
            🏦
          </div>

          <div className="asset-account-info">

            <strong className="asset-account-name">
              MG 입출금통장
            </strong>

            <span className="asset-account-number">
              900-331-1862131
            </span>

          </div>

          <div className="asset-account-balance">

            <strong>
              {formatMoney(balance)}원
            </strong>

            <span>
              입출금
            </span>

          </div>

        </button>

        {deposits.map((deposit, index) => (

          <button
            type="button"
            className="asset-account-card"
            key={deposit.id || index}
            onClick={() => {

              if (setSelectedDeposit) {
                setSelectedDeposit(deposit);
              }

              setPage("deposit");

            }}
          >

            <div className="asset-account-icon deposit-icon">
              💰
            </div>

            <div className="asset-account-info">

              <strong className="asset-account-name">
                MG 정기예금
              </strong>

              <span className="asset-account-number">
                예금 {index + 1}
              </span>

              {deposit.date && (
                <span className="asset-account-date">
                  예치일 {deposit.date}
                </span>
              )}

            </div>

            <div className="asset-account-balance">

              <strong>
                {formatMoney(deposit.amount)}원
              </strong>

              <span>
                예금
              </span>

            </div>

          </button>

        ))}

      </section>

    </div>
  );
}

export default Asset;