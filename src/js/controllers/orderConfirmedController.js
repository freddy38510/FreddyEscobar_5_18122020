import Cart from '../models/cart';
import { formatPrice } from '../helpers/utils';
import { redirect } from '../helpers/pageUtils';

export default class OrderConfirmedController {
  constructor() {
    const orderId = Cart.getOrderId() || null;

    if (orderId === null) {
      redirect('/');

      return;
    }

    this.orderId = orderId;
    this.totalPrice = Cart.sumProductsPrice() || Number(0);

    document.documentElement.style.display = 'initial';
  }

  injectTotalPrice(selector) {
    const el = document.querySelector(selector);

    if (el) {
      el.textContent = formatPrice(this.totalPrice);
    }

    return this;
  }

  injectOrderId(selector) {
    const el = document.querySelector(selector);

    if (el) {
      el.textContent = this.orderId;
    }

    return this;
  }

  clearOrder() {
    Cart.clearOrderId();

    Cart.clearProducts();

    this.orderId = null;

    this.totalPrice = Number(0);
  }
}
