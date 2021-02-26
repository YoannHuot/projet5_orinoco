
let productStockLocal = JSON.parse(localStorage.getItem("product")); // variable ESSENTIEL qui permet de transformer le JSON en Javascript$ //
let articleRecap = document.querySelector(".article-recap");
let buttonConfirmCommand = document.querySelector(".confirm-commande");
let priceRecap = document.querySelector(".price-product-recap"); 
let tvaRecap = document.querySelector(".tva-product-recap");
let totaTtcRecap = document.querySelector(".total-product-recap");


productStockLocal = Object.values(productStockLocal);
// --- permet de transformer les propriétés "string" de l'objet ProductStockLocal en propriétés énumérables pour ensuite les utiliser dans une boucle -- //
// - a transformer le proto__.object en proto__.array ce qui le rend énumérable -// 



// ------------------------------- PANIER / AJOUT QUANTITE / SUPPRESSION QUANTITI -------------------------------------- //

                                    // // // // -------- Panier vide  ------ \\ \\ \\ \\ 
if(productStockLocal == null) { 
    const basketEmpty = 
    `<div class ="container-panier-vide">
        <div>le panier est vide</div>
    </div>`;
    articleRecap.innerHTML = basketEmpty;
} 
                                // // // // -------- Panier plein ---------- \\ \\ \\ \\ 
else { 
    for (let k = 0; k < productStockLocal.length; k++) { 

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
            createPriceBasket.innerHTML = productStockLocal[k].price;
            
        let createQuantityBasket = document.createElement("p"); 
            createQuantityBasket.className = ("productquantity");
            createQuantityBasket.innerText = Number(productStockLocal[k].quantity);

        let createDeleteBasket = document.createElement("div");
            createDeleteBasket.className = ("productdelete");

        let createSelectQuantityBasket = document.createElement("select");
            
        for (let numberOption = 0; numberOption < 101; numberOption++) {
            let createOptionQuantityBasket = document.createElement("option");
            createOptionQuantityBasket.innerText = numberOption;
            createOptionQuantityBasket.className ="option-basket";
            createSelectQuantityBasket.appendChild(createOptionQuantityBasket);
        };
            articleRecap.appendChild(createProductBasket);
            createProductBasket.appendChild(createImgBasket);
            createProductBasket.appendChild(createNameBasket);
            createProductBasket.appendChild(createPriceBasket);
            createProductBasket.appendChild(createQuantityBasket);
            createProductBasket.appendChild(createDeleteBasket);
            createProductBasket.appendChild(createSelectQuantityBasket);
            
            createSelectQuantityBasket.addEventListener("change", (event) => { 
                newAddToCard();
            });
            
            addToConfirm();

            // ----------- ENREGISTRE LA NOUVELLE QUANTITE DANS LE LOCALSTORAGE ----------- //
        function newAddToCard() {
            let resultOptionSelect = event.target.value; // permet d'enrgistrer la valeur de l'otpion sélectionnée //
            
            let objectProductBasket = {
            name : createNameBasket.innerHTML, 
            price : createPriceBasket.innerText, 
            img : createImgBasket.src,
            quantity: resultOptionSelect
            }

            createQuantityBasket.innerText = resultOptionSelect; // changement de la quantité affichée sur la card HTML 

            productStockLocal = JSON.parse(localStorage.getItem("product"));
            productStockLocal = {
                ...productStockLocal,[objectProductBasket.name] : objectProductBasket // permet de regrouper les mêmes cards sous un même objet // 
            }; 
            productStockLocal[objectProductBasket.name].quantity = resultOptionSelect;
            localStorage.setItem("product", JSON.stringify(productStockLocal));
        }

        function addToConfirm() { 
            let multiplicateQuantityPrice = Number(createPriceBasket.innerHTML) * Number(createQuantityBasket.innerHTML);
            console.log(multiplicateQuantityPrice);
        }
    }
}              

// ------------------------------- FIN PANIER / AJOUT QUANTITE / SUPPRESSION QUANTITI -------------------------------------- //



// ------------------------------- ------------CONFIRMATION DE LA COMMANDE------------ ------------------------------- \\

buttonConfirmCommand.addEventListener("click", () => { 
    console.log("hello world");
});
