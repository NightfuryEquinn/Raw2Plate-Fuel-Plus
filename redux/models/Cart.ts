export interface Cart {
  cartId: number,
  quantity: number,
  userId: number | undefined,
  itemId: number | undefined
}