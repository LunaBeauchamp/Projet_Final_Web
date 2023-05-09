let form = document.querySelector('form');
console.log(form);
form.addEventListener("submit", (e)=>{
    e.preventDefault();

});
let bouton = document.querySelector("#envoyé");
bouton.addEventListener("click", (e)=>{
    console.log(document.querySelector("#Pseudonyme").value)
    let user = {username: document.querySelector("#Pseudonyme").value,
                ville: document.querySelector("#Ville").value};
    console.log(user.ville)
    localStorage.setItem("info", JSON.stringify(user));
    location.replace("Vitrine.html");
});