import { strToFragment } from './DOMUtils';

export default class Template {
  constructor(htmlStr = '') {
    this.raw = htmlStr;
    this.fragment = this.toFragment();
  }

  toFragment() {
    return strToFragment(this.raw);
  }

  appendTo(el, replace = false) {
    if (replace) {
      el.replaceChildren(this.fragment);
    } else {
      el.appendChild(this.fragment);
    }

    return this;
  }

  static renderAlert(msg) {
    return new Template(`<div class="alert alert-info" role="alert">
      <p class="text-center m-0">${msg}</p>
    </div>`);
  }

  static renderToast(msg, classes = 'text-white bg-success') {
    return new Template(`<div class="toast-container position-absolute p-3 top-0 end-0">
      <div class="toast d-flex align-items-center ${classes}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body">
          ${msg}
        </div>
        <button type="button" class="btn-close btn-close-white ms-auto me-2" data-bs-dismiss="toast" aria-label="Fermer"></button>
      </div>
    </div>`);
  }
}
