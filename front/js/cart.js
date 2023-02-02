const cartItems = document.getElementById("cart__items");
let basket = JSON.parse(localStorage.getItem("basket"));

async function fetchProduct(product) {
  await fetch(`http://localhost:3000/api/products/${product.id}`)
    .then((res) => res.json())
    .then((data) => (produit = data));
  console.log(produit);
}

function basketDisplay(basket) {
  let produit = {};
  cartItems.innerHTML = basket.map((product) => {
    setTimeout(() => {
      fetchProduct(product);
    }, 10);
    console.log(produit);
    return `
    <article class="cart__item" data-id="${product.ID}" data-color=${product.color}>
     <div class="cart__item__img">
                  <img src=${produit.imgageUrl} alt=${produit.altTxt}>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produit.name}</h2>
                    <p>${produit.price}</p>
                    <p>${produit.price}</p>
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
