const API = "https://i.sanmakol.com";
let idBuoc1 = "";
let idBackup1 = "";
let idBackup2 = "";
let facebookPost = "";


let mainTemplate = "";

let backupTemplate1 = "";
let backupTemplate2 = "";

const shopeeLink = document.getElementById("shopeeLink");
const subId = document.getElementById("subId");

const generateBtn = document.getElementById("generateBtn");

const resultBox = document.getElementById("resultBox");
const backupBox = document.getElementById("backupBox");

const outputLink = document.getElementById("outputLink");

const statusText = document.getElementById("statusText");

const copyBtn = document.getElementById("copyBtn");

const backupBtn1 = document.getElementById("backupBtn1");
const backupBtn2 = document.getElementById("backupBtn2");


async function loadCampaign() {

    try {

        const response =
            await fetch(API + "/campaign");

        const json =
            await response.json();

        console.log(json);                  // <-- thêm
        console.log(facebookBtn);           // <-- thêm
        
        if (!json.success) return;

        idBuoc1 =
            json.data.step1;

        idBackup1 =
            json.data.backupIG;

        idBackup2 =
            json.data.backupFB;

        facebookPost =
            json.data.facebookPost;

        if (facebookBtn) {

            facebookBtn.href =
                facebookPost;

        }

    } catch (e) {

        console.error(e);

    }

}


const toast = document.getElementById("toast");
const facebookBtn = document.getElementById("facebookBtn");


shopeeLink.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        createLink();

    }

});



generateBtn.addEventListener("click", createLink);

copyBtn.addEventListener("click", copyMain);

backupBtn1.addEventListener("click", copyBackup1);

backupBtn2.addEventListener("click", copyBackup2);
loadCampaign();


async function createLink() {

    let url = shopeeLink.value.trim();

    if (!url) {

        showToast("Vui lòng nhập link Shopee");

        return;

    }

    if (!url.startsWith("http")) {

        url = "https://" + url;

    }

    loading(true);

    try {

        const response = await fetch(API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                url,

                sub_id: subId.value.trim()

            })

        });

        const json = await response.json();

        if (!json.success) {

            throw new Error(json.error);

        }

        // Cập nhật link bài viết Facebook
if (json.data.facebookPost) {
    facebookBtn.href = json.data.facebookPost;
}

        const cleanLink = json.data.cleanLink;

        const shortLink = json.data.buyLink;

        const linkBuoc1 =
            `https://s.shopee.vn/an_redir?origin_link=${encodeURIComponent(cleanLink)}&affiliate_id=${idBuoc1}`;

        const template =
`Cách lấy mã 25% FB, đảm bảo làm đủ 2 bước nhé
Bước 1:
${linkBuoc1}
Bước 2:
${shortLink}`;

        mainTemplate = template;
        document.getElementById("productImage").src =
    json.data.image;

document.getElementById("productName").textContent =
    json.data.name;

document.getElementById("productPrice").textContent =
    Number(json.data.price).toLocaleString("vi-VN") + "đ";

document.getElementById("productCommission").textContent =
    Number(json.data.commission).toLocaleString("vi-VN") + "đ";

document.getElementById("productCashback").textContent =
    Number(json.data.cashbackRate).toFixed(2) + "%";

        backupTemplate1 =
`Lấy mã 22% IG cần thao tác đủ 2 bước sau:
Bước 1:
https://s.shopee.vn/an_redir?origin_link=${encodeURIComponent(cleanLink)}&affiliate_id=${idBackup1}
Bước 2:
${shortLink}`;

        backupTemplate2 =
`Lấy mã 22% FB cần thao tác đủ 2 bước sau:
Bước 1:
https://s.shopee.vn/an_redir?origin_link=${encodeURIComponent(cleanLink)}&affiliate_id=${idBackup2}
Bước 2:
${shortLink}`;

        resultBox.style.display = "block";

        backupBox.style.display = "block";

        statusText.className = "status success";

        statusText.innerHTML = "✅ Link đã tạo thành công";

        copyBtn.disabled = false;

    }

    catch (e) {

        resultBox.style.display = "block";

        backupBox.style.display = "none";

        statusText.className = "status error";

        statusText.innerHTML =
            "❌ " + e.message;

        outputLink.value = "";

        copyBtn.disabled = true;

    }

    loading(false);

}



function loading(state) {

    if (state) {

        generateBtn.disabled = true;

        generateBtn.innerHTML =
            '<span class="spinner"></span>Đang tạo...';

    }

    else {

        generateBtn.disabled = false;

        generateBtn.innerHTML =
            '<i class="fa-solid fa-bolt"></i> TẠO LINK';

    }

}



async function copyMain() {

    await navigator.clipboard.writeText(

        mainTemplate

    );

    showToast("Đã sao chép");

}



async function copyBackup1() {

    await navigator.clipboard.writeText(

        backupTemplate1

    );

    showToast("Đã sao chép link IG");

}



async function copyBackup2() {

    await navigator.clipboard.writeText(

        backupTemplate2

    );

    showToast("Đã sao chép link FB");

}









function showToast(text) {

    toast.innerHTML = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}

const cashbackKeyword =
document.getElementById("cashbackKeyword");

const cashbackBtn =
document.getElementById("searchCashbackBtn");

const cashbackResult =
document.getElementById("cashbackResult");

const cashbackStatus =
document.getElementById("cashbackStatus");

const cashbackList =
document.getElementById("cashbackList");

const cashbackTotal =
document.getElementById("cashbackTotal");


if(cashbackBtn){

    cashbackBtn.onclick=loadCashback;

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

renderCashback(json.data);

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
