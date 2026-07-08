const API = "https://i.sanmakol.com";

const loginBtn =
document.getElementById("loginBtn");

const error =
document.getElementById("error");

loginBtn.onclick = login;

async function login(){

    error.innerHTML = "";

    const email =
    document
    .getElementById("email")
    .value
    .trim();

    const password =
    document
    .getElementById("password")
    .value
    .trim();

    if(!email || !password){

        error.innerHTML =
        "Vui lòng nhập đầy đủ thông tin.";

        return;

    }

    loginBtn.disabled = true;

    loginBtn.innerHTML =
    "Đang đăng nhập...";

    try{

        const response =
        await fetch(API + "/login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email,
                password

            })

        });

        const json =
        await response.json();

        if(!json.success){

            throw new Error(json.error);

        }

        localStorage.setItem(
    "token",
    json.token
);

localStorage.setItem(
    "user",
    JSON.stringify(json.user)
);

location.href="/";

    }

    catch(e){

        error.innerHTML =
        e.message;

    }

    loginBtn.disabled = false;

    loginBtn.innerHTML =
    "Đăng nhập";

}
