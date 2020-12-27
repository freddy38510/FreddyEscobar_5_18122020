/* eslint-disable no-underscore-dangle */
import Cart from '../cart';
import { formatPrice, redirect } from '../helpers';

export default class OrderConfirmedController {
  constructor() {
    this.orderId = Cart.getOrderId() || null;
    this.totalPrice = Cart.sumProducts() || 0;

    if (this.orderId === null) {
      redirect('/');

      return;
    }

    document.documentElement.style.display = 'initial';
  }

  injectTotalPrice(selector) {
    const el = document.querySelector(selector);

    if (el) {
      el.textContent = formatPrice(this.totalPrice);
    }
  }

  injectOrderId(selector) {
    const el = document.querySelector(selector);

    if (el) {
      el.textContent = this.orderId;
    }
  }

  clearOrder() {
    Cart.clearOrderId();

    Cart.clearProducts();

    this.orderId = null;

    this.totalPrice = 0;
  }
}
