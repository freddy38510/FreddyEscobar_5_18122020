import { Toast } from 'bootstrap';
import routes from '../../configuration/routes';
import Cart from './cart';

const isCurrentRoute = function (route) {
  const { pathname } = window.location;

  const fragment = clearSlashes(pathname.replace(/(index)?(\.html)?$/, ''));

  if (fragment === clearSlashes(routes[route])) return true;

  return false;
};

const stopLoading = function (selector) {
  const el = document.querySelector(selector);

  if (el) {
    el.parentNode.removeChild(el);
  }
};

const formatPrice = (price) => new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
}).format(price / 100);

const injectTotalItemsCart = (selector) => {
  const els = document.querySelectorAll(selector);
  const total = Cart.totalProductsQuantity();

  for (const el of els) {
    el.textContent = total;
  }
};

const clearSlashes = (path) => path
  .toString()
  .replace(/\/$/, '')
  .replace(/^\//, '');

const insertToDOM = (htmlStr, el, replace = false) => {
  const fragment = document.createRange().createContextualFragment(htmlStr);

  if (replace) {
    el.replaceChildren(fragment);

    return;
  }

  el.appendChild(fragment);
};

const getParamId = () => {
  const { search } = window.location;

  const params = new URLSearchParams(search);

  return params.get('id');
};

export default {
  isCurrentRoute, stopLoading, formatPrice, injectTotalItemsCart, insertToDOM, getParamId,
};

export {
  isCurrentRoute, stopLoading, formatPrice, injectTotalItemsCart, insertToDOM, getParamId,
};
