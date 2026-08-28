function DepositCard({deposit,onDelete}){


  const days = Math.ceil(
    (new Date(deposit.endDate) -
    new Date(deposit.startDate))
    /
    (1000*60*60*24)
  );


  const interest = Math.floor(
    Number(deposit.amount)
    *
    (Number(deposit.rate)/100)
    *
    (days/365)
  );


  return(

    <div style={{
      background:"white",
      padding:"20px",
      borderRadius:"20px",
      marginBottom:"15px"
    }}>


      <h2>
        🏦 {deposit.name}
      </h2>


      <h3>
        ₩ {Number(deposit.amount).toLocaleString()}
      </h3>


      <p>
        금리 : {deposit.rate}%
      </p>


      <p>
        가입일 : {deposit.startDate}
      </p>


      <p>
        만기일 : {deposit.endDate}
      </p>


      <h3>
        예상이자 ₩ {interest.toLocaleString()}
      </h3>


      <button
        onClick={()=>onDelete(deposit.id)}
      >
        예금 해지
      </button>


    </div>

  )

}


export default DepositCard;