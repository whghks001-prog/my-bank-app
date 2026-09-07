import { useState } from "react";
import "../styles/settings.css";

function Settings({
  setIsLogin,
  darkMode,
  setDarkMode
}) {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");


  /*
    =========================
    비밀번호 변경
    =========================
  */

  function changePassword() {

    const savedPassword =
      localStorage.getItem(
        "appPassword"
      ) || "1234";


    if (
      currentPassword !==
      savedPassword
    ) {

      setMessage(
        "현재 비밀번호가 틀렸습니다."
      );

      setMessageType("error");

      return;

    }


    if (
      newPassword.length < 4
    ) {

      setMessage(
        "새 비밀번호는 4자리 이상 입력해주세요."
      );

      setMessageType("error");

      return;

    }


    if (
      newPassword !==
      confirmPassword
    ) {

      setMessage(
        "새 비밀번호가 서로 다릅니다."
      );

      setMessageType("error");

      return;

    }


    localStorage.setItem(
      "appPassword",
      newPassword
    );


    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");


    setMessage(
      "비밀번호가 변경되었습니다."
    );

    setMessageType("success");

  }


  /*
    =========================
    로그아웃
    =========================
  */

  function logout() {

    const result =
      window.confirm(
        "로그아웃하시겠습니까?"
      );


    if (!result) {
      return;
    }


    setIsLogin(false);

  }


  /*
    =========================
    데이터 초기화
    =========================
  */

  function resetData() {

    const result =
      window.confirm(
        "모든 테스트 데이터를 삭제하시겠습니까?\n\n잔액, 예금, 거래내역, 알림이 모두 초기화됩니다."
      );


    if (!result) {
      return;
    }


    localStorage.removeItem(
      "balance"
    );

    localStorage.removeItem(
      "deposits"
    );

    localStorage.removeItem(
      "transactions"
    );

    localStorage.removeItem(
      "notifications"
    );


    window.location.reload();

  }


  /*
    =========================
    다크모드
    =========================
  */

  function toggleDarkMode() {

    const nextMode =
      !darkMode;


    setDarkMode(
      nextMode
    );


    localStorage.setItem(
      "darkMode",
      String(nextMode)
    );

  }


  return (

    <div className="settings-page">


      {/* 헤더 */}

      <div className="settings-header">

        <h2>
          설정
        </h2>

        <p>
          앱 환경을 관리할 수 있습니다.
        </p>

      </div>


      {/* =========================
          화면 설정
      ========================= */}

      <section className="settings-section">

        <h3>
          화면 설정
        </h3>


        <div className="settings-item">

          <div className="settings-item-text">

            <strong>
              {darkMode
                ? "☀️ 라이트모드"
                : "🌙 다크모드"}
            </strong>

            <span>
              {darkMode
                ? "밝은 화면으로 변경합니다."
                : "어두운 화면으로 변경합니다."}
            </span>

          </div>


          <button
            type="button"
            className={
              darkMode
                ? "settings-toggle active"
                : "settings-toggle"
            }
            onClick={
              toggleDarkMode
            }
          >

            <span>
              {darkMode
                ? "ON"
                : "OFF"}
            </span>

          </button>

        </div>

      </section>


      {/* =========================
          보안
      ========================= */}

      <section className="settings-section">

        <h3>
          보안
        </h3>


        <div className="settings-card">

          <label>
            현재 비밀번호
          </label>

          <input
            type="password"
            value={
              currentPassword
            }
            onChange={
              e =>
                setCurrentPassword(
                  e.target.value
                )
            }
            placeholder="현재 비밀번호"
          />


          <label>
            새 비밀번호
          </label>

          <input
            type="password"
            value={
              newPassword
            }
            onChange={
              e =>
                setNewPassword(
                  e.target.value
                )
            }
            placeholder="새 비밀번호"
          />


          <label>
            새 비밀번호 확인
          </label>

          <input
            type="password"
            value={
              confirmPassword
            }
            onChange={
              e =>
                setConfirmPassword(
                  e.target.value
                )
            }
            placeholder="새 비밀번호 확인"
          />


          <button
            className="settings-primary-button"
            onClick={
              changePassword
            }
          >
            비밀번호 변경
          </button>


          {message && (

            <p
              className={
                messageType ===
                "success"
                  ? "settings-message success"
                  : "settings-message error"
              }
            >
              {message}
            </p>

          )}

        </div>

      </section>


      {/* =========================
          계정
      ========================= */}

      <section className="settings-section">

        <h3>
          계정
        </h3>


        <div className="settings-card">

          <button
            className="settings-logout-button"
            onClick={
              logout
            }
          >
            로그아웃
          </button>

        </div>

      </section>


      {/* =========================
          데이터 관리
      ========================= */}

      <section className="settings-section">

        <h3>
          데이터 관리
        </h3>


        <div className="settings-card">

          <p className="settings-description">

            현재 저장된 테스트 데이터를
            모두 삭제하고 초기 상태로
            되돌립니다.

          </p>


          <button
            className="settings-danger-button"
            onClick={
              resetData
            }
          >
            테스트 데이터 초기화
          </button>

        </div>

      </section>


      {/* =========================
          앱 정보
      ========================= */}

      <section className="settings-section">

        <h3>
          앱 정보
        </h3>


        <div className="settings-info-card">

          <div>
            <span>
              앱 이름
            </span>

            <strong>
              MG 스마트뱅크
            </strong>
          </div>


          <div>
            <span>
              버전
            </span>

            <strong>
              1.0.0
            </strong>
          </div>


          <div>
            <span>
              앱 종류
            </span>

            <strong>
              연습용 금융 앱
            </strong>
          </div>

        </div>

      </section>


      <div className="settings-footer">

        MG 스마트뱅크 Practice App

      </div>


    </div>

  );

}

export default Settings;