const apiRequete = fetch("http://localhost:3000/api/furniture")
	.then((reponse) => reponse.json())
	.then((data) => {
		for (let i = 0; i < data.length; i++) {
			// création des divs produit et des informations relatives récupérer sur le tableau de l'API
			let createDiv = document.createElement("div");
			createDiv.className = "card";
			document.body.insertBefore(createDiv, document.querySelector("section"));
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

			// création de la div qui contiendra les inputs pour le choix des vernis.
			let createDivInput = document.createElement("div");
			createDivInput.className = "Divinput";

			// boucle de création des inputs + intégration au sein de la div CreateDivInput, elle même intégrée à CreateDiv.
			for (let j = 0; j < data[i].varnish.length; j++) {
				let createInput = document.createElement("input");
				createInput.innerText = data[i].varnish[j];
				createDivInput.appendChild(createInput);
			}
			document.querySelector("section").appendChild(createDiv);
			createDiv.appendChild(createDivInput);
			createDiv.appendChild(createName);
			createDiv.appendChild(createImg);
			createDiv.appendChild(createPrice);
			createDiv.appendChild(createDescription);
		}
	});
