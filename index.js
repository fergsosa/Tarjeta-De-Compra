import products from "./data/products.js";
import cart from "./js/cart.js";

let $app = document.getElementById("app");
let $temporaryContent = document.getElementById("temporaryContent");

// cargar archivo de diseño
const loadTemplate = () => {
  fetch("./html/template.html")
    .then((response) => response.text())
    .then((html) => {
      $app.innerHTML = html;
      let $contentTab = document.getElementById("contentTab");
      $contentTab.innerHTML = $temporaryContent.innerHTML;
      $temporaryContent.innerHTML = null;
      cart();
      initApp();
    });
};
loadTemplate();

const initApp = () => {
  // carga lista de producto
  let $listProductHTML = document.querySelector(".listProduct");
  $listProductHTML.innerHTML = null;

  products.forEach((product) => {
    let $newProduct = document.createElement("div");
    $newProduct.classList.add("item");
    $newProduct.innerHTML = `
      <a href="./html/detail.html?id=${product.id}">
        <img src="${product.image}">
      </a>
      <h2>${product.name}</h2>
      <div class="price">$${product.price}</div>
      <button 
        class="addCart" 
        data-id='${product.id}'>
          Agregar al carro
      </button>`;
    $listProductHTML.appendChild($newProduct);
  });
};
