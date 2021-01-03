// import style
import '../scss/app.scss';

// import bootstrap components

import 'bootstrap/js/src/alert';
import 'bootstrap/js/src/button';
import 'bootstrap/js/src/toast';

// import own modules
import {
  isCurrentRoute, stopLoading, injectSumProductsQuantity, getParamId,
} from './helpers';
import CheckoutController from './controllers/checkout';
import ProductController from './controllers/product';
import OrderConfirmedController from './controllers/order-confirmed';

window.addEventListener('load', async () => {
  // Page products list
  if (isCurrentRoute('home')) {
    const Products = new ProductController();

    await Products.injectAll('#products');
  }

  // Page product
  if (isCurrentRoute('product')) {
    const Products = new ProductController();

    await Products.injectById(getParamId(), '#product');
  }

  // Page checkout
  if (isCurrentRoute('checkout')) {
    const Checkout = new CheckoutController();

    Checkout.injectCart('#cart');
  }

  // page order-confirmed
  if (isCurrentRoute('orderConfirmed')) {
    const OrderConfirmed = new OrderConfirmedController();

    OrderConfirmed.injectOrderId('#order-id');

    OrderConfirmed.injectTotalPrice('#total-price');

    OrderConfirmed.clearOrder();
  }

  injectSumProductsQuantity('.total-items-cart');

  stopLoading('#data-loading');
});
