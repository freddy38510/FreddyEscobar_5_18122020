import Client from '../api/client';
import Product from '../models/product';
import ProductCategory from '../models/productCategory';
import Cart from '../models/cart';
import { injectSumProductsQuantity } from '../helpers/DOMUtils';
import notify from '../helpers/notify';
import ProductView from '../views/productView';
import Template from '../helpers/template';

export default class ProductController {
  constructor(formId = 'product-form', productCategory = process.env.PRODUCT_CATEGORY) {
    this.formId = formId;
    this.productCategory = new ProductCategory(productCategory);
    this.client = new Client();
    this.products = [];
    this.product = null;

    document.body.addEventListener('submit', this);
  }

  async index() {
    const products = [];

    const productsData = await this.client.read(`/${this.productCategory.name}/`);

    for (const productData of productsData) {
      products.push(new Product(this.productCategory, productData));
    }

    return products;
  }

  async get(id) {
    const productData = await this.client.read(`/${this.productCategory.name}/${id}`);

    return new Product(this.productCategory, productData);
  }

  async injectAll(selector) {
    const el = document.querySelector(selector);

    try {
      if (el === null) {
        throw Error('Could not find element to inject template');
      }

      this.products = await this.index();

      if (this.products.length > 0) {
        ProductView.renderProducts(this.products).appendTo(el, true);
      }
    } catch (error) {
      if (el !== null) {
        Template.renderAlert('Impossible d\'afficher la liste des produits.').appendTo(el, true);
      }

      if (process.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }

  async injectById(id, selector) {
    const el = document.querySelector(selector);

    try {
      if (el === null) {
        throw Error('Could not find element to inject template');
      }

      this.product = await this.get(id);

      if (this.product !== null) {
        document.title += ` - ${this.product.name}`;

        ProductView.renderProduct(this.product).appendTo(el, true);
      }
    } catch (error) {
      if (el !== null) {
        Template.renderAlert('Impossible d\'afficher le produit demandé.').appendTo(el, true);
      }

      if (process.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }

  onAddToCart(event) {
    if (event.target.getAttribute('id') !== this.formId) {
      // submit event from an other form, resolve promise
      return;
    }

    event.preventDefault();

    try {
      const product = Object.fromEntries(new FormData(event.target));

      product.quantity = Number(1);

      Cart.addProduct(product);

      injectSumProductsQuantity('.total-items-cart');

      notify('Produit ajouté au panier avec succès!', `#${this.formId}`);
    } catch (error) {
      notify('Impossible d\'ajouter le produit au panier!', `#${this.formId}`, 'bg-danger text-white');

      if (process.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }

  handleEvent(e) {
    if (e.type === 'submit') {
      this.onAddToCart(e);
    }
  }
}
