// const { url } = require("inspector");

const urlActual = window.location.href; 
console.log(urlActual);

const urlProduit = new URL(urlActual);
const idProduit = urlProduit.searchParams.get("id");
console.log("récupérer l'id via searchParam = ", idProduit);


const apiRequeteProduit = fetch("http://localhost:3000/api/furniture/"+idProduit)
.then((reponse) => reponse.json())
.then((data) => {
    try {

        // création de la card produit 
        let createDiv = document.createElement("div");
		createDiv.className = "card";
        let createImg = document.createElement("img");
        createImg.src = data.imageUrl;

        let createSecondDiv = document.createElement("div");
		createSecondDiv.className = "second-card";
		

        // création des éléments au sein de la card produit 
        let createName = document.createElement("p");
            createName.innerText = data.name;
            createName.className = "name";
        let createPrice = document.createElement("p");
            createPrice.innerText = data.price / 1000 + " €";
            createPrice.className = "price";
        let createDescription = document.createElement("p");
            createDescription.className = "description";


        // création du select et des options en son sein 
        createDescription.innerText = data.description;
        let createSelect = document.createElement("select");
            createSelect.innerText = "choix du vernis";

        for (let j = 0; j < data.varnish.length; j++) {
            let createOption = document.createElement("OPTION");
            createOption.innerText = data.varnish[j];
            createOption.value = data.varnish[j];
            createSelect.appendChild(createOption);
        }

        // création du bouton ajouter au panier 
        let createButtonAdd = document.createElement("button"); 
				createButtonAdd.className = "button-panier";
				createButtonAdd.innerText = "Ajouter au panier";

        // création du bouton de redirection vers la page récapitulative 
        let createButtonRedirection = document.createElement("a");
        createButtonRedirection.setAttribute('href', "page-recp.html");
        createButtonRedirection.innerText ="voir ma commande";


        // affichage des éléments de la carte-produit 
        document.querySelector(".section-produit").appendChild(createDiv);
        createDiv.appendChild(createImg);
        createDiv.appendChild(createSecondDiv);
        createSecondDiv.appendChild(createName);
        createSecondDiv.appendChild(createDescription);
        createSecondDiv.appendChild(createPrice);
        createSecondDiv.appendChild(createSelect);
        createSecondDiv.appendChild(createButtonAdd);
        createSecondDiv.appendChild(createButtonRedirection);
        // création du panier + count du panier au click
        let cageCount = document.querySelector(".cage-count"); 
				cageCount.innerHTML = 0;
				createButtonAdd.addEventListener("click", () => { 
				cageCount.innerHTML++
				});
    } catch (error) {
        alert("une erreur est survenue");
    }
});
