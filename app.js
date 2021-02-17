
const apiRequete = fetch("http://localhost:3000/api/furniture")
	.then((reponse) => reponse.json())
	.then((data) => {
		for (let i = 0; i < data.length; i++) {
			// création des divs produit et des informations relatives récupérer sur le tableau de l'API (nom, description, prix...)
			let createDiv = document.createElement("div");
			createDiv.className = "card";

			// création de la DIV contenant les informations textuels 
			let createSecondDiv = document.createElement("div");
			createSecondDiv.className = "second-card";

			// les éléments au sein de la seconde div 
			let createImg = document.createElement("img");
			createImg.src = data[i].imageUrl;
			let createName = document.createElement("p");
			createName.innerText = data[i].name;
			createName.className = "name";
			let createPrice = document.createElement("p");
			createPrice.innerText = data[i].price / 1000 + " €";
			createPrice.className = "price";
			let createDescription = document.createElement("p");
			createDescription.className = "description";
			createDescription.innerText = data[i].description;

				// création du select qui contiendra les options pour les vernis 
			let createSelect = document.createElement("select");
			createSelect.innerText = "choix du vernis"


				// boucle de création des options dans le SELECT  + insertion dans la balise "select"
			for (let j = 0; j < data[i].varnish.length; j++) {
				let createOption = document.createElement("OPTION");
				createOption.innerText = data[i].varnish[j];
				createOption.value = data[i].varnish[j];
				createSelect.appendChild(createOption);
			}

				// création d'un bouton "ajouter au panier" qui devra être dynamique 
			let createButtonAdd = document.createElement("button"); 
			// createButtonAdd.className = "buttonIndex";
			createButtonAdd.innerText = "Ajouter au panier"
			
				// insertion des éléments créés au sein de la div principale 
			document.querySelector("section").appendChild(createDiv);
			createDiv.appendChild(createImg);
			createDiv.appendChild(createSecondDiv);
			createSecondDiv.appendChild(createName);
			createSecondDiv.appendChild(createDescription);
			createSecondDiv.appendChild(createPrice);
			createSecondDiv.appendChild(createSelect);
			createSecondDiv.appendChild(createButtonAdd);

			let addToCount = document.querySelector("button");
			let cageCount = document.querySelector(".cage-count");
			addToCount.addEventListener("click",  () => { 
				cageCount.innerHTML++;
			})
				}
	});
	
	

