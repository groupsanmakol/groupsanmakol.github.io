const API = "https://i.sanmakol.com";

const toast = document.getElementById("toast");

function showToast(text){

    if(!toast) return;

    toast.innerHTML = text;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2200);

