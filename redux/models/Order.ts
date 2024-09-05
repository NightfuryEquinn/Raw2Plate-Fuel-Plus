export enum Status {
  active = "Delivering",
  inactive = "Completed"
}

export interface Order {
  orderId: number,
  receiver: string,
  contact: string,
  address: string,
  totalPrice: number,
  paidWith: string,
  status: Status,
  date: string,
  orderTime: string,
  deliveredTime: string,
  driver: string,
  userId: number | undefined
}