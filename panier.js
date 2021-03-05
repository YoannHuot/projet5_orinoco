let productStockLocal = JSON.parse(localStorage.getItem("product")); // variable ESSENTIEL qui permet de transformer le JSON en Javascript$ //

// variable confirmation commande / prix
let articleRecap = document.querySelector(".article-recap");
let buttonConfirmCommand = document.querySelector(".confirm-commande");
let priceRecap = document.querySelector(".price-product-recap");
let tvaRecap = document.querySelector(".tva-product-recap");
let totaTtcRecap = document.querySelector(".total-product-recap");
let totalPriceHt = 0;

// variables du formulaire //
let formulaire = document.querySelector(".formulaire");
let firstName = document.querySelector(".firstname");
let lastName = document.querySelector(".lastname");
let address = document.querySelector(".address");
let city = document.querySelector(".city");
let email = document.querySelector(".mail");

let contact = {
	firstname: "",
	name: "",
	adress: "",
	city: "",
	email: ""
};

// * Expects request to contain:
// * contact: {
// *   firstName: string,
// *   lastName: string,
// *   address: string,
// *   city: string,
// *   email: string
// * }
// * products: [string] <-- array of product _id

// ------------------------------- PANIER / AJOUT QUANTITE / SUPPRESSION QUANTITI -------------------------------------- //

// // // // -------- Panier vide  ------ \\ \\ \\ \\
if (productStockLocal == null) {
	const basketEmpty = `<div class ="container-panier-vide">
        <div>le panier est vide</div>
    </div>`;
	articleRecap.innerHTML = basketEmpty;
}
// // // // -------- Panier plein ---------- \\ \\ \\ \\
else {
	for (let k = 0; k < productStockLocal.length; k++) {
		let idProduct = productStockLocal[k].id;

		let createProductBasket = document.createElement("div");
		createProductBasket.className = "grid-produit";

		let createImgBasket = document.createElement("img");
		createImgBasket.className = "picturebasket";
		createImgBasket.src = productStockLocal[k].img;

		let createNameBasket = document.createElement("p");
		createNameBasket.className = "productname";
		createNameBasket.innerHTML = productStockLocal[k].name;

		let createPriceBasket = document.createElement("p");
		createPriceBasket.className = "productprice";
		createPriceBasket.innerHTML = productStockLocal[k].price;

		let createQuantityBasket = document.createElement("p");
		createQuantityBasket.className = "productquantity";
		createQuantityBasket.innerText = Number(productStockLocal[k].quantity);

		let createDeleteBasket = document.createElement("div");
		createDeleteBasket.className = "productdelete";

		let createSelectQuantityBasket = document.createElement("select");

		for (let numberOption = 0; numberOption < 101; numberOption++) {
			let createOptionQuantityBasket = document.createElement("option");
			createOptionQuantityBasket.innerText = numberOption;
			createOptionQuantityBasket.className = "option-basket";
			createSelectQuantityBasket.appendChild(createOptionQuantityBasket);
		}
		articleRecap.appendChild(createProductBasket);
		createProductBasket.appendChild(createImgBasket);
		createProductBasket.appendChild(createNameBasket);
		createProductBasket.appendChild(createPriceBasket);
		createProductBasket.appendChild(createQuantityBasket);
		createProductBasket.appendChild(createDeleteBasket);
		createProductBasket.appendChild(createSelectQuantityBasket);

		// --- ADDEVENTLISTERER CHANGEMENT DE QUANTITE SUR LE SELECTION ---- ///
		createSelectQuantityBasket.addEventListener("change", (event) => {
			let testConfirm = confirm("voulez vous changer le localstorage ?");
			if ((testConfirm = true)) {
				let resultOptionSelect = Number(event.target.value);
				createQuantityBasket.innerText = Number(resultOptionSelect);

				// nouvel objet ajouté au localstorage //
				let objectProductBasket = {
					id: idProduct,
					name: createNameBasket.innerHTML,
					price: createPriceBasket.innerText,
					img: createImgBasket.src,
					quantity: resultOptionSelect
				};
				addProductToCartBasket(objectProductBasket);
				document.location.reload(); // pour mettre à jour les calculs de la page avec un refresh de la page //
			}
		});
		/// --- FIN DU ADDEVENTLISTERER CHANGEMENT SUR LE SELECT ---- ///

		// ----------- ENREGISTRE LA NOUVELLE QUANTITE DANS LE LOCALSTORAGE ----------- //
		function addProductToCartBasket(proprieteBakset) {
			for (let i = 0; i < productStockLocal.length; i++) {
				if (productStockLocal[i].name === proprieteBakset.name) {
					productStockLocal[i].quantity = proprieteBakset.quantity;
					localStorage.setItem("product", JSON.stringify(productStockLocal));
					return;
				}
			}
			productStockLocal.push(propriete);
			return;
		}
	}
}

