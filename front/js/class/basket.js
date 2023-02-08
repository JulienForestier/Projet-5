export class Basket {
  constructor() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      this.basket = [];
    } else {
      this.basket = JSON.parse(basket);
    }
  }
  save() {
    localStorage.setItem("basket", JSON.stringify(this.basket));
  }
  add(product) {
    let foundProduct = this.basket.find(
      (p) => p.id == product.id && p.color == product.color
    );
    if (
      foundProduct != undefined &&
      foundProduct.quantity + product.quantity <= 100
    ) {
      foundProduct.quantity += product.quantity;
    } else if (
      foundProduct != undefined &&
      foundProduct.quantity + product.quantity >= 100
    ) {
      alert("vous avez atteind la quantité maximale");
    } else {
      product.quantity = product.quantity;
      this.basket.push(product);
    }
    this.save();
  }
  remove(id, color) {
    this.basket = this.basket.filter((p) => p.id != id && p.color != color);
    this.save();
  }
  changeQuantity(id, color, quantity) {
    let foundProduct = this.basket.find((p) => p.id == id && p.color == color);
    if (foundProduct != undefined) {
      foundProduct.quantity = quantity;
      if (foundProduct.quantity <= 0) {
        this.remove(foundProduct);
      }
    } else {
      this.save();
    }
    this.save();
  }
  getNumberProduct() {
    let number = 0;
    for (let product of this.basket) {
      number += parseInt(product.quantity);
    }
    return number;
  }
}
