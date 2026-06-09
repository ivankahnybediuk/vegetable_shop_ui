import {ICategory} from './interfaces/ICategory';

export class Category implements Category {
  public id: number;
  public name: string;
  public icon_url: string;

  constructor(data: ICategory) {
    this.id = data.id;
    this.name = data.name;
    this.icon_url = data.icon_url;
  }
}
