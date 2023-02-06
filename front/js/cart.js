const cartItems = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("basket"));
let panier = [];

function basketDisplay(basket) {
  cartItems.innerHTML = basket.map((product) => {
    return `
    <article class="cart__item" data-id="${product.id}" data-color=${product.color}>
     <div class="cart__item__img">
                  <img src=${product.imageUrl} alt=${product.altTxt}>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${product.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
    </article>
    `;
  });
}

basketDisplay(basket);
