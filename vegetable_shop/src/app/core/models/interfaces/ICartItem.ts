import {UnitsType} from '../enums/UnitsType';

export interface ICartItem {
  productId: number;
  price: number;
  productName: string;
  unit: UnitsType;
  quantity: number;
}
