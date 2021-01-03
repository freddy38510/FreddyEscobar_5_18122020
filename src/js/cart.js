/* eslint-disable no-underscore-dangle */
import Storage from './storage';

export default class Cart {
  static addProduct(product) {
    const productIndex = this.findProductIndex(product._id);

    let products = this.getProducts();

    if (productIndex === -1) {
      products = products.concat([product]);
    } else {
      products[productIndex].quantity += 1;
    }

    this.setProducts(products);
  }

  static removeProduct(id) {
    const products = this.getProducts().filter((product) => product._id !== id);

    this.setProducts(products);
  }

  static clearProducts() {
    Storage.unset('products');
  }

  static getProducts() {
    return Storage.get('products') || [];
  }

  static setProducts(data) {
    Storage.set('products', data);
  }

  static findProduct(id) {
    return this.getProducts().find((product) => product._id === id);
  }

  static findProductIndex(id) {
    return this.getProducts().findIndex((product) => product._id === id);
  }

  static sumProducts() {
    var sum = 0;
    var products = this.getProducts();

    for (let i = 0; i < products.length; i += 1) {
      sum += (products[i].price * products[i].quantity);
    }
    return Number(sum);
  }

  static totalProductsQuantity() {
    const products = Cart.getProducts();

    let total = 0;

    for (const product of products) {
      total += product.quantity;
    }

    return Number(total);
  }

  static setOrderId(id) {
    Storage.set('orderId', id);
  }

  static getOrderId() {
    return Storage.get('orderId');
  }

  static clearOrderId() {
    Storage.unset('orderId');
  }
}
