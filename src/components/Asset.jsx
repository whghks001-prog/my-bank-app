import "../styles/asset.css";


function Asset({

balance,

deposits

}){


const depositTotal = deposits.reduce(

(sum,item)=>

sum + Number(item.amount),

0

);



const total = balance + depositTotal;



const balancePercent = total === 0

? 0

: Math.round(

(balance / total) * 100

);



const depositPercent = total === 0

? 0

: Math.round(

(depositTotal / total) * 100

);



return(

<div className="asset-container">


<h3>

📊 자산 현황

</h3>




<div className="asset-total">


<p>

총 자산

</p>


<h2>

₩ {total.toLocaleString()}

</h2>


</div>





<div className="asset-bar">


<div

className="balance-bar"

style={{

width:`${balancePercent}%`

}}

>

</div>



<div

className="deposit-bar"

style={{

width:`${depositPercent}%`

}}

>

</div>


</div>





<div className="asset-item">


<div>

<p>
입출금
</p>


<strong>

₩ {balance.toLocaleString()}

</strong>


</div>



<span>

{balancePercent}%

</span>


</div>






<div className="asset-item">


<div>

<p>
예금
</p>


<strong>

₩ {depositTotal.toLocaleString()}

</strong>


</div>



<span>

{depositPercent}%

</span>


</div>




</div>

)

}


export default Asset;