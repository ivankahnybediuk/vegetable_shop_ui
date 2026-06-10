import {ICartItem} from './interfaces/ICartItem';

export class Order{
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  items: ICartItem[];

  constructor(name: string, lastname: string, email: string, phone: string, address: string, items: ICartItem[]) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.items = items;
  }
}
