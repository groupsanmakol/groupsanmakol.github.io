const API = "https://i.sanmakol.com";

const toast = document.getElementById("toast");

function showToast(text){

    if(!toast) return;

    toast.innerHTML = text;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2200);

// =======================
// User
// =======================

const currentUser =
JSON.parse(
    localStorage.getItem("user") || "null"
);
function isLogin(){

    return currentUser != null;

}
    function logout(){

    localStorage.removeItem("user");

    location.href="/login/";

}

function requireLogin(){

    if(!currentUser){

        location.href="/login/";

    }

}
