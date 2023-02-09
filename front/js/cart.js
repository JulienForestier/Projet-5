import { Basket } from "./class/basket.js";

const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

let basket = new Basket();

async function fetchData(productId) {
  const res = await fetch(`http://localhost:3000/api/products/${productId}`);
  return await res.json();
}

async function getBasket() {
  basket.basket.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  let total = 0;
  for (const product of basket.basket) {
    const data = await fetchData(product.id);
    total += parseInt(data.price * product.quantity);
    basketDisplay(data, product.color, product.quantity);
  }
  totalQuantity.textContent = basket.getNumberProduct();
  totalPrice.textContent = new Intl.NumberFormat().format(total);
}

function changeEvent(id, color, quantity) {
  basket.changeQuantity(id, color, quantity);
  update();
}

function deleteKanap(id, color, article) {
  basket.remove(id, color);
  article.remove();
  update();
}

async function update() {
  let total = 0;
  for (const product of basket.basket) {
    const data = await fetchData(product.id);
    total += data.price * product.quantity;
  }
  totalPrice.textContent = new Intl.NumberFormat().format(total);
  totalQuantity.textContent = basket.getNumberProduct();
}

function basketDisplay(data, color, quantity) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = data._id;
  article.dataset.color = color;
  cartItems.appendChild(article);

  const cartItemImg = document.createElement("div");
  cartItemImg.classList.add("cart__item__img");
  article.appendChild(cartItemImg);

  const img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.altTxt;
  cartItemImg.appendChild(img);

  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  article.appendChild(cartItemContent);

  const cartItemContentDescription = document.createElement("div");
  cartItemContentDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartItemContentDescription);

  const h2Name = document.createElement("h2");
  h2Name.textContent = data.name;
  const pColor = document.createElement("p");
  pColor.textContent = color;
  const pPrice = document.createElement("p");
  pPrice.textContent = new Intl.NumberFormat().format(data.price) + " €";
  cartItemContentDescription.append(h2Name, pColor, pPrice);

  const cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(cartItemContentSettings);

  const cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

  const pQuantity = document.createElement("p");
  pQuantity.textContent = "Qté :";

  cartItemContentSettingsQuantity.appendChild(pQuantity);

  const itemQuantity = document.createElement("input");
  itemQuantity.classList.add("itemQuantity");
  itemQuantity.setAttribute("id", "itemQuantity");
  itemQuantity.type = "number";
  itemQuantity.min = "1";
  itemQuantity.max = "100";
  itemQuantity.value = quantity;
  cartItemContentSettingsQuantity.appendChild(itemQuantity);
  itemQuantity.addEventListener("change", (e) =>
    changeEvent(article.dataset.id, article.dataset.color, e.target.value)
  );

  const cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );

  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

  const pDelete = document.createElement("p");
  pDelete.classList.add("deleteItem");
  pDelete.textContent = "Supprimer";
  pDelete.addEventListener("click", () =>
    deleteKanap(article.dataset.id, article.dataset.color, article)
  );

  cartItemContentSettingsDelete.appendChild(pDelete);
}

getBasket();
