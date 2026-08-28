import { useState } from "react";

import "../styles/settings.css";


function Settings({
  setIsLogin
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


  function changePassword() {

    const savedPassword =
      localStorage.getItem(
        "appPassword"
      ) || "1234";


    if (!currentPassword) {

      setMessage(
        "현재 비밀번호를 입력해주세요."
      );

      setMessageType("error");

      return;

    }


    if (
      currentPassword !==
      savedPassword
    ) {

      setMessage(
        "현재 비밀번호가 올바르지 않습니다."
      );

      setMessageType("error");

      return;

    }


    if (!newPassword) {

      setMessage(
        "새 비밀번호를 입력해주세요."
      );

      setMessageType("error");

      return;

    }


    if (
      newPassword.length < 4
    ) {

      setMessage(
        "비밀번호는 4자리 이상 입력해주세요."
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


  function logout() {

    const answer =
      window.confirm(
        "로그아웃 하시겠습니까?"
      );


    if (!answer) {
      return;
    }


    setIsLogin(false);

  }


  function resetData() {

    const answer =
      window.confirm(
        "연습용 앱의 모든 데이터를 초기화할까요?\n\n잔액, 예금, 거래내역, 알림이 모두 삭제됩니다."
      );


    if (!answer) {
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


  return (

    <div className="settings-page">


      <div className="settings-header">

        <h2>
          ⚙️ 설정
        </h2>

      </div>


      <div className="settings-section">

        <p className="settings-section-title">
          보안
        </p>


        <div className="settings-card">

          <h3>
            비밀번호 변경
          </h3>


          <p className="settings-description">

            앱 로그인에 사용하는 비밀번호를
            변경할 수 있습니다.

          </p>


          <input
            className="settings-input"
            type="password"
            placeholder="현재 비밀번호"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
          />


          <input
            className="settings-input"
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />


          <input
            className="settings-input"
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
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
                messageType === "success"
                  ? "settings-message success"
                  : "settings-message error"
              }
            >

              {message}

            </p>

          )}

        </div>

      </div>


      <div className="settings-section">

        <p className="settings-section-title">
          계정
        </p>


        <div className="settings-card">

          <h3>
            로그아웃
          </h3>


          <p className="settings-description">

            현재 로그인된 앱에서 로그아웃합니다.

          </p>


          <button
            className="settings-logout-button"
            onClick={logout}
          >

            로그아웃

          </button>

        </div>

      </div>


      <div className="settings-section">

        <p className="settings-section-title">
          데이터 관리
        </p>


        <div className="settings-card">

          <h3>
            앱 데이터 초기화
          </h3>


          <p className="settings-description">

            연습용으로 저장된 잔액, 예금,
            거래내역 및 알림을 모두 삭제합니다.

          </p>


          <button
            className="settings-danger-button"
            onClick={resetData}
          >

            데이터 초기화

          </button>

        </div>

      </div>


      <div className="settings-section">

        <p className="settings-section-title">
          앱 정보
        </p>


        <div className="settings-info-card">

          <div className="settings-info-row">

            <span>
              서비스명
            </span>

            <strong>
              MG 스마트뱅크
            </strong>

          </div>


          <div className="settings-info-divider">
          </div>


          <div className="settings-info-row">

            <span>
              버전
            </span>

            <strong>
              1.0.0
            </strong>

          </div>


          <div className="settings-info-divider">
          </div>


          <div className="settings-info-row">

            <span>
              이용 목적
            </span>

            <strong>
              연습용
            </strong>

          </div>

        </div>

      </div>


      <p className="settings-footer">

        MG 스마트뱅크 · Practice App

      </p>


    </div>

  );

}


export default Settings;