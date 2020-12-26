/* eslint-disable no-underscore-dangle */
import Cart from '../cart';
import Client from '../client';
import CheckoutView from '../views/checkout';
import ProductCategory from '../product-category';
import {
  insertToDOM, Notify, redirect, injectTotalItemsCart,
} from '../helpers';
import routes from '../../../configuration/routes';

export default class CheckoutController {
  constructor(formId = 'order-form', category = process.env.PRODUCT_CATEGORY) {
    this.client = new Client();
    this.category = new ProductCategory(category);
    this.products = Cart.getProducts();
    this.formId = formId;
    this.orderButton = document.querySelector(`#${this.formId} button`);

    if (this.products.length > 0) {
      this.orderButton.disabled = false;
    }

    document.body.addEventListener('submit', this);
    document.body.addEventListener('click', this);
  }

  async order({ contact, products }) {
    const { orderId } = await this.client.create(`/${this.category.name}/order`, JSON.stringify({ contact, products }));

    Cart.setOrderId(orderId);
  }

  injectCart(selector, replace = false) {
    const el = document.querySelector(selector);

    if (el) {
      this.cartSelector = selector;

      insertToDOM(CheckoutView.listCart(this.products), el, replace);
    }
  }

  async onOrder(event) {
    if (event.target.id !== this.formId) {
      // submit event from an other form, resolve promise
      return;
    }

    event.preventDefault();

    try {
      const contact = Object.fromEntries(new FormData(event.target));

      const products = this.products.map((product) => product._id);

      await this.order({ contact, products });

      redirect(routes.orderConfirmed);
    } catch (error) {
      Notify('Impossible de passer la commande!', `#${this.formId}`, 'bg-danger text-white');

      if (process.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }

  onClearCart(event) {
    if (event.target !== document.querySelector(`${this.cartSelector} button`)) {
      return;
    }

    Cart.clearProducts();

    this.products = [];

    injectTotalItemsCart('.total-items-cart');

    this.injectCart(this.cartSelector, true);

    this.orderButton.disabled = true;
  }

  async handleEvent(e) {
    if (e.type === 'submit') {
      await this.onOrder(e);
    }

    if (e.type === 'click') {
      this.onClearCart(e);
    }
  }
}
