const urlActual = window.location.href;
console.log(urlActual);

const urlProduit = new URL(urlActual);
const idProduit = urlProduit.searchParams.get("id");

fetch("http://localhost:3000/api/furniture/" + idProduit)
	.then((reponse) => {
		return reponse.json();
	})
	.then((data) => {
		// création de la card produit
		let createDiv = document.createElement("div");
		createDiv.className = "card";
		let createImg = document.createElement("img");
		createImg.src = data.imageUrl;

		let createSecondDiv = document.createElement("div");
		createSecondDiv.className = "second-card";

		let createThirdDiv = document.createElement("div");
		createThirdDiv.className = "third-div-product";

		// création des éléments au sein de la card produit
		let createName = document.createElement("p");
		createName.innerText = data.name;
		createName.className = "name";
		let createPrice = document.createElement("p");
		createPrice.innerText = data.price / 1000;
		createPrice.className = "price";
		let createDescription = document.createElement("p");
		createDescription.className = "description";

		// création du select et des options en son sein
		createDescription.innerText = data.description;
		let createSelect = document.createElement("select");
		createSelect.innerText = "choix du vernis";

		for (let i = 0; i < data.varnish.length; i++) {
			let createOption = document.createElement("option");
			createOption.innerText = data.varnish[i];
			createOption.value = data.varnish[i];
			createSelect.appendChild(createOption);
		}

		// création du bouton ajouter au panier
		let createButtonAdd = document.createElement("button");
		createButtonAdd.className = "button-panier";
		createButtonAdd.innerText = "Ajouter au panier";

		// création du bouton de redirection vers la page récapitulative
		let createButtonRedirection = document.createElement("a");
		createButtonRedirection.setAttribute("href", "page-panier.html");
		createButtonRedirection.innerText = "voir ma commande";

		// affichage des éléments de la carte-produit
		createDiv.appendChild(createImg);

		createSecondDiv.appendChild(createName);
		createSecondDiv.appendChild(createDescription);

		createSecondDiv.appendChild(createSelect);
		createSecondDiv.appendChild(createButtonAdd);

		createThirdDiv.appendChild(createPrice);
		createThirdDiv.appendChild(createButtonAdd);

		createSecondDiv.appendChild(createThirdDiv);
		createSecondDiv.appendChild(createButtonRedirection);

		createDiv.appendChild(createSecondDiv);
		document.querySelector(".section-produit").appendChild(createDiv);

		let cageCount = document.getElementsByClassName("cage-count");

		// ------------------  création de l'objet produit -------------//
		let productStockLocal = JSON.parse(localStorage.getItem("product")) || [];

		// revoir création objet avec data
		const objectProduct = {
			id: idProduit,
			name: createName.innerHTML,
			price: createPrice.innerText,
			img: createImg.src,
			quantity: 1
		};
		// ----------------- ADD EVENT LISTENER DU BOUTON AJOUTER AU PANIER ----------------- ///

		createButtonAdd.addEventListener("click", () => {
			addProductToCart(objectProduct);
			localStorage.setItem("product", JSON.stringify(productStockLocal));
		});

		// ------------------------- FONCTION ADDTOCARD - LOCAL STORAGE ---------------------------//
		function addProductToCart(productToAdd) {
			for (let i = 0; i < productStockLocal.length; i++) {
				if (productStockLocal[i].name === productToAdd.name) {
					productStockLocal[i].quantity++;
					return;
				}
			}
			productStockLocal.push(productToAdd);
		}
	});
// ------------------------- FIN DE L'AJOUT AU LOCAL STORAGE ---------------------------//
