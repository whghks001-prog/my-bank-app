```jsx
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


        <h1 className="home-assets-amount">

          ₩{" "}

          {Number(
            totalAssets
          ).toLocaleString()}

        </h1>


        <div className="home-assets-line">
        </div>


        <div className="home-balance-row">

          <span>
            입출금 잔액
          </span>

          <strong>

            ₩{
```
