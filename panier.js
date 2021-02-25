// ----------- variable ESSENTIEL qui permet de transformer le JSON en Javascript ------------ //
let productStockLocal = JSON.parse(localStorage.getItem("product")); 


let sectionRecap = document.querySelector(".section-recap");

console.log(productStockLocal);

// --- permet de transformer les propriétés "string" de l'objet ProductStockLocal en propriétés énumérables pour ensuite les utiliser dans une boucle --- //
productStockLocal = Object.values(productStockLocal);
console.log(productStockLocal);


    // -------- PANIER VIDE  ------ // 
if(productStockLocal == null) { 
    const basketEmpty = 
    `<div class ="container-panier-vide">
        <div>le panier est vide</div>
    </div>`;
    sectionRecap.innerHTML = basketEmpty;
} 

else { 
    for (let k = 0; k < productStockLocal.length; k++) { 

        let createIdBasket = document.createElement("div");
            createIdBasket.innerHTML = productStockLocal[k].id; 
            console.log(createIdBasket);

        let createProductBasket = document.createElement("div"); 
            createProductBasket.className = "grid-produit";

        let createImgBasket = document.createElement("img"); 
            createImgBasket.className ="picturebasket"
            createImgBasket.src = productStockLocal[k].img;

        let createNameBasket = document.createElement("p");
            createNameBasket.className = ("productname"); 
            createNameBasket.innerHTML = productStockLocal[k].name;

        let createPriceBasket = document.createElement("p"); 
            createPriceBasket.className = ("productprice"); 
            createPriceBasket.innerHTML = productStockLocal[k].price + " €";
            
        let createQuantityBasket = document.createElement("p"); 
            createQuantityBasket.className = ("productquantity");
            createQuantityBasket.innerText = Number(productStockLocal[k].quantity);
            // console.log(productStockLocal[k].quantity);

        let createDeleteBasket = document.createElement("div");
            createDeleteBasket.className = ("productdelete");

        // --- SI le produit dans le local storage apparait déjà sur la page, alors augmenter uniquement la quantité ---  if(productStocklocal[k].id = true) { createQuantity[k].innerHtml ++ else {//
            sectionRecap.appendChild(createProductBasket);
            createProductBasket.appendChild(createImgBasket);
            createProductBasket.appendChild(createNameBasket);
            createProductBasket.appendChild(createPriceBasket);
            createProductBasket.appendChild(createQuantityBasket);
            createProductBasket.appendChild(createDeleteBasket);
            createProductBasket.appendChild(createIdBasket);  
    }
}
// Reprise & créations des éléments du local storage sur la page panier // 



// for (const product in productStockLocal) {
        
//     console.log(productStockLocal);

//     for (let k = 0; k < productStockLocal.length; k++) {


            
//     };
//             //fin de création des éléments sur la page panier // 



// // ----------- PANIER PLEIN ----------- // 
