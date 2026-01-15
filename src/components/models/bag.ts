import { IProduct } from "../../types";

export class Bag {
  // Список всех продуктов в каталоге
  private products: IProduct[] = [];

  /////////////////Методы ///////////////

  //добавление товара, который был получен в параметре, в массив корзины;
  AddProduct(product: IProduct) {
    this.products.push(product);
  }

  //удаление товара, полученного в параметре из массива корзины;
  RemoveProduct(product: IProduct): void {
    const index: number = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  //получение количества товаров в корзине;
  CountProducts(): number {
    return this.products.length;
  }

  //получение массива товаров, которые находятся в корзине;
  ListProduct(): IProduct[] {
    return this.products;
  }

  //получение стоимости всех товаров в корзине;
  SumProducts(): number {
    return this.products
      .filter((product) => product.price !== null)
      .reduce((sum, product) => sum + product.price!, 0);
  }

  //проверка наличия товара в корзине по его id, полученного в параметр метода.
  CheckProduct(id: string): boolean {
    return this.products.some((p) => p.id === id && p.price !== null);
  }

  ClearBag(): void {
    this.products = [];
  }
}
