import Cart from '../models/cart';
import Client from '../api/client';
import ProductCategory from '../models/productCategory';
import { injectSumProductsQuantity } from '../helpers/DOMUtils';
import { redirect } from '../helpers/pageUtils';
import notify from '../helpers/notify';
import Pages from '../../../configuration/pages';
import CheckoutView from '../views/checkoutView';

export default class CheckoutController {
  constructor(formId = 'order-form', productCategory = process.env.PRODUCT_CATEGORY) {
    this.formId = formId;
    this.productCategory = new ProductCategory(productCategory);
    this.client = new Client();
    this.products = Cart.getProducts();
    this.orderButton = document.querySelector(`#${this.formId} button`);

    if (this.products.length > 0) {
      this.orderButton.disabled = false;
    }

    document.body.addEventListener('submit', this);
    document.body.addEventListener('click', this);
  }

  async order({
    firstName, lastName, address, city, email,
  }, productsIds) {
    const data = {
      contact: {
        firstName, lastName, address, city, email,
      },
      products: productsIds,
    };

    return this.client.create(`/${this.productCategory.name}/order`, data);
  }

  injectCart(selector, replace = false) {
    const el = document.querySelector(selector);

    if (el) {
      this.cartSelector = selector;

      CheckoutView.renderCart(this.products).appendTo(el, replace);
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

      const products = this.products.map((product) => product.id);

      const { orderId } = await this.order(contact, products);

      Cart.setOrderId(orderId);

      redirect(Pages.orderConfirmed);
    } catch (error) {
      notify('Impossible de passer la commande!', `#${this.formId}`, 'bg-danger text-white');

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

    injectSumProductsQuantity('.total-items-cart');

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
