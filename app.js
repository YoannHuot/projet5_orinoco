let sectionIndex = document.querySelector(".section-index");

fetch("http://localhost:3000/api/furniture")
	.then((reponse) => {
		return reponse.json();
	})
	.then((data) => {
		for (let i = 0; i < data.length; i++) {
			// création des divs produit et des informations relatives récupérer sur le tableau de l'API (nom, description, prix...)
			let createDiv = document.createElement("div");
			createDiv.className = "card";

			// création de la DIV contenant les informations textuels
			let createSecondDiv = document.createElement("div");
			createSecondDiv.className = "second-card";

			let createThirdDiv = document.createElement("div");
			createThirdDiv.className = "third-div";

			// les éléments au sein de la seconde div
			let createImg = document.createElement("img");
			createImg.src = data[i].imageUrl;
			let createName = document.createElement("p");
			createName.innerText = data[i].name;
			createName.className = "name";
			let createPrice = document.createElement("p");
			createPrice.innerText = data[i].price / 1000 + " €";
			createPrice.className = "price";

			// lien de redirection vers la page produit
			let createAA = document.createElement("a");
			createAA.innerText = "Voir plus";
			createAA.setAttribute("href", "page-produit.html?id=" + data[i]._id);

			// insertion des éléments créés au sein de la div principale
			sectionIndex.appendChild(createDiv);
			createDiv.appendChild(createImg);
			createDiv.appendChild(createSecondDiv);
			createSecondDiv.appendChild(createThirdDiv);
			createThirdDiv.appendChild(createName);
			createThirdDiv.appendChild(createPrice);
			createSecondDiv.appendChild(createAA);
		}
	});
