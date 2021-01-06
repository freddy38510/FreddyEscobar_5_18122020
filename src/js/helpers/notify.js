import Toast from 'bootstrap/js/src/toast';
import Template from './template';

export default function notify(msg, selector = 'body', classes = 'text-white bg-success') {
  const el = document.querySelector(selector);

  if (el === null) {
    throw Error('Could not find element to inject notification');
  }

  const toastTemplate = Template.renderToast(msg, classes);

  const toastNode = toastTemplate.fragment.querySelector('.toast');

  removeAllToast();

  toastNode.addEventListener('hidden.bs.toast', () => toastNode.parentNode.remove(toastNode));

  toastTemplate.appendTo(el);

  new Toast(toastNode).show();
}

function removeAllToast() {
  const toastElList = [].slice.call(document.querySelectorAll('.toast'));

  toastElList.forEach((toastEl) => toastEl.parentNode.remove(toastEl));
}
