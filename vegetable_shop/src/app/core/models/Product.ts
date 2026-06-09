import {UnitsType} from './enums/UnitsType';
import {IProduct} from './interfaces/IProduct';

export class Product {
  id: number;
  name: string;
  price: number;
  unit: UnitsType;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;

  constructor(data: IProduct) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.unit = data.unit as UnitsType;
    this.stockQuantity = data.stockQuantity;
    this.imageUrl = data.imageUrl;
    this.categoryId = data.categoryId;
    this.categoryName = data.categoryName;
  }
}
