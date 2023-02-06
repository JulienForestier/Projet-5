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
    if (foundProduct != undefined) {
      foundProduct.quantity = product.quantity;
    } else {
      product.quantity = product.quantity;
      this.basket.push(product);
    }
    this.save();
  }
  remove(product) {
    this.basket = this.basket.filter(
      (p) => p.id != product.id && p.color != product.color
    );
    this.save();
  }
  changeQuantity(product, quantity) {
    let foundProduct = this.basket.find(
      (p) => p.id == product.id && p.color == product.color
    );
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;
      if (foundProduct <= 0) {
        this.remove(foundProduct);
      }
    } else {
      this.save();
    }
  }
  getNumberProduct() {
    let number = 0;
    for (let product of this.basket) {
      number += product.quantity;
    }
    return number;
  }
}
