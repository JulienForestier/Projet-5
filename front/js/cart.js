import { Basket } from "./class/basket.js";

const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

let basket = new Basket();

async function fetchPrice(product) {
  await fetch(`http://localhost:3000/api/products/${product.id}`)
    .then((res) => res.json())
    .then((data) => {
      total += data.price * product.quantity;
    });
}
function getTotalPrice() {
  let total = 0;
  basket.basket.forEach((product) => {
    fetchPrice(product);
  });
  totalPrice.textContent = new Intl.NumberFormat().format(total) + " €";
}

async function fetchProduct(product) {
  await fetch(`http://localhost:3000/api/products/${product.id}`)
    .then((res) => res.json())
    .then((data) => basketDisplay(data, product.color, product.quantity));
}
function getBasket() {
  basket.basket.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
  basket.basket.forEach((product) => {
    fetchProduct(product);
  });
  totalQuantity.textContent = basket.getNumberProduct();
  getTotalPrice();
}

function basketDisplay(data, color, quantity) {
  let article = document.createElement("article");
  article.setAttribute("class", "cart__item");
  article.dataset.id = data.id;
  article.dataset.color = color;
  cartItems.appendChild(article);
  let cartItemImg = document.createElement("div");
  cartItemImg.setAttribute("class", "cart__item__img");
  let img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.altTxt;
  cartItemImg.appendChild(img);
  article.appendChild(cartItemImg);
  let cartItemContent = document.createElement("div");
  cartItemContent.setAttribute("class", "cart__item__content");
  article.appendChild(cartItemContent);
  let cartItemContentDescription = document.createElement("div");
  cartItemContentDescription.setAttribute(
    "class",
    "cart__item__content__description"
  );
  cartItemContent.appendChild(cartItemContentDescription);
  let h2Name = document.createElement("h2");
  h2Name.textContent = data.name;
  let pColor = document.createElement("p");
  pColor.textContent = color;
  let pPrice = document.createElement("p");
  pPrice.textContent = new Intl.NumberFormat().format(data.price) + " €";
  cartItemContentDescription.appendChild(h2Name);
  cartItemContentDescription.appendChild(pColor);
  cartItemContentDescription.appendChild(pPrice);
  let cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.setAttribute(
    "class",
    "cart__item__content__settings"
  );
  cartItemContent.appendChild(cartItemContentSettings);
  let cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  let pQuantity = document.createElement("p");
  pQuantity.textContent = "Qté :";
  cartItemContentSettingsQuantity.appendChild(pQuantity);
  let itemQuantity = document.createElement("input");
  itemQuantity.setAttribute("class", "itemQuantity");
  itemQuantity.setAttribute("id", "itemQuantity");
  itemQuantity.type = "number";
  itemQuantity.min = "1";
  itemQuantity.max = "100";
  itemQuantity.value = quantity;
  cartItemContentSettingsQuantity.appendChild(itemQuantity);
  let cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );
  let pDelete = document.createElement("p");
  pDelete.setAttribute("class", "deleteItem");
  pDelete.textContent = "Supprimer";
  cartItemContentSettingsDelete.appendChild(pDelete);
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
}

getBasket();
