import Cart from '../models/cart';
import { formatPrice } from '../helpers/utils';
import Template from '../helpers/template';

export default class CheckoutView {
  static renderCart(products) {
    let htmlStr = '<table class="table"><tbody>';

    for (const product of products) {
      htmlStr += `<tr class="small">
        <th class="py-4 fw-normal text-muted">
          ${product.name} <span>x ${product.quantity}</span>
        </th>
        <td class="py-4 text-muted text-end">
          ${formatPrice(product.price)}
        </td>
      </tr>`;
    }

    htmlStr += `<tr>
      <th class="py-4 text-uppercase fw-normal small align-bottom">
        Total
      </th>
      <td class="py-4 h5 fw-normal text-end">${formatPrice(Cart.sumProductsPrice())}</td>
    </tr>`;

    htmlStr += '</tbody></table>';

    if (products.length > 0) {
      htmlStr += `<div class="text-end">
        <button class="btn btn-secondary">Vider</button>
      </div>`;
    }

    return new Template(htmlStr);
  }
}
