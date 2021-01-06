import Cart from '../models/cart';

export const strToFragment = (htmlStr) => document.createRange().createContextualFragment(htmlStr);

export const removeEl = function removeEl(selector) {
  const el = document.querySelector(selector);

  if (el) {
    el.parentNode.removeChild(el);
  }
};

export const injectSumProductsQuantity = function injectSumProductsQuantity(selectors) {
  const els = document.querySelectorAll(selectors);

  const total = Cart.sumProductsQuantity();

  for (const el of els) {
    el.textContent = total;
  }
};

export default {
  strToFragment,
  removeEl,
  injectSumProductsQuantity,
};
