export const formatPrice = function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / 100);
};

export default {
  formatPrice,
};
