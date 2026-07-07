const cashbackKeyword =
document.getElementById("cashbackKeyword");

if(!cashbackKeyword){

    // Không phải trang Cashback

}else{

    initCashback();

}

function initCashback(){

    const cashbackBtn =
    document.getElementById("searchCashbackBtn");

    cashbackBtn.onclick = loadCashback;

}


async function loadCashback(){

    const keyword=
    cashbackKeyword.value.trim();

    if(!keyword){

        showToast("Nhập ID hoặc SĐT");

        return;

    }

    loading(true);

    try{

        const response=
        await fetch(API+"/cashback",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                keyword
            })

        });

     const json =
await response.json();

console.log("Cashback API:", json);

if(!json.success){

    throw new Error(json.error);

}

renderCashback(json);
    }
    catch(e){

        cashbackResult.style.display="block";

        cashbackStatus.className="status error";

        cashbackStatus.innerHTML="❌ "+e.message;

    }

    loading(false);

}

function renderCashback(data){

    cashbackResult.style.display="block";

    cashbackStatus.className="status success";

    cashbackStatus.innerHTML=
    "✅ Tìm thấy "+data.orders.length+" sản phẩm";

    cashbackTotal.innerHTML=
    Number(data.totalCashback)
    .toLocaleString("vi-VN")+"đ";

    cashbackList.innerHTML="";

    data.orders.forEach(item=>{

        cashbackList.innerHTML+=`

<div class="cashback-item">

<h3>${item.orderId}</h3>

<div class="cashback-row">

<span class="cashback-label">

Trạng thái

</span>

<span class="cashback-value">

${item.status}

</span>

</div>

<div class="cashback-row">

<span class="cashback-label">

Giá

</span>

<span class="cashback-value">

${Number(item.price).toLocaleString("vi-VN")}đ

</span>

</div>

<div class="cashback-row">

<span class="cashback-label">

Tỷ lệ hoàn

</span>

<span class="cashback-value">

${item.rate}%

</span>

</div>

<div class="cashback-row">

<span class="cashback-label">

Hoàn dự kiến

</span>

<span class="cashback-value">

${Number(item.cashback).toLocaleString("vi-VN")}đ

</span>

</div>

<div class="cashback-row">

<span class="cashback-label">

Ngày đặt

</span>

<span class="cashback-value">

${item.orderTime}

</span>

</div>

</div>`;

    });

}
