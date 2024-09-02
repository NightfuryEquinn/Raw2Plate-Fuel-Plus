export interface Cart {
  CartId: number,
  Quantity: number,
  UserId: number | undefined,
  ItemId: number | undefined
}