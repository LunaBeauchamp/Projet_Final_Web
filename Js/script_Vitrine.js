//wheather api
let user = JSON.parse(localStorage.getItem("info"));

function créerVitrine(page, data){
    let produitsliste = [];
    let emplacement = document.querySelector('section')
    for (compt = (page-1)*10; compt<page*10;compt++){
        let produit = data.products[compt];
        produitsliste.push(produit);

        let bouton = document.createElement('button')
        bouton.setAttribute('class', 'produit');

        let image = document.createElement('img')
        image.setAttribute('src', produit.images[0])

        let nom = document.createElement('p');
        nom.setAttribute('class', 'nom')
        nom.textContent = produit.title;

        let prix = document.createElement('p');
        prix.textContent = `${Math.round(produit.price * (1 - produit.discountPercentage/100))}$`

        bouton.append(image);
        bouton.append(nom);
        bouton.append(prix);
        bouton.addEventListener("click", (e)=>{
            let pNom = bouton.querySelector(".nom");
            let produitChoisit;
            for(let produit of produitsliste){
                if (produit.title == pNom.textContent){
                    produitChoisit = produit;
                    break;
                }
            }
            localStorage.setItem("produit", JSON.stringify(produit));
            location.replace("Produit.html");
        })
        emplacement.append(bouton);
    }
}
fetch(`http://api.weatherapi.com/v1/current.json?key=601d23a506f44ecca09181053230505&q=${user.ville}&aqi=no`, {
    headers: {
        Accept: 'application/json;charset=utf-8'
    }
})
.then(response => {
     if (response.ok) {
        return response.json();
     }
     throw new Error('Network response was not ok.');
})
.then(data => {
    
    let span = document.querySelector('span');

    let location_ville = document.createElement('p');
    location_ville.textContent = user.ville;
    location_ville.setAttribute('id', 'ville');

    let location_province = document.createElement('p');
    location_province.textContent = `(${data.location.region}, ${data.location.country})`
    location_province.setAttribute('id', 'province')

    let température = document.createElement('p')
    température.setAttribute('id', 'température')
    température.textContent = data.current.temp_c + '°C';

    let image_Température = document.createElement("img");
    image_Température.setAttribute("src", data.current.condition.icon);
    image_Température.setAttribute('id', 'image_température')

    let bonjour = document.createElement('p');
    let nom = document.createElement('b')
    nom.textContent = user.username
    bonjour.textContent = `Hi `
    bonjour.append(nom);
    bonjour.setAttribute('id', 'bonjour')

    span.append(location_ville);
    span.append(location_province);
    span.append(température);
    span.append(image_Température)
    span.append(bonjour);
})
.catch(error => {
    console.error('An error occured. ', error);
});
//produits
fetch(`https://dummyjson.com/Products`, {
    headers: {
        Accept: 'application/json;charset=utf-8'
    }
})
.then(response => {
     if (response.ok) {
        return response.json();
     }
     throw new Error('Network response was not ok.');
})
.then(data => {
    console.log(data)
    //page des produits
    créerVitrine(1, data);
    
    //nombre de pages
    let footer = document.querySelector('footer');
    for (let compt = 0; compt *10 < data.products.length;compt++){
        let bouton = document.createElement('button');
        bouton.textContent= `${compt+1}`;
        bouton.addEventListener("click", (e)=>{
            let produits = document.querySelector('section')
            produits.innerHTML = ""
            créerVitrine(bouton.textContent, data);
        })
        footer.append(bouton)
    }
})
.catch(error => {
    console.error('An error occured. ', error);
});