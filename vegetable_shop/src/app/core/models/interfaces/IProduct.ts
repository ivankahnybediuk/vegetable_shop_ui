import {UnitsType} from '../enums/UnitsType';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  unit: string;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
}
