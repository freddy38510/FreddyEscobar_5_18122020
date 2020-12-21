/* eslint-disable no-underscore-dangle */
import { formatPrice } from '../helpers';

export default class ProductView {
  static list(component, products) {
    let list = '<ul class="row row-cols-1 g-4 list-unstyled mx-auto max-w-800">';

    for (const product of products) {
      list += '<li class="col">';
      list += this[component](product);
      list += '</li>';
    }

    list += '</ul>';

    return list;
  }

  static cardGrid(product) {
    return `<article class="card shadow-sm">
      <div class="row g-0">
        <div class="col-md-3 p-1">
          <a href="${product.url}">
            <img class="w-100 cover rounded-start product-img" src="${product.imageUrl}">
          </a>
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h3 class="card-title">
              <a href="${product.url}">${product.name}</a>
            </h3>
            <p class="card-text">
              ${product.description}
            </p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card-body h-100 custom-border-start">
            <p class="fw-bold fs-5">${formatPrice(product.price)}</p>
            <p class="d-grid gap-2 col-12 mx-auto mb-0">
              <a class="btn btn-primary" href="${product.url}">détails</a>
            </p>
          </div>
        </div>
      </div>
    </article>`;
  }

  static card(product) {
    const { customization } = product.category;

    return `<article class="row">
      <div class="col-md-6 mb-4">
        <img src="${product.imageUrl}" class="img-fluid p-4">
      </div>
      <div class="col-md-6 mb-4">
        <div class="p-4">

          <h2 class="title">${product.name}</h2>

          <p class="lead">${formatPrice(product.price)}</p>

          <p>${product.description}</p>

          <form class="row g-4 position-relative" id="product-form">
            <input name="_id" type="hidden" value="${product._id}">
            <input name="name" type="hidden" value="${product.name}">
            <input name="price" type="hidden" value="${product.price}">
            <input name="url" type="hidden" value="${product.url}">
            <div class="col-12">
              <label class="col-form-label lead text-capitalize pt-0" for="${customization.name}">${customization.label}</label>
              <select class="form-select" id="${customization.name}">
                ${this.selectOptions(product[customization.name], product[customization.name])}
              </select>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit">
                Ajouter au panier
              </button>
            </div>
          </form>
        </div>
      </div>
    </article>`;
  }

  static alert(msg) {
    return `<div class="alert alert-info" role="alert">
      <p class="text-center m-0">${msg}</p>
    </div>`;
  }

  static selectOptions(values, labels) {
    let template = '';

    for (let i = 0; i < labels.length; i += 1) {
      template += `<option ${i === 0 ? 'selected' : ''} value="${values[i]}">${labels[i]}</option>`;
    }

    return template;
  }
}
