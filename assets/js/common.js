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

    function renderUserMenu(){

    const box =
    document.getElementById("userMenu");

    if(!box) return;

    if(!currentUser){

        box.innerHTML=`

<a href="/login/" class="login-link">

Đăng nhập

</a>

`;

        return;

    }

    box.innerHTML=`

<div class="user-dropdown">

<button id="userBtn">

👤 ${currentUser.name}

</button>

<div class="dropdown-menu">

<div>

<b>${currentUser.name}</b>

</div>

<div>

${currentUser.email}

</div>

<div>

SubID:
${currentUser.sub_id}

</div>

<hr>

<button
id="logoutBtn">

Đăng xuất

</button>

</div>

</div>

`;

    document
    .getElementById("logoutBtn")
    .onclick=logout;

}

renderUserMenu();
