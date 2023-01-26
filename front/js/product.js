const title = document.getElementById("title");
const itemImg = document.getElementsByClassName(".item__img");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const addBtn = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");

class baskets {
  constructor(id, amount, color) {
    (this.id = id), (this.amount = amount), (this.color = color);
  }
}

const url = window.location.href;
const urlSearch = new URL(url);
const id = urlSearch.searchParams.get("id");
let kanap = {};
let basket = [new baskets()];

async function fetchKanapById(id) {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => (kanap = data));
  kanapDisplay(kanap);
  console.log(kanap);
}

function kanapDisplay(kanap) {
  itemImg.innerHTML = `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;
  title.textContent = kanap.name;
  price.textContent = kanap.price;
  description.textContent = kanap.description;
  kanap.colors.map((colors) => {
    select.innerHTML = `<option value="${colors.color}">${colors.color}</option>`;
  });
}

window.addEventListener("load", fetchKanapById(id));

quantity.addEventListener("click", (e) => {});

addBtn.addEventListener("submit", (e) => {
  console.log(e);
  basket.push(new baskets());
});
