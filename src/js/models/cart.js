import Storage from '../helpers/storage';

export default class Cart {
  static addProduct({
    id, name, price, quantity,
  } = {}) {
    const product = {
      id, name, price, quantity,
    };

    const productIndex = this.findProductIndex(id);

    let products = this.getProducts();

    if (productIndex === -1) {
      products = products.concat([product]);
    } else {
      products[productIndex].quantity += 1;
    }

    Storage.set('products', products);
  }

  static clearProducts() {
    Storage.remove('products');
  }

  static getProducts() {
    return Storage.get('products') || [];
  }

  static findProductIndex(id) {
    return this.getProducts().findIndex((product) => product.id === id);
  }

  static sumProductsPrice() {
    const products = this.getProducts();
    let sum = 0;

    for (let i = 0; i < products.length; i += 1) {
      sum += (products[i].price * products[i].quantity);
    }
    return Number(sum);
  }

  static sumProductsQuantity() {
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
    Storage.remove('orderId');
  }
}
