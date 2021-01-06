import Pages from '../../../configuration/pages';

export default class Product {
  constructor(category, {
    _id, name, price, description, imageUrl, ...args
  } = {}) {
    const customizationName = category.customization.name;

    this.id = _id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this[`${customizationName}`] = args[`${customizationName}`];
    this.category = category;
    this.url = `${Pages.product}?id=${_id}`;
  }
}
