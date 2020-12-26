import Cart from '../cart';
import { formatPrice } from '../helpers';

export default class CheckoutView {
  static listCart(products) {
    let template = '<table class="table"><tbody>';

    for (const product of products) {
      template += `<tr class="small">
        <th class="py-4 fw-normal text-muted">
          ${product.name} <span>x ${product.quantity}</span>
        </th>
        <td class="py-4 text-muted text-end">
          ${formatPrice(product.price)}
        </td>
      </tr>`;
    }

    template += `<tr>
      <th class="py-4 text-uppercase fw-normal small align-bottom">
        Total
      </th>
      <td class="py-4 h5 fw-normal text-end">${formatPrice(Cart.sumProducts())}</td>
    </tr>`;

    template += '</tbody></table>';

    if (products.length > 0) {
      template += `<div class="text-end">
        <button class="btn btn-secondary">Vider</button>
      </div>`;
    }

    return template;
  }
}
