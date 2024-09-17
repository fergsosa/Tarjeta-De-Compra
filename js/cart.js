import products from "../data/products.js";

const cart = () => {
  const d = document,
    $body = d.querySelector("body"),
    $listCartHTML = d.querySelector(".listCart"),
    $iconCart = d.querySelector(".icon-cart"),
    $iconCartSpan = $iconCart.querySelector("span"),
    $closeCart = d.querySelector(".close");

  let cart = [];

  // abrir y cerrar pestaña
  $iconCart.addEventListener("click", () => {
    $body.classList.toggle("activeTabCart");
  });
  $closeCart.addEventListener("click", () => {
    $body.classList.toggle("activeTabCart");
  });

  // Establecer producto en la cesta
  const setProductInCart = (idProduct, value) => {
    let positionThisProductInCart = cart.findIndex(
      (value) => value.product_id == idProduct
    );
    if (value <= 0) {
      cart.splice(positionThisProductInCart, 1);
    } else if (positionThisProductInCart < 0) {
      cart.push({
        product_id: idProduct,
        quantity: 1,
      });
    } else {
      cart[positionThisProductInCart].quantity = value;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    addCartToHTML();
  };

  // añadir cesta a HTML
  const addCartToHTML = () => {
    $listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        console.log(item);

        totalQuantity = totalQuantity + item.quantity;
        let newItem = d.createElement("div");
        newItem.classList.add("item");
        newItem.dataset.id = item.product_id;

        let positionProduct = products.findIndex(
          (value) => value.id == item.product_id
        );
        let info = products[positionProduct];
        console.log(info);

        $listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
          <div class="image">
            <img src="./images/${info.id}.png">
          </div>
          <div class="name">${info.name}</div>
          <div class="totalPrice">$${info.price * item.quantity}</div>
          <div class="quantity">
            <span class="minus" data-id="${info.id}"> < </span>
            <span>${item.quantity}</span>
            <span class="plus" data-id="${info.id}"> > </span>
          </div>
          `;
      });
    }
    $iconCartSpan.innerText = totalQuantity;
  };

  d.addEventListener("click", (event) => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let quantity = null;
    let positionProductInCart = cart.findIndex(
      (value) => value.product_id == idProduct
    );
    switch (true) {
      case buttonClick.classList.contains("addCart"):
        quantity =
          positionProductInCart < 0
            ? 1
            : cart[positionProductInCart].quantity + 1;
        setProductInCart(idProduct, quantity);
        break;
      case buttonClick.classList.contains("minus"):
        quantity = cart[positionProductInCart].quantity - 1;
        setProductInCart(idProduct, quantity);
        break;
      case buttonClick.classList.contains("plus"):
        quantity = cart[positionProductInCart].quantity + 1;
        setProductInCart(idProduct, quantity);
        break;
      default:
        break;
    }
  });

  const initApp = () => {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      addCartToHTML();
    }
  };
  initApp();
};
export default cart;
