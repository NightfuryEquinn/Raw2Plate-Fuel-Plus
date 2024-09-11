export interface OrderItem {
  orderItemId: number,
  quantity: number,
  itemId: number | undefined,
  orderId: number | undefined
}