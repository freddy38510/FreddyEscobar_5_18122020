# Plan de tests

Veuillez trouver ci-dessous la liste des fonctions qui semblent
les plus pertinentes à tester.

## [DOMUtils.js](/src/js/helpers/DOMUtils.js)

### [`strToFragment(htmlStr)`](/src/js/helpers/DOMUtils.js#L3)

Convertit `htmlStr` en [`DocumentFragment`](https://developer.mozilla.org/fr/docs/Web/API/DocumentFragment).

> `DocumentFragment` est utilisé comme une version légère de `Document` pour
> stocker un segment de structure de document composé de nœuds,
> tout comme un document standard.

#### Test

```javascript
// création du paramètre
const name = 'Jacques';
const htmlStr = `<div>Hello <strong>${name}</strong>!</div>`;

// appel de la fonction
const fragment = strToFragment(htmlStr);

// affichage du résultat
console.log(fragment.querySelector('div').outerHTML);
```

#### Résultat attendu

```xml
  <div>Hello <strong>Jacques</strong>!</div>
```

#### Problème possible

Peut ne pas renvoyer la valeur attendue, si `htmlStr` n'est pas du code HTML5 valide.

### [`removeEl(selector)`](/src/js/helpers/DOMUtils.js#L5-L11)

Supprime l'élément du DOM spécifié par `selector`.

#### Test

```javascript
// création de l'élément
const el = document.createElement('div').id('a-supprimer');
document.body.appendChild(el);

// appel de la fonction
removeEl('#a-supprimer');

// affichage du résultat
console.log(document.getElementById('a-supprimer'));
```

#### Résultat attendu

```javascript
null
```

### [`injectSumProductsQuantity(selectors)`](/src/js/helpers/DOMUtils.js#L13-L21)

Injecte la somme de la quantité des produits, présents dans le panier,
dans le contenu des éléments spécifiés par `selectors`.

#### Test

```javascript
// ajout de produits dans le panier (faire varier les quantités)
const products = [{ quantity: 1 }, { quantity: 4 }, { quantity: 2 }];
localStorage.setItem('products', JSON.stringify(products));

// création des éléments
const div = document.createElement('div').classList.add('total-products');
const span = document.createElement('span').classList.add('total-products');
document.body.appendChild(div);
document.body.appendChild(span);

// appel de la fonction
injectSumProductsQuantity('.total-products');

// affichage du résultat
const elements = document.querySelectorAll('.total-products');
console.log(elements[0].outerHTML);
console.log(elements[1].outerHTML);
```

#### Résultats attendus

```xml
<div class="total-products">7</div>
<span class="total-products">7</span>
```

## [`notify.js`](/src/js/helpers/notify.js)

### [`notify(msg, ?selector, ?classes)`](/src/js/helpers/notify.js#L4-L22)

Ajoute et affiche le composant
[Toast de Bootstrap](https://getbootstrap.com/docs/5.0/components/toasts/)
avec les `classes` css et
contenant `msg` dans son corps,
dans l'élément issu de `selector`.

> Note: Le composant se ferme automatiquement au bout de 5 secondes,
puis il est retiré du DOM.

#### Test

```javascript
// création de l'élément
const div = document.createElement('div')
div.id = 'conteneur';
document.body.appendChild(div);

// création des paramètres
const msg = 'Ceci est une notification';
const selector = '#conteneur';
const classes = 'text-dark bg-warning';

// appel de la fonction
notify(msg, selector, classes);

// affichage des résultats
console.log(document.getElementById('conteneur').outerHTML);

setTimeout(function(){
  console.log(document.getElementById('conteneur'));
  },
5000); // délai de 5 secondes
```

#### Résultat attendu

```xml
<div id="conteneur">
  <div class="toast-container position-absolute p-3 top-0 end-0">
    <div class="toast d-flex align-items-center text-dark bg-warning"
      role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-body">
        Ceci est une notification
      </div>
      <button type="button" class="btn-close btn-close-white ms-auto me-2"
        data-bs-dismiss="toast" aria-label="Fermer"></button>
    </div>
  </div>
</div>
```

```javascript
null
```

## [pageUtils.js](/src/js/helpers/pageUtils.js)

### [`isCurrentPage(path)`](/src/js/helpers/pageUtils.js#L1-L3)

Renvoie `true` si `path` est égale au chemin de l’url de la page courante,
`false` si ce n’est pas le cas.

> Note: Ne prend pas en compte la barre oblique finale des deux valeurs
> lors de leur comparaison.

#### Test

```javascript
// url de la page courante: http://localhost:8000/furnitures/

console.log(isCurrentPage('/about-us'));

console.log(isCurrentPage('/furnitures/'));

console.log(isCurrentPage('/furnitures'));

console.log(isCurrentPage('/furnitures/1'));

console.log(isCurrentPage('/furnitures/index.html'));
```

#### Résultat attendu

```javascript
false
true
true
false
true
```

### [`stripTrailingSlash(str)`](/src/js/helpers/pageUtils.js#L17-L23)

Retire la barre oblique finale d'une chaîne de caractère `str` dont la longueur
est supérieure à 1.

#### Test

```javascript
console.log(stripTrailingSlash('/'));
console.log(stripTrailingSlash('/chaîne de test/'));
console.log(stripTrailingSlash('deuxième chaîne de test//'));
```

#### Résultats attendus

```javascript
/
/chaîne de test
deuxième chaîne de test/
```

## [`template.js`](/src/js/helpers/template.js)

### [`appendTo(el, ?replace)`](/src/js/helpers/template.js#L13-L21)

Méthode de la classe `Template` qui ajoute le `FragmentDocument`,
issu de l'objet hérité de la classe, à la fin de la
liste des enfants du noeud `el`, ou les remplace si `replace` vaut `true`.

Retourne l'objet hérité de la classe
afin de pouvoir appeler d'autres méthodes en chaîne.

#### Test

```javascript
// création de l'élément
document.createElement('div').id = 'conteneur';

// création de l'objet hérité de la classe
const htmlStr = '<div>Hello from <strong>Template</strong>!</div>';
const myTemplate = new Template(htmlStr);

// appel de la méthode
myTemplate.appendTo(el);

// affichage du résultat
console.log(document.getElementById('conteneur').outerHTML);
```

#### Résultat attendu

```xml
<div id="conteneur">
  <div>Hello from <strong>Template</strong>!</div>
</div>
```

### [`renderAlert(msg)`](/src/js/helpers/template.js#L23-L27)

Méthode statique de la classe Template qui injecte le contenu HTML du composant
[Alert de Bootstrap](https://getbootstrap.com/docs/5.0/components/alerts)
avec la chaîne de caractère `msg` en contenu.

#### Test

```javascript
// appel de la méthode statique
Template.renderAlert('ceci est un message d\'alerte');

// affichage du résultat
console.log(document.querySelector('.alert').outerHTML);
```

#### Résultat attendu

```xml
<div class="alert alert-info" role="alert">
  <p class="text-center m-0">ceci est un message d'alerte</p>
</div>
```

### [`renderToast(msg, ?classes)`](/src/js/helpers/template.js#L29-L39)

Méthode statique de la classe Template qui injecte le contenu HTML du composant
[Toast de Bootstrap](https://getbootstrap.com/docs/5.0/components/toasts)
avec les classes css spécifiées et la chaîne de caractère `msg` en contenu.

#### Test

```javascript
// appel de la méthode statique
Template.renderToast('ceci est un composant Toast', 'text-white bg-primary');

// affichage du résultat
console.log(document.querySelector('.toast-container').outerHTML);
```

#### Résultat attendu

```xml
<div class="toast-container position-absolute p-3 top-0 end-0">
  <div class="toast d-flex align-items-center text-white bg-primary"
    role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body">
      ceci est un composant Toast
    </div>
    <button type="button" class="btn-close btn-close-white ms-auto me-2"
      data-bs-dismiss="toast" aria-label="Fermer"></button>
  </div>
</div>
```

## [`utils.js`](/src/js/helpers/utils.js)

### [`formatPrice(price)`](/src/js/helpers/utils.js#L1-L6)

Retourne `price` divisé par 100 et formaté en devise (euros).

> Note: `price` doit être un nombre entier du prix non formaté en centimes.

#### Test

```javascript
formatPrice(451265)
```

#### Résultat attendu

```javascript
4 512,65 €
```

## [`checkoutController.js`](/src/js/controllers/checkoutController.js)

### [`order({ firstName, lastName, address, city, email }, productsIds)`](/src/js/controllers/checkoutController.js#L26-L37)

Méthode asynchrone de la classe `CheckoutController` qui envoie une requête
à l'API pour passer une commande. Retourne le corps de la réponse de
l'API sous forme d'objet.

> Note: Peut retourner une erreur provenant de la requête vers l'API ou de sa réponse.

#### Test

```javascript
// création des paramètres
const contact = {
  firstName: 'John',
  lastName: 'Doe',
  address: '42 rue de la liberté',
  city: 'Paris',
  email: 'johndoe@example.com'
}

// ids de produits réellement existants
const realProducts = ['5be9cc611c9d440000c1421e', '5beaae361c9d440000a57d99'];
const fakeProducts = ['1a1a1a', '2b2b2b2b'];

// appel de la fonction et affichage des résultats
new CheckoutController().order({contact, realProducts})
  .then(result => console.log(result));

new CheckoutController().order({contact, fakeProducts});
```

#### Résultats attendus

```javascript
{
  contact: {…},
  products: Array(2),
  orderId: "fcfb2640-5022-11eb-bfd3-4bfc19a715d7"
}

```

```javascript
Error: (400) Bad Request
```

### [`injectCart(selector, ?replace)`](/src/js/controllers/checkoutController.js#L39-L49)

Méthode de la classe `CheckoutController` qui injecte des éléments
représentant le contenu du panier à l'endroit spécifié par `selector`.

Si `replace` vaut `true`, alors les éléments enfants déjà présents,
sont remplacés.

> Note: Retourne l'objet hérité de la classe
afin de pouvoir appeler d'autres méthodes en chaîne.

#### Test

```javascript
// création de l'élément
const div = document.createElement('panier');
div.id = 'conteneur';
document.body.appendChild(div);

// ajout de produits dans le panier
const products = [
  {
    name: 'Un Produit',
    quantity: 2,
    price: 412000
  },
];

localStorage.setItem('products', JSON.stringify(products));

// appel de la méthode
new CheckoutController().injectCart('#panier');

// affichage du résultat
console.log(document.getElementById('panier').outerHTML);
```

#### Résultat attendu

```xml
<div id="panier">
  <table class="table">
    <tbody>
      <tr class="small">
        <th class="py-4 fw-normal text-muted">
          Un Produit <span>x 2</span>
        </th>
        <td class="py-4 text-muted text-end">
          412,00&nbsp;€
        </td>
      </tr>
      <tr>
        <th class="py-4 text-uppercase fw-normal small align-bottom">
          Total
        </th>
        <td class="py-4 h5 fw-normal text-end">824,00&nbsp;€</td>
      </tr>
    </tbody>
  </table>
  <div class="text-end">
    <button class="btn btn-secondary">Vider</button>
  </div>
</div>
```

## [`orderConfirmedController.js`](/src/js/controllers/orderConfirmedController.js)

### [`injectTotalPrice(selector)`](/src/js/controllers/orderConfirmedController.js#L21-L29)

Méthode de la classe `OrderConfirmedController` qui injecte le prix total,
formaté en devise (Euros), des produits présents dans le panier,
au contenu de l'élément spécifié via `selector`.

> Note: Retourne l'objet hérité de la classe
afin de pouvoir appeler d'autres méthodes en chaîne.

#### Test

```javascript
// ajout de produits au panier
const products = [
  { quantity: 1, price: 10000 },
  { quantity: 4, price: 25000 },
  { quantity: 2, price: 5000 }
];

localStorage.setItem('products', JSON.stringify(products));

// création de l'élément
const div = document.createElement('div');
div.id = 'conteneur';

// appel de la méthode
new OrderConfirmedController().injectTotalPrice('#conteneur');

// affichage du résultat
console.log(document.querySelector('#conteneur').outerHTML);
```

#### Résultat attendu

```xml
<div id="conteneur">1 150,00 €</div>
```

## [`productController.js`](/src/js/controllers/productController.js)

### [`injectById(id, selector)`](/src/js/controllers/productController.js#L66-L93)

Méthode asynchrone de la classe `ProductController` qui injecte le code HTML correspondant
au produit dont l'id est `id`, provenant de l'API, à l'élément spécifié via `selector`.

Injecte le composant Alert avec un message d'erreur,
si la requête vers l'API ou sa réponse, renvoie une erreur.

#### Test

```javascript
// création de l'élément
document.createElement('div').id = 'conteneur';

// appel de la méthode
const resolved = new ProductController().injectById('5be9cc611c9d440000c1421e', '#conteneur');

const rejected = new ProductController().injectById('identifiant_invalide', '#conteneur');

// affichage du résultat
resolved.then(() => console.log(document.querySelector('#conteneur').outerHTML))
rejected.then(() => console.log(document.querySelector('#conteneur').outerHTML))
```

#### Résulats attendus

```xml
<div id="conteneur">
  <article class="row">
    <div class="col-md-6 mb-4">
      <img src="http://localhost:3000/images/oak_1.jpg" class="img-fluid p-4">
    </div>
    <div class="col-md-6 mb-4">
      <div class="p-4">

        <h2 class="title">Cross Table</h2>

        <p class="lead">599,00&nbsp;€</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <form class="row g-4 position-relative" id="product-form">
          <input name="id" type="hidden" value="5be9cc611c9d440000c1421e">
          <input name="name" type="hidden" value="Cross Table">
          <input name="price" type="hidden" value="59900">
          <div class="col-12">
            <label class="col-form-label lead text-capitalize pt-0" for="varnish">vernis</label>
            <select class="form-select" id="varnish">
              <option selected="" value="Dark Oak">Dark Oak</option>
              <option value="Light Oak">Light Oak</option>
              <option value="Mahogany">Mahogany</option>
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
  </article>
</div>
```

```xml
<div id="conteneur">
  <div class="alert alert-info" role="alert">
    <p class="text-center m-0">Impossible d'afficher le produit demandé.</p>
  </div>
</div>
```

## [`productView.js`](/src/js/views/productView.js)

### [`customizationOptions(values)`](/src/js/views/productView.js#L95-L103)

Retourne une chaîne de caractère correspondant à une liste de balises HTML `option`
avec la valeur de chaque élément du tableau `values`.

> Note: la première option possède l'attribut `selected`.

#### Test

```javascript
// création du paramètre
const values = ['option 1', 'option 2', 'option 3'];

// appel de la fonction
const strHtml = customizationOptions(values);

// affichage du résultat
console.log(strHtml);
```

#### Résultat attendu

```javascript
'<option selected value="option 1">option 1</option><option value="option 2">option 2</option><option value="option 3">option 3</option>'
```
