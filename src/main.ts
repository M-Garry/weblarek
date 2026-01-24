import { Catalog } from './components/models/catalog';
import {apiProducts} from './utils/data'
import './scss/styles.scss';
import { Bag } from './components/models/bag';
import { Buyer } from './components/models/buyer';
import { ApiRequest } from './components/models/ApiRequest';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { Header } from './components/views/headers';
import { EventEmitter } from './components/base/Events';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Card, IProductCard } from './components/views/card';
import { Modal } from './components/views/modal';
import { CatalogItem } from './components/views/catalog-item';


const events = new EventEmitter();
//Проверка каталога
const productsModel = new Catalog();
const bagModel = new Bag()
const api = new Api(API_URL);
const request = new ApiRequest(api) 
productsModel.setProducts(await request.getApiProducts()); 
console.log(productsModel.getProducts())

// Получаем все товары из модели
const products = productsModel.getProducts();

// Функция-адаптер для image
function adaptImage(path: string): string {
  // Если путь начинается с '/', убираем его и добавляем /src/utils/images/
  if (path.startsWith('/')) {
    return `/src/utils/images${path}`;
  }
  return path; // если нет — оставляем как есть
}

// Создаём карточки
const catalogItems = products.map(product => {
  const item = new CatalogItem(events);
  item.id = product.id;
  item.title = product.title;
  item.category = product.category;
  item.price = product.price;
  item.image = adaptImage(product.image)
  return item.render();
});

// Вставляем в галерею
const gallery = document.querySelector('.gallery') as HTMLElement;
gallery.replaceChildren(...catalogItems);