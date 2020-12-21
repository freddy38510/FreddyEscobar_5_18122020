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

const Notify = function (msg, selector = 'body', classes = 'text-white bg-success') {
  const to = document.querySelector(selector);

  if (to === null) {
    throw Error('Could not find element to inject notification');
  }

  const template = `<div class="toast-container position-absolute p-3 top-0 end-0">
    <div class="toast d-flex align-items-center ${classes}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-body">
        ${msg}
      </div>
      <button type="button" class="btn-close btn-close-white ms-auto me-2" data-bs-dismiss="toast" aria-label="Fermer"></button>
    </div>
  </div>`;

  const toastElList = [].slice.call(document.querySelectorAll('.toast'));

  toastElList.forEach(function (toastEl) {
    toastEl.parentNode.remove(toastEl);
  });

  insertToDOM(template, to);

  const toastEl = document.querySelector('.toast');

  new Toast(toastEl).show();

  toastEl.addEventListener('hidden.bs.toast', function () {
    toastEl.parentNode.remove(toastEl);
  });
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
  isCurrentRoute, stopLoading, Notify, formatPrice, injectTotalItemsCart, insertToDOM, getParamId,
};

export {
  isCurrentRoute, stopLoading, Notify, formatPrice, injectTotalItemsCart, insertToDOM, getParamId,
};
