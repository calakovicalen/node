import { Cart } from '../models/cart.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

export const database: {
  users: User[];
  carts: Cart[];
  orders: Order[];
  products: Product[];
} = {
  users: [
    {
      id: 'luffy',
    },
    {
      id: 'zoro',
    },
    {
      id: 'franky',
    },
  ],
  carts: [
    {
      id: 'cart1',
      userId: 'luffy',
      isDeleted: false,
      items: [
        {
          product: {
            id: '1',
            title: 'Meat',
            description: 'Fresh meat',
            price: 100,
          },
          count: 10,
        },
        {
          product: {
            id: '5',
            title: 'Straw hat',
            description: 'Hat made of straws',
            price: 40,
          },
          count: 1,
        },
      ],
    },
  ],
  orders: [
    {
      id: 'order1',
      userId: 'luffy',
      cartId: 'cart1',
      items: [
        {
          product: {
            id: '1',
            title: 'Meat',
            description: 'Fresh meat',
            price: 100,
          },
          count: 10,
        },
        {
          product: {
            id: '5',
            title: 'Straw hat',
            description: 'Hat made of straws',
            price: 40,
          },
          count: 1,
        },
      ],
      payment: {
        type: 'paypal',
        address: 'Laugh Tale',
        creditCard: '255-883-255-444',
      },
      delivery: {
        type: 'post',
        address: 'Laugh Tale',
      },
      comments: '',
      status: 'created',
      total: 2,
    },
  ],
  products: [
    {
      id: '1',
      title: 'Meat',
      description: 'Fresh meat',
      price: 100,
    },
    {
      id: '2',
      title: 'Cola',
      description: 'Ice cold drink',
      price: 50,
    },
    {
      id: '3',
      title: 'Sword',
      description: 'Sharpest sword out there',
      price: 700,
    },
    {
      id: '4',
      title: 'Bandana',
      description: 'Wrap it around your head to look cool',
      price: 20,
    },
    {
      id: '5',
      title: 'Straw hat',
      description: 'Hat made of straws',
      price: 40,
    },
    {
      id: '6',
      title: 'Robot',
      description: 'Every mans dream',
      price: 10000,
    },
  ],
};
