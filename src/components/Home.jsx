import "../styles/home.css";

function Home({
  balance = 0,
  totalAssets = 0,
  deposits = [],
  setPage,
  unreadCount = 0
}) {

  return (

    <div className="home-page">


      {/* =====================
          상단
      ===================== */}

      <div className="home-header">

        <div>

          <p className="home-welcome">
          </p>

          <h2 className="home-title">
            MG 스마트뱅크
          </h2>

        </div>


        <div className="home-header-buttons">


          {/* 알림 */}

          <button
            className="home-notification"
            onClick={() =>
              setPage("notification")
            }
          >

            🔔

            {unreadCount > 0 && (

              <span className="home-notification-badge">

                {unreadCount > 99
                  ? "99+"
                  : unreadCount}

              </span>

            )}

          </button>


          {/* 설정 */}

          <button
            className="home-settings"
            onClick={() =>
              setPage("settings")
            }
          >

            ⚙️

          </button>


        </div>

      </div>


      {/* =====================
          총자산
      ===================== */}

      <div className="home-assets-card">


        <p className="home-assets-label">
          총자산
        </p>


        {/* 계좌번호 */}

        <div className="home-account-number">
          새마을금고 90033-11-862131
        </div>


        {/* 총자산 금액
            입출금 잔액 + 예금 */}

        <h1 className="home-assets-amount">

          {Number(
            totalAssets
          ).toLocaleString()}원

        </h1>


        <div className="home-assets-line">
        </div>


        {/* 입출금 가능 잔액 */}

        <div className="home-balance-row">

          <span>
            입출금 잔액
          </span>

          <strong>

            {Number(
              balance
            ).toLocaleString()}원

          </strong>

        </div>


      </div>


      {/* =====================
          빠른 메뉴
      ===================== */}

      <p className="home-section-title">
        빠른 메뉴
      </p>


      <div className="home-menu-grid">


        {/* 이체 */}

        <button
          className="home-menu-card"
          onClick={() =>
            setPage("transfer")
          }
        >

          <div className="home-menu-icon">
            💸
          </div>

          <span>
            이체
          </span>

        </button>


        {/* 상품 */}

        <button
          className="home-menu-card"
          onClick={() =>
            setPage("deposit")
          }
        >

          <div className="home-menu-icon">
            💰
          </div>

          <span>
            상품
          </span>

        </button>


        {/* 거래내역 */}

        <button
          className="home-menu-card"
          onClick={() =>
            setPage("transaction")
          }
        >

          <div className="home-menu-icon">
            💳
          </div>

          <span>
            거래내역
          </span>

        </button>


        {/* 알림 */}

        <button
          className="home-menu-card"
          onClick={() =>
            setPage("notification")
          }
        >

          <div className="home-menu-icon notification-menu-icon">

            🔔

            {unreadCount > 0 && (

              <span className="home-menu-badge">

                {unreadCount}

              </span>

            )}

          </div>

          <span>
            알림
          </span>

        </button>


      </div>


      {/* =====================
          등록된 예금
      ===================== */}

      <div className="home-deposit-info">


        <div className="home-deposit-info-icon">
          💰
        </div>


        <div>

          <p>
            등록된 예금
          </p>

          <strong>
            {deposits.length}건
          </strong>

        </div>


        {/* 보기 → 자산 화면 */}

        <button
          type="button"
          onClick={() => {

            setPage("asset");

          }}
        >

          보기

        </button>


      </div>


    </div>

  );

}

export default Home;
