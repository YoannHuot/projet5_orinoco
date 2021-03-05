let productStockLocal = JSON.parse(localStorage.getItem("product")); // variable ESSENTIEL qui permet de transformer le JSON en Javascript$ //
let userContact = JSON.parse(localStorage.getItem("order"));
let orderNumber = JSON.parse(localStorage.getItem("id-order-product"));

let userFirstName = userContact.firstName;
let userLastName = userContact.lastName;

let idCommande = orderNumber;

let sectionConfirm = document.querySelector("section");
let articleConfirm = document.querySelector("article");

console.log(userFirstName);
console.log(userLastName);
console.log(idCommande);

for (let k = 0; k < productStockLocal.length; k++) {
	let createImgBasket = document.createElement("img");
	createImgBasket.src = productStockLocal[k].img;

	let createNameBasket = document.createElement("p");
	createNameBasket.innerHTML = productStockLocal[k].name;

	let createPriceBasket = document.createElement("p");
	createPriceBasket.innerHTML = productStockLocal[k].price;

	let createQuantityBasket = document.createElement("p");
	createQuantityBasket.innerText = Number(productStockLocal[k].quantity);

	articleConfirm.appendChild(createImgBasket);
	articleConfirm.appendChild(createNameBasket);
	articleConfirm.appendChild(createPriceBasket);
	articleConfirm.appendChild(createQuantityBasket);
}

sectionConfirm.innerText =
	"merci " +
	userFirstName +
	" " +
	userLastName +
	" votre commande a bien été prise en compte, vous trouverez un récapitulatif ci-dessous. Elle porte le numéro " +
	idCommande;
