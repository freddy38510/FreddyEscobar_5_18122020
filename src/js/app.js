// import style
import '../scss/app.scss';

// import bootstrap components
import 'bootstrap/js/src/alert';
import 'bootstrap/js/src/button';
import 'bootstrap/js/src/toast';

// import own modules
import {
  isCurrentRoute, stopLoading,
} from './helpers';
import ProductController from './controllers/product';

document.addEventListener('DOMContentLoaded', async () => {
  // Page products list
  if (isCurrentRoute('home')) {
    const Products = new ProductController();

    await Products.injectAll('#products');
  }

  stopLoading('#data-loading');
});
