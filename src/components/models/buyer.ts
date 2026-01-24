import { IBuyer, TPayment } from "../../types";
import { EventEmitter } from "../base/Events";

type BuyerChangeField = keyof IBuyer | "clear";

export class Buyer implements IBuyer {
  public payment: TPayment = null;
  public address: string = "";
  public email: string = "";
  public phone: string = "";
  private events?: EventEmitter;

  constructor(events?: EventEmitter) {
    this.events = events;
  }
  //Методы

  //сохранение данных в модели
  updateBuyer<K extends keyof IBuyer>(field: K, value: IBuyer[K]): void {
    this[field] = value as this[K];
    this.events?.emit("buyer:change", { field: field as BuyerChangeField });
  }

  //получение всех данных покупателя
  getBuyer(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  //очистка данных покупателя;
  clearBuyer(): void {
    this.payment = null;
    this.address = "";
    this.email = "";
    this.phone = "";
    this.events?.emit("buyer:change", { field: "clear" });
  }

  //валидация данных
  validate(): { [K in keyof IBuyer]?: string } {
    const errors: { [K in keyof IBuyer]?: string } = {};
    if (this.payment == null) {
      errors.payment = "Не выбран тип оплаты";
    }
    if (!this.address?.trim()) {
      errors.address = "Укажите адрес";
    }
    if (!this.email?.trim()) {
      errors.email = "Укажите почту";
    }
    if (!this.phone.trim()) {
      errors.phone = "Укажите телефон";
    }

    return errors;
  }
}
