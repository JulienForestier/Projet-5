const items = document.getElementById("items");
let kanaps = [];

async function fetchKanaps() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (kanaps = data));
  kanapsDisplay();
}

function kanapsDisplay() {
  items.innerHTML = kanaps
    .map(
      (kanap) =>
        `
  <a href="./product.html?id=${kanap._id}">
            <article>
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">${kanap.name}</h3>
              <p class="productDescription">${kanap.description}</p>
            </article>
          </a>
  `
    )
    .join("");
}

window.addEventListener("load", fetchKanaps);
