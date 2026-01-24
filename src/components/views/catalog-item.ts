import { Card } from './card';
import { IEvents } from '../base/Events';
import { cloneTemplate, ensureElement } from '../../utils/utils';


const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

export class CatalogItem extends Card {
  constructor(protected events: IEvents) {
    super('card', cloneTemplate(cardTemplate), events);
  }

}