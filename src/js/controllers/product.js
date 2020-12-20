import Client from '../client';
import Product from '../product';
import ProductCategory from '../product-category';
import ProductView from '../views/product';
import { insertToDOM } from '../helpers';

export default class ProductController {
  constructor(category = process.env.PRODUCT_CATEGORY) {
    this.client = new Client();
    this.category = new ProductCategory(category);
    this.products = [];
  }

  async index() {
    const products = [];

    const productsData = await this.client.read(`/${this.category.name}/`);

    for (const productData of productsData) {
      products.push(new Product(this.category, productData));
    }

    return products;
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
