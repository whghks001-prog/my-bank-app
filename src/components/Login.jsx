import { useEffect, useState } from "react";

import "../styles/login.css";


function Login({
  onLogin
}) {

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [numbers, setNumbers] =
    useState([]);


  /*
    숫자 키패드 랜덤 배열
  */

  function shuffleNumbers() {

    const newNumbers = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ];

    for (
      let i = newNumbers.length - 1;
      i > 0;
      i--
    ) {

      const j =
        Math.floor(
          Math.random() * (i + 1)
        );

      [
        newNumbers[i],
        newNumbers[j]
      ] = [
        newNumbers[j],
        newNumbers[i]
      ];

    }

    setNumbers(newNumbers);

  }


  useEffect(() => {

    shuffleNumbers();

  }, []);


  /*
    숫자 입력
  */

  function enterNumber(number) {

    if (password.length >= 6) {
      return;
    }

    setError("");

    const newPassword =
      password + String(number);

    setPassword(newPassword);


    /*
      기존 비밀번호와 비교

      기존 앱에서 설정한 비밀번호가
      4자리여도 사용할 수 있도록 처리
    */

    const savedPassword =
      localStorage.getItem(
        "appPassword"
      ) || "1234";


    if (
      newPassword ===
      savedPassword
    ) {

      setTimeout(() => {

        onLogin();

      }, 150);

    }

  }


  /*
    뒤로가기 / 삭제
  */

  function deleteNumber() {

    setPassword(
      password.slice(
        0,
        -1
      )
    );

    setError("");

  }


  /*
    비밀번호 확인

    키패드 외 입력이 필요한 경우를
    대비한 함수
  */

  function checkPassword() {

    const savedPassword =
      localStorage.getItem(
        "appPassword"
      ) || "1234";


    if (
      password ===
      savedPassword
    ) {

      setError("");

      onLogin();

      return;

    }


    setError(
      "비밀번호가 틀렸습니다."
    );

    setPassword("");

  }


  /*
    키보드 입력도 지원
  */

  function handleKeyDown(e) {

    if (
      e.key >= "0" &&
      e.key <= "9"
    ) {

      enterNumber(
        e.key
      );

      return;

    }


    if (
      e.key ===
      "Backspace"
    ) {

      deleteNumber();

      return;

    }


    if (
      e.key ===
      "Enter"
    ) {

      checkPassword();

    }

  }


  /*
    숫자 위치

    이미지와 같은 형태로
    3 × 3 + 마지막 숫자
  */

  const firstRow =
    numbers.slice(
      0,
      3
    );

  const secondRow =
    numbers.slice(
      3,
      6
    );

  const thirdRow =
    numbers.slice(
      6,
      9
    );

  const lastNumber =
    numbers[9];


  return (

    <div
      className="login-page"
      tabIndex="0"
      onKeyDown={
        handleKeyDown
      }
    >


      {/* =====================
          상단 PIN 영역
      ===================== */}

      <div className="login-top">


        <div className="login-brand">

          <div className="login-brand-icon">
            MG
          </div>

          <span>
            MG 스마트뱅크
          </span>

        </div>


        <h1 className="login-title">

          PIN 비밀번호 입력

        </h1>


        <p className="login-subtitle">

          안전한 금융생활을 시작하세요.

        </p>


        {/* PIN 점 */}

        <div className="login-dots">

          {[

            0,
            1,
            2,
            3,
            4,
            5

          ].map((index) => (

            <span
              key={index}
              className={
                index <
                password.length
                  ? "login-dot filled"
                  : "login-dot"
              }
            />

          ))}

        </div>


        {error && (

          <p className="login-error">

            {error}

          </p>

        )}


        {/* Face ID 표시 */}

        <div className="login-face-id">

          <div className="face-id-icon">

            ◉

          </div>

          <span>

            다음부터 Face ID 사용하기

          </span>

        </div>


      </div>


      {/* =====================
          숫자 키패드
      ===================== */}

      <div className="login-keypad">


        {/* 첫 번째 줄 */}

        <div className="login-keypad-row">

          {firstRow.map(
            (number) => (

              <button
                key={number}
                className="login-key"
                onClick={() =>
                  enterNumber(
                    number
                  )
                }
              >

                {number}

              </button>

            )
          )}

        </div>


        {/* 두 번째 줄 */}

        <div className="login-keypad-row">

          {secondRow.map(
            (number) => (

              <button
                key={number}
                className="login-key"
                onClick={() =>
                  enterNumber(
                    number
                  )
                }
              >

                {number}

              </button>

            )
          )}

        </div>


        {/* 세 번째 줄 */}

        <div className="login-keypad-row">

          {thirdRow.map(
            (number) => (

              <button
                key={number}
                className="login-key"
                onClick={() =>
                  enterNumber(
                    number
                  )
                }
              >

                {number}

              </button>

            )
          )}

        </div>


        {/* 마지막 줄 */}

        <div className="login-keypad-row">

          <div className="login-key-empty">
          </div>


          <button
            className="login-key"
            onClick={() =>
              enterNumber(
                lastNumber
              )
            }
          >

            {lastNumber}

          </button>


          <button
            className="login-delete"
            onClick={
              deleteNumber
            }
          >

            ×

          </button>

        </div>


      </div>


    </div>

  );

}


export default Login;