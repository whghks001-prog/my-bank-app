import "../styles/notification.css";


function Notification({
  notifications = [],
  setNotifications,
  setPage
}) {


  function markAsRead(id) {

    const updated =
      notifications.map(
        item =>
          item.id === id
            ? {
                ...item,
                read: true
              }
            : item
      );


    setNotifications(updated);


    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

  }


  function markAllAsRead() {

    const updated =
      notifications.map(
        item => ({
          ...item,
          read: true
        })
      );


    setNotifications(updated);


    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

  }


  function deleteNotification(id) {

    const updated =
      notifications.filter(
        item =>
          item.id !== id
      );


    setNotifications(updated);


    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

  }


  function clearAll() {

    if (
      notifications.length === 0
    ) {

      return;

    }


    const answer =
      window.confirm(
        "모든 알림을 삭제할까요?"
      );


    if (!answer) {

      return;

    }


    setNotifications([]);


    localStorage.setItem(
      "notifications",
      JSON.stringify([])
    );

  }


  const unreadCount =
    notifications.filter(
      item => !item.read
    ).length;


  return (

    <div className="notification-page">


      {/* =====================
          상단
      ===================== */}

      <div className="notification-header">


        <button
          className="notification-back"
          onClick={() =>
            setPage("home")
          }
        >

          ←

        </button>


        <h2>
          알림
        </h2>


        <button
          className="notification-clear"
          onClick={clearAll}
        >

          전체삭제

        </button>


      </div>


      {/* =====================
          읽지 않은 알림
      ===================== */}

      {unreadCount > 0 && (

        <button
          className="notification-read-all"
          onClick={markAllAsRead}
        >

          모든 알림 읽음 처리

        </button>

      )}


      {/* =====================
          알림 없음
      ===================== */}

      {notifications.length === 0 && (

        <div className="notification-empty">

          <div className="notification-empty-icon">
            🔔
          </div>


          <h3>
            새로운 알림이 없습니다.
          </h3>


          <p>
            새로운 소식이 생기면
            이곳에서 알려드릴게요.
          </p>

        </div>

      )}


      {/* =====================
          알림 목록
      ===================== */}

      <div className="notification-list">


        {notifications
          .slice()
          .reverse()
          .map(item => (

            <div
              key={item.id}
              className={
                item.read
                  ? "notification-card"
                  : "notification-card unread"
              }
              onClick={() =>
                markAsRead(item.id)
              }
            >


              <div className="notification-icon">

                {item.type === "transfer"
                  ? "💸"
                  : item.type === "deposit"
                  ? "💰"
                  : item.type === "warning"
                  ? "⚠️"
                  : "🔔"}

              </div>


              <div className="notification-content">


                <div className="notification-title-row">


                  <h3>
                    {item.title ||
                      "새로운 알림"}
                  </h3>


                  {!item.read && (

                    <span className="notification-dot">
                    </span>

                  )}


                </div>


                <p>
                  {item.message ||
                    ""}
                </p>


                <span className="notification-date">

                  {item.date ||
                    ""}

                </span>


              </div>


              <button
                className="notification-delete"
                onClick={(e) => {

                  e.stopPropagation();

                  deleteNotification(
                    item.id
                  );

                }}
              >

                ×

              </button>


            </div>

          ))}


      </div>


    </div>

  );

}


export default Notification;