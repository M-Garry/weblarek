import { catalog } from './components/models/catalog';
import {apiProducts} from './utils/data'
import './scss/styles.scss';
import { Bag } from './components/models/bag';
import { Buyer } from './components/models/buyer';
import { ApiRequest } from './components/models/ApiRequest';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

////////////////////////////// Тестирование Локальной модели данных////////////////

//Проверка каталога
const productsModel = new catalog();
productsModel.setProducts(apiProducts.items); 
productsModel.setSelectedProduct(apiProducts.items[1])

console.log('Массив товаров из каталога: ', productsModel.getProducts()) 
console.log('Проверка метода getProductById у класса catalog: ', productsModel.getProductById(apiProducts.items[0].id)) 
console.log('Проверка метода getSelectedProduct у класса catalog: ', productsModel.getSelectedProduct()) 

//Проверка корзины

const bagModel = new Bag()

bagModel.AddProduct(apiProducts.items[2])
bagModel.AddProduct(apiProducts.items[3])

console.log('Проверка метода ListProduct() у класса Bag: ', bagModel.ListProduct()) 
console.log('Проверка метода CountProducts() у класса Bag: ', bagModel.CountProducts()) 
console.log('Проверка метода SumProducts() у класса Bag: ', bagModel.SumProducts() ) 
console.log('Проверка метода CheckProduct() у класса Bag: ', bagModel.CheckProduct(apiProducts.items[3].id) ) 
bagModel.RemoveProduct(apiProducts.items[3])
console.log('Проверка метода RemoveProduct() у класса Bag: ', bagModel.ListProduct()) 
bagModel.ClearBag()
console.log('Проверка метода ClearBag() у класса Bag: ', bagModel.ListProduct()) 

//Проверка покупателя

const buyerModel = new Buyer({
  payment: 'card',
  address: '',
  phone: '',
  email: ''
})

console.log('Проверка метода GetBuyer() у класса Buyer: ', buyerModel.GetBuyer())
console.log('Проверка метода Validate() у класса Buyer: ', buyerModel.Validate())
buyerModel.UpdateBuyer('email','123@mail.ru')
console.log('Проверка метода UpdateBuyer() у класса Buyer (добавил почту): ', buyerModel.GetBuyer())
buyerModel.ClearBuyer()
console.log('Проверка метода ClearBuyer() у класса Buyer: ', buyerModel.GetBuyer())

//Тестирование API
const api = new Api(API_URL);
const request = new ApiRequest(api)  
productsModel.setProducts(await request.Get());  
console.log('Тут вывожу список товаров полученных в результате API запроса',productsModel.getProducts())


