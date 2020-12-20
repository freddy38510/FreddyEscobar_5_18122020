import { Toast } from 'bootstrap';
import routes from '../../configuration/routes';
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


export default {
  isCurrentRoute, stopLoading, formatPrice, insertToDOM,
};

export {
  isCurrentRoute, stopLoading, formatPrice, insertToDOM,
};
