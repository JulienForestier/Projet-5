// Class qui gére le panier en local storage avec ses méthodes attenantes: ajout, changement, suppression, nombre de produits
export class Basket {
  constructor() {
    this.basket = JSON.parse(localStorage.getItem("basket")) || [];
  }

  save() {
    localStorage.setItem("basket", JSON.stringify(this.basket));
  }

  add(product) {
    let foundProduct = this.basket.find(
      (p) => p.id === product.id && p.color === product.color
    );
    if (foundProduct !== undefined) {
      if (foundProduct.quantity + product.quantity <= 100) {
        foundProduct.quantity += product.quantity;
        this.save();
      } else {
        foundProduct.quantity = 100;
        this.save();
        alert("vous avez atteint la quantité maximale");
      }
    } else {
      this.basket.push({ ...product, quantity: product.quantity });
      this.save();
    }
  }

  remove(id, color) {
    this.basket = this.basket.filter(
      (p) =>
        (p.id !== id && p.color !== color) || (p.id === id && p.color !== color)
    );
    this.save();
  }

  changeQuantity(id, color, quantity) {
    let foundProduct = this.basket.find(
      (p) => p.id === id && p.color === color
    );
    if (foundProduct) {
      if (quantity <= 0) {
        this.remove(id, color);
      } else if (quantity >= 100) {
        alert("Vous avez atteind la qunatité maximale de 100");
        foundProduct.quantity = 100;
      } else {
        foundProduct.quantity = quantity;
        this.save();
      }
    }
  }

  getNumberProduct() {
    return this.basket.reduce(
      (acc, product) => acc + parseInt(product.quantity),
      0
    );
  }
}
