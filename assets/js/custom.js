
const customLink =
document.getElementById("customLink");

if(customLink){

    initCustom();

}

function initCustom(){

    const customBtn =
    document.getElementById("customBtn");

    customBtn.onclick = createCustomLink;

}

async function createCustomLink(){

    const url =
    customLink.value.trim();



    if(!url){

        showToast("Vui lòng nhập link Shopee");

        return;

    }

    loading(true);

    try{

        const token =
localStorage.getItem("token");

const response =
await fetch(API+"/custom",{

    method:"POST",

    headers:{

        "Content-Type":"application/json",

        Authorization:
        "Bearer "+token

    },

    body:JSON.stringify({

        url

    })

});

        });

        const json =
        await response.json();

        console.log(json);

        if(!json.success){

            throw new Error(json.error);

        }

        renderProduct(json.data);

    }

    catch(e){

        showToast(e.message);

    }

    loading(false);

}

function renderProduct(data){

    document
.("customStatus")
.innerHTML =
"✅ Link đã tạo thành công";
    
    document
    .getElementById("customResult")
    .style.display="block";

    document
    .getElementById("productImage")
    .src=data.image;

    document
    .getElementById("productName")
    .textContent=data.name;

    document
    .getElementById("productPrice")
    .textContent=
    Number(data.price)
    .toLocaleString("vi-VN")+"đ";

document
.getElementById("productCashback")
.textContent =
Number(data.commission)
.toLocaleString("vi-VN")+"đ";

document
.getElementById("productRate")
.textContent =
Number(data.cashbackRate)
.toFixed(2) + "%";

    document
    .getElementById("copyCustomBtn")
    .onclick=function(){

        navigator.clipboard.writeText(
            data.buyLink
        );

        showToast("Đã sao chép");

    };

    document
    .getElementById("buyNowBtn")
    .onclick=function(){

        window.open(
            data.buyLink,
            "_blank"
        );

    };

}

function loading(state){

    const btn =
    document.getElementById("customBtn");

    if(state){

        btn.disabled=true;

        btn.innerHTML=
        '<span class="spinner"></span> Đang tạo...';

    }

    else{

        btn.disabled=false;

        btn.innerHTML=
        'TẠO LINK NGAY';

    }

}
