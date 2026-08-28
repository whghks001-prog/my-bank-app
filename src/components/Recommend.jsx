import "../styles/recommend.css";


function Recommend() {

  return (

    <div className="recommend-card">

      <div className="recommend-icon">
        🎁
      </div>

      <div className="recommend-content">

        <p className="recommend-label">
          추천 금융상품
        </p>

        <h3>
          MG 스마트 적금
        </h3>

        <p className="recommend-description">
          목표를 정하고 차곡차곡 저축해보세요.
        </p>

        <div className="recommend-rate">
          최대 연 3.5%
        </div>

      </div>

      <div className="recommend-arrow">
        ›
      </div>

    </div>

  );

}


export default Recommend;