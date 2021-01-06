// import style
import '../scss/app.scss';

// import bootstrap components
import 'bootstrap/js/src/alert';
import 'bootstrap/js/src/button';
import 'bootstrap/js/src/toast';

// import own modules
import { isCurrentPage, getParam } from './helpers/pageUtils';
import { removeEl, injectSumProductsQuantity } from './helpers/DOMUtils';
import CheckoutController from './controllers/checkoutController';
import ProductController from './controllers/productController';
import OrderConfirmedController from './controllers/orderConfirmedController';
import Pages from '../../configuration/pages';

window.addEventListener('load', async () => {
  // Page products list
  if (isCurrentPage(Pages.home)) {
    await new ProductController().injectAll('#products');
  }

  // Page product
  if (isCurrentPage(Pages.product)) {
    await new ProductController().injectById(getParam('id'), '#product');
  }

  // Page checkout
  if (isCurrentPage(Pages.checkout)) {
    new CheckoutController().injectCart('#cart');
  }

  // page order-confirmed
  if (isCurrentPage(Pages.orderConfirmed)) {
    new OrderConfirmedController()
      .injectOrderId('#order-id')
      .injectTotalPrice('#total-price')
      .clearOrder();
  }

  injectSumProductsQuantity('.total-items-cart');

  removeEl('#data-loading');
});
