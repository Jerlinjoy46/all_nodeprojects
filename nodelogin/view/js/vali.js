const form = document.querySelector("form");
const uname = document.querySelector("input[type=text]");
const psw = document.querySelector("input[type=password]");
form.addEventListener("submit",onsubmit);
function onsubmit(){
    if(uname.value === "" || psw.value === ""){
        event.preventDefault(); 
        alert("Please fill the form");
        return false;
    }
}

