import { CartItem } from './types';

export const getCartTotal = (cart: CartItem[]): number => {
  let total;

  if (total) return total;

  total = cart.reduce((acc, item) => {
    return acc + item.price * (item.quantity == 0 ? 1 : item.quantity);
  }, 0);

  return total;
};

export const getCartQuantity = (cart: CartItem[]): number =>
  cart.reduce((acc, item) => acc + item.quantity, 0);

export function getCartItemPrice(item: CartItem): number {
  return item.price * item.quantity;
}
