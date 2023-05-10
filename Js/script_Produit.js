let produit = JSON.parse(localStorage.getItem("produit"));
console.log(produit);
let body = document.querySelector('body');
let image = document.createElement('img');
image.setAttribute("src", produit.images[0]); //J'ai un issue pour les cookies qui vient du lien de l'image
image.setAttribute("id", "image")
body.prepend(image);

let chemin = document.querySelector('#chemin').querySelector('p');
chemin.append(produit.title);

let nom = document.querySelector("#Nom")
nom.textContent = produit.title
let catégorie = document.querySelector('#Category');
catégorie.append(produit.category);

let marque = document.querySelector('#Brand');
marque.append(produit.brand);

let nbétoile = 'star';
let rating = produit.rating;
for  (let compt = 0; compt <= rating; compt++){
    let reste = rating - compt;
    if (reste < 1){
        if (0 <= reste && reste < 0.25){
            if (compt != 0){nbétoile += compt;}
            break;
        }
        if (0.25 <= reste && reste < 0,75){
            if (compt != 0){nbétoile += compt;}
            nbétoile += 'half';
            break
        }
        if (0.75 <= reste && reste < 1){
            nbétoile += (compt + 1);
            break;
        }
    }
}
console.log(nbétoile)
let étoile = document.querySelector(`#${nbétoile}`)
étoile.setAttribute('checked', 'true');

let Prix = document.querySelector('#Prix')
let h2solde = document.createElement('h2')
h2solde.textContent = `${Math.round(produit.price * (1 - produit.discountPercentage/100))}$`
let pPrix = document.createElement('p')
let barré = document.createElement('s')
barré.textContent =`${produit.price}$`
pPrix.append(barré);
Prix.append(h2solde);
Prix.append(pPrix);

let decription = document.querySelector('#description');
decription.textContent = produit.description;

let bouton = document.querySelector("#cart");
bouton.addEventListener("click", (e)=>{
    let àajouter = {nom:produit.title,
                    prix: produit.price,
                    solde: produit.discountPercentage}
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(àajouter)
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart));
});