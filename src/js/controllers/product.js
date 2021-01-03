import Client from '../client';
import Product from '../product';
import ProductCategory from '../product-category';
import ProductView from '../views/product';
import Cart from '../cart';
import { insertToDOM, injectSumProductsQuantity, Notify } from '../helpers';

export default class ProductController {
  constructor(formId = 'product-form', category = process.env.PRODUCT_CATEGORY) {
    this.client = new Client();
    this.category = new ProductCategory(category);
    this.products = [];
    this.product = null;
    this.formId = formId;

    document.body.addEventListener('submit', this);
  }

  async index() {
    const products = [];

    const productsData = await this.client.read(`/${this.category.name}/`);

    for (const productData of productsData) {
      products.push(new Product(this.category, productData));
    }

    return products;
  }

  async get(id) {
    const productData = await this.client.read(`/${this.category.name}/${id}`);

    return new Product(this.category, productData);
  }

  async injectAll(selector) {
    const el = document.querySelector(selector);

    try {
      if (el === null) {
        throw Error('Could not find element to inject template');
      }

      this.products = await this.index();

      if (this.products.length > 0) {
        insertToDOM(ProductView.list('cardGrid', this.products), el);
      }
    } catch (error) {
      if (el !== null) {
        document.title += ' - Erreur';

        insertToDOM(ProductView.alert('Impossible d\'afficher la liste des meubles demandée.'), el);
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

        insertToDOM(ProductView.card(this.product), el);
      }
    } catch (error) {
      if (el !== null) {
        document.title += ' - Erreur';

        insertToDOM(ProductView.alert('Impossible d\'afficher le meuble demandé.'), el);
      }

      if (process.env.DEV) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }

  onAddToCart(event) {
    if (event.target.id !== this.formId) {
      // submit event from an other form, resolve promise
      return;
    }

    event.preventDefault();

    try {
      const product = Object.fromEntries(new FormData(event.target));

      product.quantity = Number(1);

      Cart.addProduct(product);

      injectSumProductsQuantity('.total-items-cart');

      Notify('Produit ajouté au panier avec succès!', `#${this.formId}`);
    } catch (error) {
      Notify('Impossible d\'ajouter le produit au panier!', `#${this.formId}`, 'bg-danger text-white');

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
