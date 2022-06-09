const ol = document.getElementsByClassName('cart__items')[0];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const createStorageTotal = () => localStorage.setItem('cartTotal', JSON.stringify(0));

const showTotal = () => {
  const sectionTotal = document.getElementsByClassName('total-price')[0];
  sectionTotal.innerText = `Subtotal: R$ ${localStorage.getItem('cartTotal')}`;
};

const subtractTotal = (price) => {
  const subtract = JSON.parse(localStorage.getItem('cartTotal')) - price;
  const total = Math.round(subtract * 100) / 100;
  localStorage.setItem('cartTotal', JSON.stringify(total));
  showTotal();
};

const sumTotal = (price) => {
  const sum = (JSON.parse(localStorage.getItem('cartTotal')) + price);
  const total = Math.round(sum * 100) / 100;
  localStorage.setItem('cartTotal', JSON.stringify(total));
  showTotal();
};

const cartItemClickListener = (event) => {
  event.target.parentNode.removeChild(event.target);
  saveCartItems(ol.innerHTML);
  const price = parseFloat(event.target.innerText.split(' ').pop().split('').slice(1)
  .join(''));
  subtractTotal(price);
};

const createCartItemElement = ({ sku, name, salePrice, image }) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = image;
  img.className = 'cart_image'
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(img);

  return li;
};

const createCart = () => {
  const buttonAdd = document.getElementsByClassName('item__add');
  Array.from(buttonAdd).forEach((button) => button.addEventListener('click', async () => {
    const idItem = button.parentNode.querySelector('.item__sku').innerText;
    const { id, title, price, thumbnail } = await fetchItem(idItem);
    ol.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price, image:thumbnail }));
    saveCartItems(ol.innerHTML);
    sumTotal(price);
  }));
};

const reloadCart = () => {
  ol.innerHTML = getSavedCartItems();
  ol.childNodes.forEach((child) => child.addEventListener('click', cartItemClickListener));
};

const removeReloadParagraph = () => {
  const reload = document.getElementsByClassName('loading-img')[0];
  reload.parentNode.removeChild(reload);
};

const createHtml = async () => {
  const API = (await fetchProducts('computador'));
  removeReloadParagraph();
  API.results
    .map((objeto) => ({ sku: objeto.id, name: objeto.title, image: objeto.thumbnail }))
    .map(createProductItemElement)
    .forEach((objeto) => document.getElementsByClassName('items')[0].appendChild(objeto));
  createCart();
};

const emptyCart = () => {
  const buttonClearCart = document.getElementsByClassName('empty-cart')[0];
  const li = document.getElementsByClassName('cart__item');
  buttonClearCart.addEventListener('click', () => {
    localStorage.clear();
    Array.from(li).forEach((item) => item.parentNode.removeChild(item));
    createStorageTotal();
    showTotal();
  });
};

const showCart = () => {
  const cartIcon = document.getElementsByClassName('material-icons')[0];
  const cartSection = document.getElementsByClassName('cart')[0];
  cartIcon.addEventListener('click', () => {

    if(cartSection.id === 'hide') {
      cartSection.id = '';
    } else {
      cartSection.id = 'hide';
    }

    console.log()
  });
}

window.onload = () => {
  createStorageTotal();
  createHtml();
  reloadCart();
  emptyCart();
  showTotal();
  showCart();
};
