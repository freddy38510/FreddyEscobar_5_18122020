/* eslint-disable no-underscore-dangle */

const customization = {
  furniture: {
    label: 'vernis',
    name: 'varnish',
  },
  teddies: {
    label: 'couleurs',
    name: 'colors',
  },
  cameras: {
    label: 'lentilles',
    name: 'lenses',
  },
};

export default class ProductCategory {
  constructor(category) {
    if (!['furniture', 'teddies', 'cameras'].includes(category)) {
      throw TypeError('Invalid products category');
    }

    this.name = category;

    this.customization = customization[`${category}`];
  }
}
