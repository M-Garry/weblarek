// src/components/views/modal.ts

import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

// Интерфейс данных для Modal
interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _content: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._content = ensureElement<HTMLElement>('.modal__content', this.container);
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    // Закрытие по крестику
    this._closeButton.addEventListener('click', () => {
      this.events.emit('modal:close');
    });

    // Закрытие по клику на оверлей
    this.container.addEventListener('click', (evt) => {
      if ((evt.target as HTMLElement).classList.contains('modal')) {
        this.events.emit('modal:close');
      }
    });

    // Закрытие по Escape — только если модалка открыта
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' && this.container.classList.contains('modal_active')) {
        this.events.emit('modal:close');
      }
    });
  }

  // Устанавливает контент
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  // Открывает модалку
  open() {
    this.container.classList.add('modal_active');
    document.body.classList.add('noscroll');
    this.events.emit('modal:open');
  }

  // Закрывает модалку
  close() {
    if (!this.container.classList.contains('modal_active')) return; 

    this.container.classList.remove('modal_active');
    document.body.classList.remove('noscroll');
    this.events.emit('modal:close'); 
  }

  render(data?: Partial<IModal>): HTMLElement {
    super.render(data);
    return this.container;
  }
}