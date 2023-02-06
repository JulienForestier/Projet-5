import { Basket } from "./class/basket.js";

const title = document.getElementById("title");
const itemImg = document.querySelector(".item__img");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const addBtn = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");

const url = window.location.href;
const urlSearch = new URL(url);
const id = urlSearch.searchParams.get("id");

let kanap = {};
let basket = new Basket();
let option;

async function fetchKanapById(id) {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => (kanap = data));
  kanapDisplay(kanap);
  console.log(kanap);
}

function kanapDisplay(kanap) {
  let img = document.createElement("img");
  img.src = kanap.imageUrl;
  img.alt = kanap.altTxt;
  img.setAttribute("id", "kanapImg");
  itemImg.appendChild(img);
  title.textContent = kanap.name;
  price.textContent = kanap.price;
  description.textContent = kanap.description;

  kanap.colors.forEach((color) => {
    let option = document.createElement("option");
    option.value = color;
    option.text = color;
    select.appendChild(option);
  });
}

window.addEventListener("load", fetchKanapById(id));

addBtn.addEventListener("click", (e) => {
  let jsonKanap = {
    id: id,
    quantity: quantity.value,
    color: select.value,
    price: price.innerText,
    name: title.innerText,
    img: document.getElementById("kanapImg").src,
    altTxt: document.getElementById("kanapImg").alt,
  };

  if (select.value == "") {
    alert("veuillez séléctionner une couleur");
  } else if (quantity.value <= 0 || quantity.value > 100) {
    alert("veuillez séléctionner une quantité entre 1 et 100");
  } else {
    basket.add(jsonKanap);
  }
});
