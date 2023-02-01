const cartItems = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("basket"));

console.log(basket);

async function fetchBasket(product) {
  await fetch(`http://localhost:3000/api/products/${product.id}`)
    .then((res) => res.json)
    .then((data) => (product = data));
}

function basketDisplay(basket) {
  cartItems.innerHTML = basket.map(
    (product) =>
      `
    <article class="cart__item" data-id="${product.ID}" data-color="${product.color}">
     <div class="cart__item__img">
                  <img src="" alt="">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2></h2>
                    <p>${product.color}</p>
                    <p></p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${product.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
    </article>
    `
  );
}
basketDisplay(basket);
