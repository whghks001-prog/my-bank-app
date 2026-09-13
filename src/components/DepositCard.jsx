function DepositCard({
deposit,
onDelete,
onClick
}){


return(

<div

onClick={onClick}

style={{
background:"white",
padding:"20px",
borderRadius:"20px",
marginBottom:"15px",
cursor:"pointer"
}}

>


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
만기일 : {deposit.endDate}
</p>


<button

onClick={(e)=>{

e.stopPropagation();

onDelete(deposit.id);

}}

>
예금 해지
</button>


</div>

)


}


export default DepositCard;