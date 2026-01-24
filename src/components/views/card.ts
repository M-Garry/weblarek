// src/components/views/card.ts

import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants";

export interface IProductCard {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  price: number | null;
}

export abstract class Card extends Component<IProductCard> {
  protected _title: HTMLElement;
  protected _image: HTMLImageElement | null; // ← допускаем null
  protected _category: HTMLElement | null; // ← допускаем null
  protected _price: HTMLElement;

  constructor(
    protected readonly blockName: string,
    protected container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this._title = ensureElement<HTMLElement>(
      `.${blockName}__title`,
      this.container,
    );
    this._image = this.container.querySelector<HTMLImageElement>(
      `.${blockName}__image`,
    );
    this._category = this.container.querySelector<HTMLElement>(
      `.${blockName}__category`,
    );
    this._price = ensureElement<HTMLElement>(
      `.${blockName}__price`,
      this.container,
    );

    this.container.addEventListener("click", () => {
      this.events.emit(`${this.blockName}:select`, {
        id: this.container.dataset.id,
        
      });
    });
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  set image(value: string | undefined) {
  if (this._image && value !== undefined) {
    this._image.src = value;
    this._image.alt = this.title || 'Изображение товара';
  }
}

  set category(value: string | undefined) {
    if (this._category && value !== undefined) {
      this._category.textContent = value;
      this._category.className = `${this.blockName}__category`;
      const colorClass = categoryMap[value as keyof typeof categoryMap];
      if (colorClass) {
        this._category.classList.add(`card__category_${colorClass}`);
      }
    }
  }

  set price(value: number | null) {
    if (value === null) {
      this._price.textContent = "Бесценно";
      this._price.classList.add(`${this.blockName}__price_unavailable`);
    } else {
      this._price.textContent = `${value} синапсов`;
      this._price.classList.remove(`${this.blockName}__price_unavailable`);
    }
  }
}