// ------------------------------- ------------CONFIRMATION DE LA COMMANDE------------ ------------------------------- \\

/// ------------ CALCUL PRIX DU PANIER RECAP ------------ ///
if (productStockLocal !== null) {
	for (let index = 0; index < productStockLocal.length; index++) {
		totalPriceHt += productStockLocal[index].quantity * productStockLocal[index].price; // calcul du prix HT
	}

	let calculTvaPriceRecap = totalPriceHt * 0.2;
	let calculTotalTtcRecap = totalPriceHt + calculTvaPriceRecap;

	let stockTotalHt = arround(totalPriceHt);
	let stockResultTtc = arround(calculTotalTtcRecap);
	let stockResultTva = arround(calculTvaPriceRecap);

	priceRecap.innerText = stockTotalHt + " €";
	totaTtcRecap.innerText = stockResultTtc + " €";
	tvaRecap.innerText = stockResultTva + " €";

	function arround(n) {
		n *= 100;
		n = Math.round(n);
		n /= 100;
		console.log(n);
		return n;
	}
}

/// ------------ ENREGISTREMENT DU FORMULAIRE DE COMMANDE  ------------ ///

formulaire.addEventListener("submit", (e) => {
	e.preventDefault();

	let erreur;

	if (!email.value) {
		erreur = "veuillez ajouter votre mail";
	}
	if (!city.value) {
		erreur = "veuillez ajouter votre ville";
	}
	if (address.value == "") {
		erreur = "veuillez ajouter votre adresse";
	}
	if (!lastName.value) {
		erreur = "veuillez ajouter votre nom";
	}
	if (!firstName.value) {
		erreur = "veuillez ajouter votre prénom";
	}

	if (erreur) {
		e.preventDefault();
		document.querySelector(".erreur").innerHTML = erreur;
		return false;
	} else {
		if (productStockLocal == null) {
			alert("votre panier est vide, merci de réesayer plus tard");
			return;
		} else {
			confirm("voulez-vous confirmer votre commande ?");
			if (confirm == true) {
			}
			//  push dans les ID des produits séléctionnés dans la variable array
			let array = [];
			for (i = 0; i < productStockLocal.length; i++) {
				let stringifyId = productStockLocal[i].id;
				array.push(stringifyId);
			}

			// création de l'objet contact avec les valeurs du formulaire
			let contact = {
				firstName: firstName.value,
				lastName: lastName.value,
				address: address.value,
				city: city.value,
				email: email.value
			};

			console.log("localstorage stringfié " + array);

			// request POST pour obtenir le numéro de commande
			const options = {
				method: "POST",
				body: JSON.stringify({
					contact,
					products: array
				}),
				headers: {
					"Content-Type": "application/json; charset = UTF-8"
				}
			};
			fetch("http://localhost:3000/api/furniture/order", options)
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					let orderNumber = res.orderId; // variable pour stocker le numéro de commande
					// stocker toutes les informations user + numéro de commande dans le localstorage
					localStorage.setItem("order", JSON.stringify(contact));
					localStorage.setItem("id-order-product", JSON.stringify(orderNumber));
					window.location.href = "page-confirmation.html";
				});
		}
	}
});

/**
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 */
