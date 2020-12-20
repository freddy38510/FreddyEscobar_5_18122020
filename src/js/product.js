/* eslint-disable no-underscore-dangle */

import routes from '../../configuration/routes';

export default class Product {
  constructor(category, {
    _id, name, price, description, imageUrl, ...rest
  } = {}) {
    const customizationName = category.customization.name;

    Object.assign(this, {
      _id, name, price, description, imageUrl, [`${customizationName}`]: rest[`${customizationName}`],
    });

    this.category = category;

    this.url = `${routes.product}?id=${_id}`;
  }
}
